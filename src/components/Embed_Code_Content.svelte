<script>
    /*
     * Embed an html content viewer/player element
     * Allowed elements: [audio, video, code]
     */

    export let code;
    console.log("TEST Embed_Code_Content Embed code in:", code)

    // TODO Regex check for allowed elements. If fail, show no content, issue console error "Only [allowed elements] allowed"
    const render = () => {
        // TODO Regex check for allowed elements. If fail, show no content, issue console error "Only [allowed elements] allowed"
    }

    render();
</script>

<div class="embed content">
    <div>
    <h6>Embed code content</h6>
    {@html code}
    </div>
</div>

<style>

</style>


