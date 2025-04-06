<script>
    import Search_Box from '../../components/Search_Box.svelte';

    export let data = {};

    let {
        endpoint,
        queryParam,
        params,
        fields,
        placeholder

    } = data;
</script>

<div class="exhibits-search">
    <Search_Box {endpoint} {queryParam} {params} {fields} {placeholder} />
</div>

<style>

</style>