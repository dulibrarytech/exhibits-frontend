<script>
    export let item;

    console.log("Text_Item item in:", item)
</script>

<div class="text-content">
    <h5>Text Item</h5>
    {@html item.text}
</div>