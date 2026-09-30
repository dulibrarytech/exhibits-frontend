<script>
    'use strict'

    import { onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';

    export let id = null;
    export let item = {};
    export let gridItem = false;

    let contentBlockElement;
    let styles = {};

    const dispatch = createEventDispatcher();

    $: {
        styles = item.styles || null;
    }

    export const setTheme = (styles) => {
        Object.assign(contentBlockElement.style, styles);
    }

    onMount(async () => {
        if(styles) {
            if(typeof styles == 'string') styles = JSON.parse(styles);
            setTheme({ ...styles });
        }
        dispatch('mount-template-item', {type: "content-block"});
    });
</script>

<div class="exhibit-content-block {gridItem ? 'grid-item' : 'content-block-item'}" bind:this={contentBlockElement} style="--accent-color: {item.styles.accentColor};">
    <div id={id ?? undefined} class="anchor-offset"></div>

    <div class="content-block-{item.content_type} container-medium" >
        {#if item.content_type === 'button'}
        <a href="{item.url}" class="content-block-size-{item.size} {item.transparent ? 'content-block-transparent' : ''}">{@html item.text}</a>
        {:else if item.content_type === 'card'}
        <div class="content-block-card-header">{@html item.title}</div>
        <div class="content-block-card-body">{@html item.text}</div>
        {:else if item.content_type === 'divider'}
        <hr class="content-block-size-{item.size}">
        {:else if item.content_type === 'emphasis'}
        <div class="emphasis-wrapper">{@html item.text}</div>
        {:else if item.content_type === 'quote'}
        <div class="content-block-quote-text">{@html item.text}</div>
        <div class="content-block-quote-attribution">{@html item.attribution}</div>
        {/if}
    </div>
</div>

<style>
    .exhibit-content-block {
        font-family: Neue Haas Unica;

        & p {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
    
    .content-block-item {
        padding-top: 0.532em; 
        padding-bottom: 0.532em; 
    }
    
    .content-block-button {
        justify-content: center;
        display: flex;
    
        & a {
            height: 3.5rem;
            padding: 1rem 0.75rem;
            justify-content: center;
            align-items: center;
            border-radius: 0.25rem; 
            width: fit-content;
            text-decoration: none;
            display: inline-flex;
            color: inherit;

            &.content-block-size-small {
                height: 2.5rem;
                padding: 0.625rem 0.75rem;
            }

            &.content-block-transparent {
                border: 1px solid var(--accent-color);
            }

            &:not(.content-block-transparent) {
                background-color: var(--accent-color);
            }
        }
    }

    .content-block-card {
        background-color: var(--accent-color);
        border-radius: 12px;
        width: fit-content;
        padding: .9rem 1.3rem;
        font-size: 1.3rem;

        & .content-block-card-header {
            font-weight: 700;
            font-size: 1.5rem;
            margin-bottom: 0.25em;
        }
    }

    .content-block-emphasis {
        font-weight: 500;
        width: fit-content;
        display: flex;
        font-size: 1.4rem;

        &::before {
            border: 1px solid var(--accent-color);
            border-radius: 4px;
            content: "";
            margin-right: 1rem;
        }
    }

    .content-block-divider {
        & .content-block-size-large {
            margin: 2rem 0;
        }
        
        & hr {
            opacity: 1;
            border-color: var(--accent-color);
            background-color: var(--accent-color);
        }
    }

    .content-block-quote {
        text-align: center;
        font-weight: 600;
        font-family: Sole Serif Titling;
        display: flex;
        flex-direction: column;
        gap: .9rem;
        padding-bottom: 0.5rem;

        & .content-block-quote-text {
            font-style: italic;
            font-size: 1.35rem;
        }

        & .content-block-quote-attribution {
            font-size: 1.2rem;
            font-weight: 400;

            &::before {
                content: '—';
                margin-right: 0.25rem;
            }
        }

        &::before {
            content: '“';
            font-size: 5rem;
            height: 3.5rem;
            display: block;
            color: var(--accent-color);
        }
    }

    .anchor-offset {
        position: relative;
        top: -81px;
    }
</style>
