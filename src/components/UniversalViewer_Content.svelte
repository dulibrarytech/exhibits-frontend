<svelte:head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/universalviewer@4.0.0/dist/uv.css"
    />
    <script
        type="application/javascript"
        src="https://cdn.jsdelivr.net/npm/universalviewer@4.0.0/dist/umd/UV.js"
        on:load={initViewer}
    >
    </script>
</svelte:head>

<script>
    export let manifest;
    console.log("TEST UV manifest rx:", manifest)

    var UV;

    const data = {
        manifest,
        embedded: true // needed for codesandbox frame
    };
    
    const initViewer = () => {
		UV = window.UV;
        UV.init("uv", data);
	}
</script>

<h6>IIIF Content</h6>
<div class="uv content" id="uv"></div>

<style>
    #uv {
        width: 100%;
        height: 668px;
    }
</style>
