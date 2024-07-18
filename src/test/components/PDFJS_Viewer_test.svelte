<script>
    import PDFJS_Viewer from '../../components/PDFJS_Viewer.svelte';
    import {items} from '../data/related.js';

    let args = {
        url: "https://specialcollections.du.edu/datastream/a4404635-2dc1-4a54-941c-0a902d0ad8c8/object?key=596601bc8b876e3c8d6fdddb03e7e841#toolbar=0&navpanes=0&scrollbar=0",
        caption: "Caption text"
    }
</script>

<div class="test">
    <PDFJS_Viewer {args} />
</div>