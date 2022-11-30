<script>
    import Media_Item from '../../components/Media_Item.svelte';

    let data = {
        /* repo source - embed with no iiif */
        "repo_source_no_iiif": {

            "uuid": "00726715-bdaa-4a6b-a6b0-4f6007b1b2ff",
            "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
            "caption": "Single object from repo",
            "template": "custom", // TBD
            "item_type": "repo",
            "url": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe", // Identified as uuid in code. Fetch data from index, get object type, mimetype, etc.
            "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
            "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
            "type": "item",
            "order": 1, // get the part of a compound object. Ignored if non-compound object
            "layout": "item_right",
            "is_published": 1,
            "created": "2022-10-13T20:24:20.000Z"
        }
    }

    let item = "repo_source_no_iiif";
  
</script>

<Media_Item data={data[item]} />