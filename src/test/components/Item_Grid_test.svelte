<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</svelte:head>

<script>
    import Item_Grid from '../../templates/partials/Item_Grid.svelte';

    // test_data = grid item {}
    import {test_data} from '../data/item-grid.js';
</script>

<div class="test">
    <Item_Grid grid={test_data} />
</div>

<style>
    .test {
        border-style: none;
    }
</style>