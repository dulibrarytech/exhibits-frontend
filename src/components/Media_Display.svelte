<script>
    import { onMount } from 'svelte';
    import Repository_Item from './Repository_Item.svelte';
    import Media_Item from './Media_Item.svelte';

    export let item = {};

    let args = {};
    let component = null;

    onMount(async () => {
        let {item_type} = item;
        if(item_type) {
            if(item_type == "repo") {
                args = {
                    isIIIF: item.is_iiif, 
                    uuid: item.url
                }
                console.log("TEST Media_Display repo item detected, using Repository_Item, args:", args)
                component = Repository_Item;
            }
            else {
                args = {
                    url: item.url,
                    type: item_type
                }
                console.log("TEST Media_Display user item detected, using Media_Item, args:", args)
                component = Media_Item;
            }
        }
        else console.error("Item type not found");
    });
</script>

{#if component}
    <svelte:component this={component} {item} {args} />
{:else}
    <h5>Loading content...</h5>
{/if}