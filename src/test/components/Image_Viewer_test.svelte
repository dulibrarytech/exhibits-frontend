<script>
    import Image_Viewer from '../../components/Image_Viewer.svelte';

    let tests = {
        "A": {
            url: "https://blog.rtwilson.com/wp-content/uploads/2011/10/len_std.jpg",
            caption: "This is the caption"
        },
        "B": {
            url: "https://specialcollections.du.edu/datastream/83c5471a-7413-43e2-ba47-b114daa427a7/object/test.tif",
            //url: "https://specialcollections.du.edu/datastream/9c9088bf-3581-4f0b-89fa-ee0fd38a3e4d/tif/null/9c9088bf-3581-4f0b-89fa-ee0fd38a3e4d.tif",
            // type: "large_image",
            caption: "This is the caption"
        },
        "C": {
            url: null,
            caption: "This is the caption"
        },
        "D": {
            url: "test-small-image.jpg",
            //type: "large_image",
            caption: "null"
        },
        "E": {
            url: "test-large-image.tif",
            caption: "This is the caption"
        }
    }

    let data = tests["E"];
</script>

<div class="test">
    <Image_Viewer args={data} />
</div>

<style>
    /* .test {
        width: 49%;
    } */
</style>
