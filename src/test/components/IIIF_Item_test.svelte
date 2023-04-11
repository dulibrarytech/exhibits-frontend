<script>
    import IIIF_Item from '../../components/IIIF_Item.svelte';

    const TEST = "E";

    let testMetadata = {
        "title": "Story of the Spirituals Project, 1999 August 5, 2003",
        "uri": "/repositories/2/archival_objects/173968",
        "identifiers": [
            {
                "type": "local",
                "identifier": "M450.05.00008"
            }
        ],
        "resource_type": "sound recording nonmusical",
        "dates": [
            {
                "encoding": "w3cdtf",
                "label": "creation",
                "type": "single",
                "expression": "1999 August 5",
                "begin": "1999-08-05"
            },
            {
                "encoding": "w3cdtf",
                "label": "creation",
                "type": "single",
                "expression": "2003",
                "begin": "2003"
            }
        ]
    }

    let tests = {
        "A": {
            args: {
                // type: "", // not in use
                metadata: testMetadata
            },
            item: { // small img
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe", // dummy
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "39c9e861-79b3-405f-9e70-31d99a393ef9",
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "B": {
            args: {
                // type: "", // not in use
                metadata: testMetadata
            },
            item: { // large img
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "83c5471a-7413-43e2-ba47-b114daa427a7",
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "C": {
            args: {
                // type: "", // not in use
                metadata: testMetadata
            },
            item: { // audio
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "416aac52-de61-4c86-b329-32663c355789",
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "D": {
            args: {
                // type: "", // not in use
                metadata: testMetadata
            },
            item: { // video
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "0943447b-2c21-4993-8465-7ba19b54fa1e",
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "E": {
            args: {
                // type: "", // not in use
                metadata: testMetadata
            },
            item: { // pdf
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "5281b988-1f64-44d0-bb04-26e1faf85620",
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        }
    }

    let data = tests[TEST];
</script>

<div class="test">
    <IIIF_Item args={data.args} item={data.item} />
</div>

<style>
    .test {
        width: 100%;
    }
</style>