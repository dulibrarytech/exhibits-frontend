<script>
   import { Repository } from '../libs/repository';
   import { getRandomNumberArray, shuffleArrayElements } from '../libs/data_helpers';
   import {ENTITY_TYPE, ITEM_GRIDS} from '../config/global-constants';
   import * as Logger from '../libs/logger.js';

   const REPOSITORY_ITEM_DISPLAY_COUNT = 4;
   const RELATED_ITEM_DISPLAY_COUNT = 4;

   export let items = [];

   let repositoryItemIds = [];
   let subjects = [];
   let relatedItemsDisplay = null;

   const init = async () => {

      let repositoryItems = getRepositoryItems(items);

      // this exhibit contains repository items. proceed with the search for related items
      if(repositoryItems.length > 0) {

         repositoryItems = shuffleArrayElements(repositoryItems);

         for(let item of repositoryItems) {
            repositoryItemIds.push(item.media);
         }

         // get the display data from the repository items 
         relatedItemsDisplay = await getRelatedItems(repositoryItemIds);
      }
   }

   const getRepositoryItems = (items) => {
      let repositoryItems = [];

      for(let item of items) {

         // get the repository items from the nested grid items
         if(ITEM_GRIDS.includes(item.type)) {
            repositoryItems = repositoryItems.concat( getRepositoryItems(item.items) );
         }

         else if(item.type == ENTITY_TYPE.ITEM) {
            if(item.is_repo_item) repositoryItems.push(item);
         }
      }

      return repositoryItems;
   }

   // main algorithm
   const getRelatedItems = async (repositoryItemIds = []) => {

      let items = [];
      let itemData = {};
      let itemDisplayData = null;

      for(let id of repositoryItemIds) {
         itemDisplayData = {};

         try {
            itemData = await Repository.getItemData(id);
         }
         catch(error) {
            Logger.module().error(`Error fetching repository data for repository item id: ${id}`);
            continue;
         }

         if(itemData) {

            // search the repository for subject related items
            let relatedItems = [];
            let results = [];
            let {subject = null} = itemData;

            if(subject && subjects.includes(subject) == false) {
               subjects.push(subject);

               results = await Repository.searchRepository({
                  facets: {
                     "Subject": subject
                  }
               });

               // if no results continue
               if(results.length == 0) {
                  continue;
               }
               else {
                  itemDisplayData.title = itemData.title || "Untitled Item";
                  itemDisplayData.link = itemData.link_to_item || null;
                  itemDisplayData.thumbnail = itemData.thumbnail_datastream || null;
                  itemDisplayData.subject = subject;
               }
            }
            else {
               continue;
            }

            // build the dispaly data object for the related items cards
            if(RELATED_ITEM_DISPLAY_COUNT < results.length) {
               let randomNumbers = getRandomNumberArray(RELATED_ITEM_DISPLAY_COUNT, results.length-1);
               
               for(let index of randomNumbers) {
                  if(results[index].pid != itemData.id) {

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
                  if(result.pid != itemData.id) {

                     relatedItems.push({
                        title: result.title || "Untitled",
                        link: result.link_to_item,
                        thumbnail: result.thumbnail_datastream || "null"
                     });
                  }
               }
            }

            itemDisplayData.relatedItems = relatedItems;
         }

         if (items.length >= RELATED_ITEM_DISPLAY_COUNT) break;

         if(itemDisplayData.relatedItems.length > 0) {
            items.push(itemDisplayData);
         }
      }

      return items;
   }

   init();
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
   <p>Loading related items...</p>

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
      justify-content: flex-start;
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