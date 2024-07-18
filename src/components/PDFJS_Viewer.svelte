<script>
    import "pdfjs-viewer-element";

    export let args = {};

    const viewerPath = "../libs/pdfjs-4.4.168-dist";

    const page = "2";
    const locale = "us";
    const zoom = "auto";
    const pagemode = "none";
    const search = null;
    const phrase = true;
    const textLayer = "hover";

    var url = null;
    var caption = null;

    $: {
        if(!url) url = args.url || null;
        if(!caption) caption = args.caption || "";

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

  </style>
  