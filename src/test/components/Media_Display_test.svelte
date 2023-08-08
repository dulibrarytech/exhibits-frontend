<script>
    import Media_Display from '../../components/Media_Display.svelte';

    let TEST_ITEM = "user_source__small-image__local-file";

    let args = {
        isTileImage: true
    }

    let data = {
        /* repo source - embed with no iiif */
        "repo_source__small-image__no_iiif": {

            "uuid": "31273105-d328-47bc-8bfa-e50830e043e8",
            "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
            "caption": "Single object from repo",
            "template": "custom", // TBD
            "item_type": "repo",
            "url": "...", // Identified as uuid in code. Fetch data from index, get object type, mimetype, etc.
            "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
            "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
            "type": "item",
            "order": 1, // get the part of a compound object. Ignored if non-compound object
            "layout": "item_right",
            "is_published": 1,
            "created": "2022-10-13T20:24:20.000Z"
        },
        /* repo source - embed with iiif */
        "repo_source__small-image__is_iiif": {

            "uuid": "31273105-d328-47bc-8bfa-e50830e043e8",
            "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
            "caption": "Single object from repo",
            "template": "custom", // TBD
            "item_type": "repo",
            "url": "...", // Identified as uuid in code. Fetch data from index, get object type, mimetype, etc.
            "is_iiif": true,
            "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
            "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
            "type": "item",
            "order": 1, // get the part of a compound object. Ignored if non-compound object
            "layout": "item_right",
            "is_published": 1,
            "created": "2022-10-13T20:24:20.000Z"
        },
        "repo_source__large-image__no_iiif": {

        },
        "repo_source__large-image__is_iiif": {
            
        },
        "user_source__small-image__remote-url": { // not using remote. all files must be uploaded
            
        },
        "user_source__small-image__local-file": {
            "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
            "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
            "caption": "Single small image object from repo",
            "template": "custom",
            "item_type": "image",
            //url": "https://blog.rtwilson.com/wp-content/uploads/2011/10/len_std.jpg", // remote
            "url": "dd057997d5b5f36d806b77c38c2fb472.jpeg", // local storage
            //"url": "http://localhost:9006/datastream/39c9e861-79b3-405f-9e70-31d99a393ef9/object", // repo api *no current functionality for extensionless uri*
            "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
            "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
            "type": "item",
            "order": 1,
            "layout": "item_right",
            "is_published": 1,
            "created": "2022-10-13T20:24:20.000Z"
        },
        "user_source__large-image__remote-url": {
            
        },
        "user_source__large-image__local-file": {
            
        }
    }
</script>

<div class="test">
    <Media_Display item={data[TEST_ITEM]} {args} />
</div>
