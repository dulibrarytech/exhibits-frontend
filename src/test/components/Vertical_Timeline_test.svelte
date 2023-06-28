<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</svelte:head>

<script>
    import Vertical_Timeline from '../../templates/exhibit/template/partial/Vertical_Timeline.svelte';

    let allItems = [
        {
            "uuid": "27e8d544f03300b782ab2bf39d3cbb8a",
            "is_member_of_exhibit": "1",
            "date": "January 1, 1900",
            "timestamp": "-2208935008",
            "title": "University of Denver Founder and Trustee John Evans",
            "description": "University of Denver (DU) founder John Evans poses for a portrait. Evans was also one of the founders of Northwestern University, as well as the second governor of the Colorado Territory.",
            "caption": "University of Denver founded by John Evans, also Colorado's Second Territorial Governor.",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
            "text": "test text",
            "thumbnail": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
            "type": "item",
            "layout": "item_top", // is this needed when the item is opened in popup or separate page? only 'description' is displayed with an item on page/popup?
            "is_published": 1,
            "order": 10,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
            "is_member_of_exhibit": "1",
            "date": "January 1, 1920",
            "timestamp": "-1577869408",
            "title": "One November Morning",
            "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
            "caption": "Sand Creek Massacre",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 11,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "69cc54aa37cc876deb529821667e2f89",
            "is_member_of_exhibit": "1",
            "date": "January 1, 1922",
            "timestamp": "-1514711008",
            "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            "description": "The \"Fighting Parsons\" is first mentioned as a nickname for the football team in the Clarion. No likeness or cartoon associated with the nickname; the team is also called \“Fighting Ministers.\"",
            "caption": "Clipping of \"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "69cc54aa37cc876deb529821667e2f89.jpeg",
            "text": "test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text ",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 12,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "e5dda358941b0bd63e474a5a27a723c0",
            "is_member_of_exhibit": "1",
            "date": "January 1, 1970",
            "timestamp": "53792",
            "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
            "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
            "caption": "Clarion article “Denver ‘Battling Ministers’",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 13,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "a72e0377e0dce115e5bc71fac040dbdb",
            "is_member_of_exhibit": "1",
            "date": "January 1, 1980",
            "timestamp": "315586592",
            "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            "description": "Pioneers first mentioned in 1924-25 (vol 27) Kynewisbok, the student yearbook; in subsequent years (such as this image from the 1925-26 yearbook), the University added a “Pioneer Day” to their Homecoming celebrations, where faculty, students, and staff would dress in 1890s costume, often with white students in costume as Native Americans.",
            "caption": "caption text",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "a72e0377e0dce115e5bc71fac040dbdb.png",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 14,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "b2d4e85c511220df168e4240583de4e5",
            "is_member_of_exhibit": "1",
            "date": "January 1, 1985",
            "timestamp": "473439392",
            "title": "\"Pioneer Pete\" Image from Kynewisbok",
            "description": "\"Pioneer Pete\" character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
            "caption": "caption text",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "b2d4e85c511220df168e4240583de4e5.png",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 15,
            "created": "2022-10-13T20:24:20.000Z"
        }
    ]

    let section1 = [
        {
            "uuid": "27e8d544f03300b782ab2bf39d3cbb8a",
            "is_member_of_exhibit": "1",
            "date": "March 5, 1864",
            "timestamp": "",
            "title": "University of Denver Founder and Trustee John Evans",
            "description": "University of Denver (DU) founder John Evans poses for a portrait. Evans was also one of the founders of Northwestern University, as well as the second governor of the Colorado Territory.",
            "caption": "University of Denver founded by John Evans, also Colorado's Second Territorial Governor.",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
            "text": "test text",
            "thumbnail": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
            "type": "item",
            "layout": "item_top", // is this needed when the item is opened in popup or separate page? only 'description' is displayed with an item on page/popup?
            "is_published": 1,
            "order": 10,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
            "is_member_of_exhibit": "1",
            "date": "November 29, 1864",
            "timestamp": "",
            "title": "One November Morning",
            "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
            "caption": "Sand Creek Massacre",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 11,
            "created": "2022-10-13T20:24:20.000Z"
        }
    ]

    let section2 = [
        {
            "uuid": "69cc54aa37cc876deb529821667e2f89",
            "is_member_of_exhibit": "1",
            "date": "1919",
            "timestamp": "",
            "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            "description": "The \"Fighting Parsons\" is first mentioned as a nickname for the football team in the Clarion. No likeness or cartoon associated with the nickname; the team is also called \“Fighting Ministers.\"",
            "caption": "Clipping of \"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "69cc54aa37cc876deb529821667e2f89.jpeg",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 12,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "e5dda358941b0bd63e474a5a27a723c0",
            "is_member_of_exhibit": "1",
            "date": "October 1924",
            "timestamp": "",
            "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
            "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
            "caption": "Clarion article “Denver ‘Battling Ministers’",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 13,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "a72e0377e0dce115e5bc71fac040dbdb",
            "is_member_of_exhibit": "1",
            "date": "1925",
            "timestamp": "",
            "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            "description": "Pioneers first mentioned in 1924-25 (vol 27) Kynewisbok, the student yearbook; in subsequent years (such as this image from the 1925-26 yearbook), the University added a “Pioneer Day” to their Homecoming celebrations, where faculty, students, and staff would dress in 1890s costume, often with white students in costume as Native Americans.",
            "caption": "caption text",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "a72e0377e0dce115e5bc71fac040dbdb.png",
            "text": "test text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 14,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "b2d4e85c511220df168e4240583de4e5",
            "is_member_of_exhibit": "1",
            "date": "1940s to 1950s",
            "timestamp": "",
            "title": "\"Pioneer Pete\" Image from Kynewisbok",
            "description": "\"Pioneer Pete\" character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
            "caption": "caption text",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "b2d4e85c511220df168e4240583de4e5.png",
            "text": "test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text test text ",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 15,
            "created": "2022-10-13T20:24:20.000Z"
        }
    ]
</script>

<h4>Vertical Timeline</h4>
<!-- <div class="label">
    <h3>1850-1900</h3>
</div>
<div class="test">
    <Vertical_Timeline items={section1} />
</div> -->

<div class="label">
    <h3>1900-2000</h3>
</div>
<div class="test">
    <Vertical_Timeline items={allItems} />
</div>

<style>
    .label {
        text-align: center;
    }

    .test {
        border-style: none;
    }
</style>