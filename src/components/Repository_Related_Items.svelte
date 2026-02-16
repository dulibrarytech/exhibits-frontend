<script>
   import { onMount } from 'svelte';
   import { Repository } from '../libs/repository';
   import { getRandomNumberArray, shuffleArrayElements } from '../libs/data_helpers';
   import { getInnerText } from '../libs/exhibits_data_helpers';
   import {ENTITY_TYPE, ITEM_GRIDS} from '../config/global-constants';
   import ResourceUrl from '../libs/ResourceUrl.js';
   import * as Logger from '../libs/logger.js';

   import MediaItemPreview from './Media_Item_Preview.svelte';   

   export let items = [];
   export let exhibitId = "";

   const ITEM_DISPLAY_COUNT = 4;
   const RELATED_ITEM_DISPLAY_COUNT = 4;
   const IMAGE_PREVIEW_WIDTH = 200;

   const RESOURCE = new ResourceUrl(exhibitId);

   let selectedSubjects = [];
   let relatedItemsDisplay = null;

   const init = async () => {

      // get the items with repository data to find related items for, and shuffle the order of the items so that different related items are shown each time
      if(items.length > 0) {
         items = shuffleArrayElements( getExhibitItems(items) );
         relatedItemsDisplay = await getRelatedItemsDisplay(items);
      }
      else {
         document.querySelector(".repository-related-items").style.display = "none";
      }
   }

   const getExhibitItems = (items) => {
      let displayItems = [];

      for(let item of items) {
         if(item.type == ENTITY_TYPE.ITEM) {
            displayItems.push(item);
         }
         else if(item.items) {
            displayItems = displayItems.concat( getExhibitItems(item.items) );
         }
      }

      return displayItems;
   }

   /* 
    * Get the related items to display for the exhibit based on the subjects of the items in the exhibit that have repository data and a subjects field. 
    * For each item, one subject is randomly selected from the item's subjects field and used to search the repository for related items with that subject. 
    * The related items for each exhibit item are then compiled into an object with the exhibit item title, thumbnail, and link, along with an array of related items with their titles, thumbnails, and links. A random selection of the related items is made if there are more than the max number of related items to display. The resulting array of exhibit items with their related items is returned for display in the frontend.
    */
    const getRelatedItemsDisplay = async (items = []) => {
      let displayItems = [];
      let itemDisplayData = {};
      let relatedItems = [];
      let results = [];

      // add repository subjects to exhibit item subjects, to allow related items matches based on repository item subjects 
      // along with user-added exhibit item subjects (if any) 2/11/26
      items = items.map((item) => {
         if(item.repository_data && item.repository_data.subjects) {

            // if the item does not have a subjects field, add one and set it to an empty array so that the repository subjects can be added to it. if the item has a subjects field but it is a csv string instead of an array, split the string into an array on the ',' delimiter and trim whitespace from each subject before adding the repository subjects to the array. if the item already has a subjects array, just add the repository subjects to it. this allows for flexibility in how exhibit creators can input subjects for their items while still ensuring that related items can be found based on repository subjects.
            if(!item.subjects) {
               item.subjects = [];
            }

            // handle csv string of subjects by splitting into an array on the ',' delimiter, trimming whitespace, and adding to the subjects array for the item 2/15/26
            else if(typeof item.subjects == 'string') {
               item.subjects = item.subjects.split(",").map((subject) => subject.trim());
            }

            // add the repository subjects to the item's subjects array
            item.subjects = item.subjects.concat(item.repository_data.subjects);
         }

         return item;
      });

      // filter out items that do not have a subjects field, since related items can only be found for items with subjects
      items = items.filter((item) => {
         return item.subjects?.length > 0;
      });

      if(items.length == 0) Logger.module().info(`Repository related items: no items with 'subjects' field found. Can not display related items for this exhibit.`);

      // main loop to build the related items display data for each exhibit item with a subjects field, stopping when the max number of exhibit items to display is reached
      for(let item of items) {
         itemDisplayData = {};
         relatedItems = [];
         results = [];

         let index = Math.floor(Math.random() * item.subjects.length);
         let subject = item.subjects[index];

         if(subject && selectedSubjects.includes(subject) == false) {

            // add the subject to the array of selected subjects so that it is not used again for another exhibit item, to allow for a wider variety of related items to be displayed based on different subjects if there are multiple exhibit items with the same subject(s)
            selectedSubjects.push(subject);

            // search the repository for items with the same subject
            results = await Repository.searchRepository({
               facets: {
                  "Subject": subject
               }
            });

            // if there are no results for the subject in the repository, skip to the next item and subject until an item with related items is found or the total number of exhibit items is reached
            if(results.length == 0) {
               continue;
            }
            else {

               // build the display data for the exhibit item to be used in the related items display data, including the title, thumbnail, and link for the exhibit item
               itemDisplayData = {
                  ...item,
                  subject,
                  title: item.title ? getInnerText(item.title) : "Untitled Item",
                  link: `${window.location.href}#${item.uuid}`,
               }
            }
         }
         else {
            continue;
         }
         
         // build the display data object for the related items cards
         if(RELATED_ITEM_DISPLAY_COUNT < results.length) {
            let randomNumbers = getRandomNumberArray(RELATED_ITEM_DISPLAY_COUNT, results.length-1);
            
            // if there are more related items than the max to display, randomly select the max number of related items to display (after ensuring that the exhibit item is not included in the related items)
            for(let index of randomNumbers) {

               // ensure that the related item is not the same as the exhibit item by comparing their repository ids (pids)
               if(results[index].pid != item.repository_data.id) {

                  // add the related item 
                  relatedItems.push({
                     title: results[index].title || "Untitled",
                     link: results[index].link_to_item || "null",
                     thumbnail: results[index].thumbnail_datastream_url || "null"
                  });

                  // addRelatedItem(results[index])
               }   
            }
         }
         else {
            // if there are fewer related items than the max to display, just use them all (after ensuring that the exhibit item is not included in the related items)
            for(let result of results) {

               // ensure that the related item is not the same as the exhibit item by comparing their repository ids (pids)
               if(result.pid != item.repository_data.id) {
                  
                  // add the related item 
                  relatedItems.push({
                     title: result.title || "Untitled",
                     link: result.link_to_item,
                     thumbnail: result.thumbnail_datastream_url || "null"
                  });

                  // addRelatedItem(result)
               }
            }
         }

         // add the related items display data for the exhibit item to the array of items to display in the frontend, 
         // only if there is at least one related item to display for the exhibit item
         itemDisplayData.relatedItems = relatedItems;

         if(displayItems.length >= RELATED_ITEM_DISPLAY_COUNT) break;

         if(itemDisplayData.relatedItems.length > 0) {
            displayItems.push(itemDisplayData);
         }
      }

      return displayItems;
   }

   onMount(async () => {
      init();
   });
</script>

<div class="repository-related-items">
{#if relatedItemsDisplay}

   <div class="item-container">
   {#each relatedItemsDisplay as {thumbnail, title, subject, relatedItems = [], link}, index}

      <div class="item shadow-wrapper">
         <div class="item-content">
            <h3>Seen in the exhibit</h3>

            <div class="exhibit-item-preview">
               <MediaItemPreview item={relatedItemsDisplay[index]} args={{isInteractive: false, overlay: false}} on:click-item />
            </div>

            <h4>Explore similar subjects</h4>
            <span style="color: grey"><h6>Subject: {subject}</h6></span>

            <div class="related-items">
            {#each relatedItems as {thumbnail, title, link}}

               <div class="related-item-preview">
                  <a href={link} target="_blank">
                     <img crossorigin="anonymous" src={thumbnail} alt={title} title={title} />
                  </a>
               </div>

            {/each}
            </div>
         </div>
      </div>

   {/each}

   </div> 

{:else}
   <div class="message"><p>Loading related items...</p></div>

{/if}
</div>

<style>
   .repository-related-items {
      padding: 2.5em;
      background-color: #e5e3e1;
   }

   .item-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      row-gap: 12px;
      column-gap: 12px;
   }

   .item {
      width: 100%;
      text-align: center;
      border-style: solid;
      border-color: #e5e3e1;
      border-radius: 25px;
      background-color: white;
   }

   .item-content {
      padding: 38px 12px;
   }

   .related-items {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      row-gap: 32px;
      margin-top: 50px;
   }

   .exhibit-item-preview {
      width: 80%;
      margin: 25px auto 60px auto;
      height: auto;
      overflow: hidden;
   }

   .related-item-preview {
      width: 40.5%;
   }

   .related-item-preview img {
      width: 100%;
   }

   @media screen and (min-width: 575px) {
      .item {
         width: 48.5%;
      }
   }

   @media screen and (min-width: 992px) {
      .item {
         width: 30.5%;
      }
   }

   @media screen and (min-width: 1280px) {
      .item {
         width: 23.5%;
      }
   }
</style>