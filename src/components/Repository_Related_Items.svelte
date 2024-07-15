<script>
   import { onMount } from 'svelte';
   import { Repository } from '../libs/repository';

   export let items = [];

   let repositoryItemIds = [];
   let relatedItemsDisplay = null;

   const REPOSITORY_ITEM_COUNT = 4;
   const RELATED_ITEM_COUNT = 4;
   const METADATA_FIELD = "display_record";
   const SUBJECT_FIELD = "subjects";
   const SUBJECT_SUBFIELD = "title"

   const init = async () => {

      for(let item of items) {
         if(item.is_repo_item) repositoryItemIds.push(item.media);

         if(repositoryItemIds.length >= REPOSITORY_ITEM_COUNT) break;
      }

      relatedItemsDisplay = await getRelatedItems(repositoryItemIds);

      console.log("TEST related items display:", relatedItemsDisplay)
   }

   const render = () => {
      //console.log("TEST RRI render(): relatedItems:", relatedItems)
   }

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
            console.log(`Error fetching repository data for repository item id: ${id}`);
            itemData = null;
         }

         if(itemData) {
            itemDisplayData.title = itemData.title || "Untitled Item";
            itemDisplayData.link = Repository.getLinkToItem(id);
            itemDisplayData.thumbnail = Repository.getItemThumbnailDatastreamUrl(id);

            relatedItems = []

            subjectData = itemData[METADATA_FIELD][SUBJECT_FIELD];
            subject = (typeof subjectData == 'string') ? subjectData[SUBJECT_SUBFIELD] : subjectData[0][SUBJECT_SUBFIELD];
            itemDisplayData.subject = subject;

            let results = await Repository.searchRepository({
               facets: {
                  "Subject": subject
               }
            });

            for(let result of results.data) {
               relatedItems.push({
                  title: result.title || "Untitled",
                  link: Repository.getLinkToItem(result.pid),
                  thumbnail: result.tn || "null"
               });

               if(relatedItems.length >= RELATED_ITEM_COUNT) break;
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

<div class="repository-related-items">

   {#if relatedItemsDisplay}
      <div class="item-container">
         
         {#each relatedItemsDisplay as {thumbnail, title, subject, relatedItems}}

            <div class="item shadow-wrapper">
               <div class="item-content">
                  <h2>Seen in the exhibit</h2>

                  <div class="item-preview">
                     <img crossorigin="anonymous" src={thumbnail} alt={title} title={title} />
                  </div>

                  <h3>Explore similar collections</h3>
                  <h4>Subject: {subject}</h4>

                  <div class="related-items">

                     {#each relatedItems as {thumbnail, title}}

                        <div class="related-item-preview">
                           <img crossorigin="anonymous" src={thumbnail} alt={title} title={title} />
                        </div>

                     {/each}

                  </div>
               </div>
            </div>

         {/each}

      </div> 

   {:else}
      <h3>Loading...</h3>

   {/if}
</div>

<style>
   .repository-related-items {
      padding: 2.5em;
      background-color: white;
   }

   .item-container {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      row-gap: 12px;
   }

   .item {
      width: 100%;
      text-align: center;
      border-style: solid;
      border-color: #e5e3e1;
      border-radius: 25px;
   }

   .item-content {
      padding: 12px;
   }

   .related-items {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      row-gap: 32px;
   }

   .item-preview {
      width: 80%;
      margin: 0 auto;
   }

   .related-item-preview {
      width: 40.5%;
   }

   img {
      width: 100%;
      height: 100%;
   }

   @media screen and (min-width: 480px) {
      .item {
         width: 48.5%;
      }
   }

   @media screen and (min-width: 768px) {
      .item {
         width: 30.5%;
      }
   }

   @media screen and (min-width: 992px) {
      .item {
         width: 23.5%;
      }
   }
</style>