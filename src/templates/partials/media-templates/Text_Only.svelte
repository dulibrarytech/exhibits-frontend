<script>

</script>

<div class="text-only layout">

    <div class="content container">
        <div class="title-heading"><slot name="title" /></div>

        <div class="text">
            <slot name="text-display" />
        </div>
    </div>

</div>

<style>
    .title-heading:has(> div:empty) {
        display: none;
    }
    
    .text {
        margin-top: 3.65rem;
    }
</style>