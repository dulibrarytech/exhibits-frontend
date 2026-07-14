<script>
    import Kaltura_Content from '../../components/Kaltura_Content.svelte';

    let entryId = "";
    let caption = "caption text";
</script>

<div class="test">
    <Kaltura_Content {entryId} {caption} />
</div>