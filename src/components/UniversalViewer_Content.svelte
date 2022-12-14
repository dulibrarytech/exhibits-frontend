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
    export let url;

    var UV;

    const data = {
        manifest: url,
        embedded: true // needed for codesandbox frame
    };
    
    const initViewer = () => {
		UV = window.UV;
        UV.init("uv", data);
	}
</script>

<div class="content">
    <div class="uv" id="uv"></div>
</div>

<style>
    #uv {
        width: 100%;
        height: 668px;
    }
</style>
