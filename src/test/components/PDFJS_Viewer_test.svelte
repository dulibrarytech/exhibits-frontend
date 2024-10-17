<script>
    import PDFJS_Viewer from '../../components/PDFJS_Viewer.svelte';
    import {test_data} from '../data/pdfjs-viewer.js';

    // test_data = {url: ""}
</script>

<div class="test">
    <PDFJS_Viewer args={test_data} />
</div>