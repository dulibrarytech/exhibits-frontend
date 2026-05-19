<script>
    import PDFJS_Viewer from '../../components/PDFJS_Viewer.svelte';
    import {test_data} from '../data/pdfjs-viewer.js';

    let args = {};
</script>

<div class="test">
    <PDFJS_Viewer args={args} />
</div>