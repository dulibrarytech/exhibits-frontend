<script>
    /*
     * Embed an html content viewer/player element
     * Allowed elements: [audio, video, code]
     */

    export let code;

    // TODO Regex check for allowed elements. If fail, show no content, issue console error "Only [allowed elements] allowed"
    const render = () => {
        // TODO Regex check for allowed elements. If fail, show no content, issue console error "Only [allowed elements] allowed"
    }

    render();
</script>

<div class="embed content">
    <div>
        {@html code}
    </div>
</div>

<style>

</style>


