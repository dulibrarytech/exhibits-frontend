<script>
    'use strict'

    import { createEventDispatcher } from 'svelte';

    export let options = {};
    export let state = [];

    const dispatch = createEventDispatcher();

    const onClickCheckbox = ({target}) => {
        dispatch('click-filter-option', {
            checked: target.checked,
            value: target.value
        });
    }
</script>

<div class="filter-select-menu">

    {#each Object.keys(options) as key}
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {key}
            </button>

            <ul class="dropdown-menu">
                 {#each options[key] as option}

                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value={option.name} id="flexCheckDefault" on:click={onClickCheckbox} checked={ (state.filter((item) => Object.keys(item)[0] == option.name).length > 0) } >
                            <label class="form-check-label" for="flexCheckDefault">
                                {option.label || "no label"}
                            </label>
                        </div>
                    </li>

                {/each}
            </ul>
        </div>
    {/each}
</div>

<style>
    button {
        margin: 0;
        color: #626262;
        background-color: #e5e3e1;
    }

    .filter-select-menu {
        display: flex;
        column-gap: 10px;
        row-gap: 5px;
    }

    .dropdown-menu {
        background-color: #e5e3e1;
        padding: .7rem
    }

    .form-check-label {
        position: relative;
        top: 2px;
    }
</style>