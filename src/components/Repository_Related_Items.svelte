<script>
   import { onMount } from 'svelte';
   import { Repository } from '../libs/repository';

   export let items = [];

   let repositoryItemIds = [];
   let relatedItems = null;

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

      relatedItems = await getRelatedItems(repositoryItemIds);
   }

   const render = () => {
      //console.log("TEST RRI render(): relatedItems:", relatedItems)
   }

   const getRelatedItems = async (repositoryItemIds = []) => {
      let items = [];
      let itemData = {};
      let itemDisplayData = null;
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

   {#if relatedItems}

      <div class="items">
         related items
      </div> 

   {/if}

</div>

<style>
   .repository-related-items {
      padding: 2.5em;
      background-color: white;
   }
</style>