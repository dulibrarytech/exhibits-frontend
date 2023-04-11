<script>
    import Repository_Item from '../../components/Repository_Item.svelte';

    const TEST = "A";

    let tests = {
        "A": {
            // args: {
            //     isIIIF: false,
            //     id: "39c9e861-79b3-405f-9e70-31d99a393ef9" // small img
            // },
            item: { // small img
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
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
            // args: {
            //     isIIIF: false,
            //     id: "83c5471a-7413-43e2-ba47-b114daa427a7" // large img
            // },
            item: { // large img
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single large image object from repo",
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
            // args: {
            //     typeisIIIF: false,
            //     id: "416aac52-de61-4c86-b329-32663c355789" // audio
            // },
            item: { // audio
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single audio object from repo",
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
            // args: {
            //     isIIIF: false,
            //     id: "0943447b-2c21-4993-8465-7ba19b54fa1e" // video
            // },
            item: { // video
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single video object from repo",
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
            // args: {
            //     isIIIF: false,
            //     uuid: "5281b988-1f64-44d0-bb04-26e1faf85620" // pdf
            // },
            item: {  // pdf
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single pdf object from repo",
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
        },
        "F": {
            // args: {
            //     isIIIF: false,
            //     id: "39c9e861-79b3-405f-9e70-31d99a393ef9" // small img
            // },
            item: { // small img
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "39c9e861-79b3-405f-9e70-31d99a393ef9",
                "is_iiif": 1,
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "G": {
            // args: {
            //     isIIIF: false,
            //     id: "83c5471a-7413-43e2-ba47-b114daa427a7" // large img
            // },
            item: { // large img
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "83c5471a-7413-43e2-ba47-b114daa427a7",
                "is_iiif": 1,
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "H": {
            // args: {
            //     typeisIIIF: false,
            //     id: "416aac52-de61-4c86-b329-32663c355789" // audio
            // },
            item: { // audio
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "416aac52-de61-4c86-b329-32663c355789",
                "is_iiif": 1,
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "I": {
            // args: {
            //     isIIIF: false,
            //     id: "0943447b-2c21-4993-8465-7ba19b54fa1e" // video
            // },
            item: { // video
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "0943447b-2c21-4993-8465-7ba19b54fa1e",
                "is_iiif": 1,
                "text": "<div><p>In 2017 UNSW Sydney became the caretaker for the <i><b>Dennis Wolanski Library collection</b></i>. The collection was originally part of the Sydney Opera House performing arts library. The collection is international in scope and focuses on the performing arts in Australia, 1789-1997. It consists of 1,600 archive boxes, containing press clippings, theatre programs, press releases, correspondence, and ephemera, and a card index of 80,000 entries.</p><p>"+
                "Collection access is managed by the Performance Memories Project, a partnership of <a href='#'>UNSW Library</a>, UNSW Theatre and Performance Studies, AusStage and the Wolanski Foundation. As part of project, we have now made available as downloads more than 160,000 records from the project site, including a subject list of research files and two converted card indexes, one covering the performing arts in general, one devoted to Australian drama. </p><div>",
                "type": "item",
                "order": 1,
                "layout": "item_right",
                "is_published": 1,
                "created": "2022-10-13T20:24:20.000Z"
            }
        },
        "J": {
            // args: {
            //     isIIIF: false,
            //     uuid: "5281b988-1f64-44d0-bb04-26e1faf85620" // pdf
            // },
            item: {  // pdf
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single object from repo",
                "template": "custom",
                "item_type": "repo",
                "url": "5281b988-1f64-44d0-bb04-26e1faf85620",
                "is_iiif": 1,
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
    <Repository_Item args={data.args} item={data.item} />
</div>