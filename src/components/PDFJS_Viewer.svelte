<script>
    /* https://github.com/alekswebnet/pdfjs-viewer-element */
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
    let styles = "#toolbarViewerRight { display: none; }";

    let url = null;
    let altText = null;
    let caption = null;
    let page = null; 

    $: {
        url = args.url || null;
        altText = args.altText || "pdf document viewer";
        caption = args.caption || "";
        page = args.page || defaultPage;

        url = `${url}#toolbar=0&navpanes=0&scrollbar=0`;
    }
  </script>
  
  <div class="pdf-viewer pdfjs-viewer" aria-label={altText}>

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
      viewer-extra-styles={styles}
    /> 
  </div>
  
  <style>
    pdfjs-viewer-element {
      /* height: 122vw; */
      height: 115vw;
    }

    :global(pdfjs-viewer-element #toolbarViewerRight) {
      display: none !important;
    }

    /* begin responsive breakpoints: small mobile devices/phones first ^ */
    @media screen and (min-width: 575px) {
      /* start of portrait tablet styles */
      pdfjs-viewer-element {
        /* height: 657px; */
        height: 635px;
      }
    }

    @media screen and (min-width: 768px) {
      /* start of landscape/large tablet styles */
      pdfjs-viewer-element {
        /* height: 440px; */
        height: 440px;
      }
    }

    @media screen and (min-width: 992px) {
      /* start of large tablet styles */
      pdfjs-viewer-element {
        /* height: 530px; */
        height: 510px;
      }
    }

    @media screen and (min-width: 1200px) {
      /* start of medium/large desktop styles */
      pdfjs-viewer-element {
        /* height: 647px; */
        height: 625px;
      }
    }

    @media screen and (min-width: 1400px) {
      /* start of extra large desktop styles */
      pdfjs-viewer-element {
        /* height: 745px; */
        height: 745px;
      }
    }
  </style>
  