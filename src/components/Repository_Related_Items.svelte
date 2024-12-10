<script>
   import { onMount } from 'svelte';
   import { Repository } from '../libs/repository';
   import { getRandomNumberArray } from '../libs/data_helpers';
   import {ENTITY_TYPE, ITEM_GRIDS} from '../config/global-constants';
   import * as Logger from '../libs/logger.js';

   export let items = [];

   let repositoryItemIds = [];
   let relatedItemsDisplay = null;

   const REPOSITORY_ITEM_DISPLAY_COUNT = 4;
   const RELATED_ITEM_DISPLAY_COUNT = 4;
   const METADATA_FIELD = "display_record";
   const SUBJECT_FIELD = "subjects";
   const SUBJECT_SUBFIELD = "title"

   const init = async () => {
      
      let repositoryItems = getRepositoryItems(items);
      if(repositoryItems.length > 0) {

         if(REPOSITORY_ITEM_DISPLAY_COUNT < repositoryItems.length) {
            // get a set of randomly selected repository items for the display
            let randomNumbers = getRandomNumberArray(REPOSITORY_ITEM_DISPLAY_COUNT, repositoryItems.length-1);
            for(let index of randomNumbers) {
               repositoryItemIds.push(repositoryItems[index].media);
            }
         }
         else {
            // add all of the repository items to the display
            for(let item of repositoryItems) {
               repositoryItemIds.push(item.media);
            }
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

   const render = () => {}

   const getRelatedItems = async (repositoryItemIds = []) => {
      let items = [];
      let itemData = {};
      let itemDisplayData = null;
      let relatedItems = [];
      let subject = "";
      let subjectData = {};

      for(let id of repositoryItemIds) {
         itemDisplayData = {};

         try {
            itemData = await Repository.getItemData(id);
         }
         catch(error) {
            Logger.module().error(`Error fetching repository data for repository item id: ${id}`);
            itemData = null;
         }

         if(itemData) {
            relatedItems = []

            itemDisplayData.title = itemData.title || "Untitled Item";
            itemDisplayData.link = Repository.getLinkToItem(id);
            itemDisplayData.thumbnail = Repository.getItemThumbnailDatastreamUrl(id);

            subjectData = itemData[METADATA_FIELD][SUBJECT_FIELD];
            if(!subjectData || subjectData.length == 0) {
               Logger.module().info(`Repository Related Items: subject data not found for repository item: ${id}. Can't retrieve related items`)
               continue;
            }

            subject = (typeof subjectData == 'string') ? subjectData[SUBJECT_SUBFIELD] : subjectData[0][SUBJECT_SUBFIELD];
            itemDisplayData.subject = subject;

            let results = await Repository.searchRepository({
               facets: {
                  "Subject": subject
               }
            });

            if(RELATED_ITEM_DISPLAY_COUNT < results.length) {
               let randomNumbers = getRandomNumberArray(RELATED_ITEM_DISPLAY_COUNT, results.length-1);
               
               for(let index of randomNumbers) {
                  relatedItems.push({
                     title: results[index].title || "Untitled",
                     link: Repository.getLinkToItem(results[index].pid),
                     thumbnail: results[index].tn || "null"
                  });
               }
            }
            else {
               for(let result of results) {
                  relatedItems.push({
                     title: result.title || "Untitled",
                     link: Repository.getLinkToItem(result.pid),
                     thumbnail: result.tn || "null"
                  });
               }
            }

            itemDisplayData.relatedItems = relatedItems;
         }
         
         items.push(itemDisplayData);
      }

      return items;
   }

   init();

   onMount(async () => {
      render();
   });
</script>

{#if relatedItemsDisplay}
   <div class="repository-related-items">

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
   </div>

{/if}

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
      margin-top: 25px;
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