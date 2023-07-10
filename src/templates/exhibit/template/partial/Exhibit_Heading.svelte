<script>
    export let id=null;
    export let text="";
    export let subtext="";
    export let display=true;
</script>

<div id={id ?? undefined} class="exhibit-heading">
    {#if display}
        <div class="section-heading container">
            <div class="section-title">
                <h3>{text}</h3>
            </div>
            <div class="section-subtitle">
                <h5>{subtext}</h5>
            </div>
            <hr>
        </div>
    {/if}
</div>

<style>
    .section-heading {
        padding-top: 55px;
        padding-bottom: 55px;
    }

    .section-heading h3 {
        font-size: 1.75em;
    }
</style>