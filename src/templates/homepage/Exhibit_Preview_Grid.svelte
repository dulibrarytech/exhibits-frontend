<script>
    'use strict'

    export let exhibits = [];

    const init = () => {
        console.log("TEST exhibits preview: exhibits:", exhibits)
    }

    $: init();
</script>

<!-- apply template -->
<div class="exhibits-preview">
    <h6>Exhibits preview grid</h6>
</div>