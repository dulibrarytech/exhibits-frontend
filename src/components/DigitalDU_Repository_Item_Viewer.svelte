<script>
    import { repository } from '../libs/repository';
    
    import Image_Viewer from './Image_Viewer.svelte';
    import Audio_Player from './Audio_Player.svelte';
    import Video_Player from './Video_Player.svelte';
    import PDF_Viewer from './PDF_Viewer.svelte';
    import IiifViewer from './IIIF_Viewer.svelte';
    
    export let data;

    //const Repository = new Repository();

    console.log("DigitalDU_Repository_Item: data in:", data)

    // TODO: Fetch item data from repo. Determine if IIIF. If non-iiif, determine media component
</script>