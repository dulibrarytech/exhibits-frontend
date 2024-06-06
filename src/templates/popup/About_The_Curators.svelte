<script>
    export let data={}; // the exhibit. get req field, san html

    let html = null;

    const FIELD = "about_the_curators";

    $: {
        if(data[FIELD]) html = data[FIELD]; // TODO: sanitize sanitizeHtml() use data helper
    }
</script>

<div class="modal-page">
    <h2>About the Curators</h2>
    <hr>
    <div class="page-content">
        {#if html}{@html html}{/if}
    </div>
</div>

<style>
    .page-content {
        margin-top: 55px;
    }
</style>

