<script>
    import Text_Item from '../../components/Text_Item.svelte';

    let data = {
        text: "Test text<br><h4>Test Header</h4>"
    };
</script>

<Text_Item {data} />