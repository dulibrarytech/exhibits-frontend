<script>
    'use strict'

    export let text = "";
</script>

<div class="alert-section">
    <div class="outer-container">
        {@html text}
    </div>
</div>

<style>
    .alert-section {
        min-height: 4.2em;
        padding: 1.3em 1.6em;
        margin-bottom: 0;
        background-color: lightgoldenrodyellow;
    }
</style>