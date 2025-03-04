<script>
    import { onMount } from 'svelte';

    export let content = "";
    export let styles = null;

    let introductionElement;

    onMount(async () => {
        if(styles) {
            Object.assign(introductionElement.style, styles);
        }
    });
</script>

<div class="exhibit-introduction-section" bind:this={introductionElement}>
    <div class="exhibit-introduction">
        {@html content}
    </div>
</div>

<style>
    .exhibit-introduction-section {
        height: 100%;

        /* inherit user-customizable styles from the exhibit */
        background-color: inherit;
        font-size: inherit;
        font-family: inherit;
        color: inherit;
    }

    .exhibit-introduction {
        font-size: 1.263158em;
        letter-spacing: 0.032599em;
        line-height: 1.45em;
        padding: 5.5vw 7.5vw;
    }

    :global(.exhibit-introduction a:hover) {
        cursor: pointer;
    }

    :global(.exhibit-introduction p) {
        margin-bottom: 1.9rem;
    }

    :global(.exhibit-introduction p:last-child) {
        margin-bottom: 0;
    }
</style>