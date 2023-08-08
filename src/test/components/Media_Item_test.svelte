<script>
    import Media_Item from '../../components/Media_Item.svelte';

    const TEST = "A";

    let tests = {
        "A": { 
            // small img
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: "",
                isTileImage: true
            },
            item: {
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
            }
        },
        "B": {
            // large img
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: ""
            },
            item: {
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
                "template": "custom",
                "item_type": "image",
                //"item_type": "large_image",
                "url": "test-large-image.tif", // remote (*tif is uploaded file only, no remote source)
                //"url": "http://localhost:9006/datastream/83c5471a-7413-43e2-ba47-b114daa427a7/object", // repo api *no current functionality for extensionless uri*
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
            // audio
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: ""
            },
            item: {
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
                "template": "custom",
                "item_type": "audio",
                "url": "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // remote
                //"url": "http://localhost:9006/datastream/416aac52-de61-4c86-b329-32663c355789/object", // repo api (works for audio)
                //"kaltura_id": "0_6mf7d2pb",
                //"code": "<audio class='testelt' controls><source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' type='audio/mpeg'/></audio>",
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
            // video
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: ""
            },
            item: {
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
                "template": "custom",
                "item_type": "video",
                //"url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", // remote
                //"url": "http://localhost:9006/datastream/0943447b-2c21-4993-8465-7ba19b54fa1e/object", // repo api
                //"kaltura_id": "0_8d7f6n7c",
                "code": "<video><source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' type='video/mp4'/></video>",
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
            // pdf
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: ""
            },
            item: {
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
                "template": "custom",
                "item_type": "pdf",
                "url": "https://www.africau.edu/images/default/sample.pdf", // remote
                //"url": "http://localhost:9006/datastream/5281b988-1f64-44d0-bb04-26e1faf85620/object", // repo api
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
            // external (iframe)
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: ""
            },
            item: {
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
                "template": "custom",
                "item_type": "external",
                "url": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg", // remote
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
            // invalid cases
            args: { // The args override the values found in the exhibit item data object (item{}). Media Item should render with or without args
                type: "",
                url: ""
            },
            item: {
                "uuid": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "is_member_of_exhibit": "00509704-bdaa-4a6b-a6b0-4f6007b1b2fe",
                "caption": "Single small image object from repo",
                "template": "custom",
                "url": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg", // remote
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
    <Media_Item args={data.args} item={data.item} />
</div>