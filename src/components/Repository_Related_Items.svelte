<script>
   import { onMount } from 'svelte';
   import { Repository } from '../libs/repository';
   import { getRandomNumberArray, shuffleArrayElements } from '../libs/data_helpers';
   import { getInnerText } from '../libs/exhibits_data_helpers';
   import {ENTITY_TYPE, ITEM_GRIDS} from '../config/global-constants';
   import ResourceUrl from '../libs/ResourceUrl.js';
   import * as Logger from '../libs/logger.js';

   export let items = [];
   export let exhibitId = "";

   const ITEM_DISPLAY_COUNT = 4;
   const RELATED_ITEM_DISPLAY_COUNT = 4;
   const IMAGE_PREVIEW_WIDTH = 200;

   const RESOURCE = new ResourceUrl(exhibitId);

   let selectedSubjects = [];
   let relatedItemsDisplay = null;

   const init = async () => {
      if(items.length > 0) {
         items = shuffleArrayElements( getDisplayItems(items) );
         relatedItemsDisplay = await getRelatedItemsDisplay(items);
      }
      else {
         document.querySelector(".repository-related-items").style.display = "none";
      }
   }

   const getDisplayItems = (items) => {
      let displayItems = [];

      for(let item of items) {
         if(item.type == ENTITY_TYPE.ITEM) {
            displayItems.push(item);
         }
         // else if(ITEM_GRIDS.includes(item.type)) {
         else if(item.items) {
            displayItems = displayItems.concat( getDisplayItems(item.items) );
         }
      }

      return displayItems;
   }

   // main algorithm
   const getRelatedItemsDisplay = async (items = []) => {
      let displayItems = [];
      let itemDisplayData = {};
      let relatedItems = [];
      let results = [];

      items = items.filter((item) => {
         return item.subjects?.length > 0;
      })

      if(items.length == 0) Logger.module().info(`Repository related items: no items with 'subjects' field found. Can not display related items for this exhibit.`);

      for(let item of items) {
         itemDisplayData = {};
         relatedItems = [];
         results = [];

         let index = Math.floor(Math.random() * item.subjects.length);
         let subject = item.subjects[index];

         if(subject && selectedSubjects.includes(subject) == false) {
            selectedSubjects.push(subject);

            results = await Repository.searchRepository({
               facets: {
                  "Subject": subject
               }
            });

            if(results.length == 0) {
               continue;
            }
            else {
               //let thumbnail = item.thumbnail || RESOURCE.getFileUrl(item.media); // TEST
               let thumbnail = item.thumbnail || RESOURCE.getIIIFImageUrl(item.media, IMAGE_PREVIEW_WIDTH, null); // UPDATE

               itemDisplayData.title = item.title ? getInnerText(item.title) : "Untitled Item";
               itemDisplayData.link = `${window.location.href}#${item.uuid}`;
               itemDisplayData.thumbnail = thumbnail;
               itemDisplayData.subject = subject;
            }
         }
         else {
            continue;
         }
         
         // build the display data object for the related items cards
         if(RELATED_ITEM_DISPLAY_COUNT < results.length) {
            let randomNumbers = getRandomNumberArray(RELATED_ITEM_DISPLAY_COUNT, results.length-1);
            
            for(let index of randomNumbers) {
               if(results[index].pid != item.uuid) {

                  relatedItems.push({
                     title: results[index].title || "Untitled",
                     link: results[index].link_to_item || "null",
                     thumbnail: results[index].thumbnail_datastream || "null"
                  });
               }     
            }
         }
         else {
            for(let result of results) {
               if(result.pid != item.id) {

                  relatedItems.push({
                     title: result.title || "Untitled",
                     link: result.link_to_item,
                     thumbnail: result.thumbnail_datastream || "null"
                  });
               }
            }
         }

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
   {#each relatedItemsDisplay as {thumbnail, title, subject, relatedItems = [], link}}

      <div class="item shadow-wrapper">
         <div class="item-content">
            <h3>Seen in the exhibit</h3>

            <div class="item-preview">
               <a href={link} target="_blank">
                  <img crossorigin="anonymous" src={thumbnail} alt={title} title={title} />
               </a>
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

   .item-preview {
      width: 80%;
      margin: 25px auto 60px auto;
      height: 250px;
      overflow: hidden;
   }

   .item-preview img {
      height: 100%;
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