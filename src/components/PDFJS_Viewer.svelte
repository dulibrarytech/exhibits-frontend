<script>
    import "pdfjs-viewer-element";

    export let args = {};

    const viewerPath = "../libs/pdfjs-4.4.168-dist";

    let defaultPage = "1";
    let locale = "us";
    let zoom = "auto";
    let pagemode = "none";
    let search = null;
    let phrase = true;
    let textLayer = "hover";

    let url = null;
    let caption = null;
    let page = null; 

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";
        if(!page) page = args.page || defaultPage;

        url = `${url}#toolbar=0&navpanes=0&scrollbar=0`;
    }
  </script>
  
  <div class="pdf-viewer pdfjs-viewer">

    <pdfjs-viewer-element
      class="viewer"
      src={url}
      viewer-path={viewerPath}
      {locale}
      {page}
      {search}
      {phrase}
      {zoom}
      {pagemode}
      text-layer={textLayer}
    />
  </div>
  
  <style>
    pdfjs-viewer-element {
      height: 100vh;
    }
  </style>
  