<script>
    export let data;

    console.log("Text_Item item in:", data)
</script>

<div class="text-content">
    <h5>Text Item</h5>
    {@html data.text}
</div>