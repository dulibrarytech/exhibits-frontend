<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</svelte:head>

<script>
    import Item_Grid_Vertical_Timeline from '../../templates/partials/Item_Grid_Vertical_Timeline.svelte';
    import Item_Grid_Vertical_Timeline_2 from '../../templates/partials/Item_Grid_Vertical_Timeline_2.svelte';

    let grid = {
        "uuid": "7358d544fab45abb782ab2bf39d3ff50a",
        "is_member_of_exhibit": "1",
        "type": "vertical_timeline",
        "order": 1,
        "styles": {
            "item_grid": { // grid section
                "backgroundColor": "gray",
                "fontFamily": "arial"
            }
        },
        "items": [
            {
                "uuid": "27e8d544f03300b782ab2bf39d3cbb8a",
                "is_member_of_exhibit": "1",
                "date": "March 5, 1951",
                "title": "University of Denver Founder and Trustee John Evans",
                "description": "University of Denver (DU) founder John Evans poses for a portrait. Evans was also one of the founders of Northwestern University, as well as the second governor of the Colorado Territory.",
                "caption": "University of Denver founded by John Evans, also Colorado's Second Territorial Governor.",
                "item_type": "image",
                "url": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
                "text": "test text",
                "thumbnail": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
                "type": "item",
                "year_label": "1950", // insert a year label to the timeline before this item
                "styles": {
                    "item": { // items in grid
                        "color": "white",
                        "backgroundColor": "black",
                        "fontFamily": "arial"
                    }
                },
                "is_published": 1, // this should be ok here, not in the parent grid object
                "order": 1, // this should be ok here, not in the parent grid object
                "created": "2022-10-13T20:24:20.000Z"
            },
            // {
            //     "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
            //     "is_member_of_exhibit": "1",
            //     "date": "November 29, 1955",
            //     "title": "One November Morning",
            //     "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
            //     "caption": "Sand Creek Massacre",
            //     "item_type": "image",
            //     "url": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
            //     "text": "test text",
            //     "type": "item",
            //     "is_published": 1,
            //     "order": 2,
            //     "created": "2022-10-13T20:24:20.000Z"
            // },
            { // spacer: empty url ('media') field
                "uuid": "844b123dabb348c6b91184f8e74123",
                "is_member_of_exhibit": "4",
                "date": "",
                "caption": "",
                "item_type": "image",
                "url": "",
                "text": "",
                "type": "item",
                "styles": {
                    "item": {
                        "visibility": "hidden"
                    }
                },
                "order": 2,
                "is_published": 1,
                "created": "2023-06-29T20:24:20.000Z"
            },
            {
                "uuid": "69cc54aa37cc876deb529821667e2f89",
                "is_member_of_exhibit": "1",
                "date": "1972",
                "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
                "description": "The \"Fighting Parsons\" is first mentioned as a nickname for the football team in the Clarion. No likeness or cartoon associated with the nickname; the team is also called \“Fighting Ministers.\"",
                "caption": "Clipping of \"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
                "item_type": "text",
                "url": "",
                "text": "test text",
                "type": "item",
                "year_label": "1970",
                "is_published": 1,
                "order": 2,
                "created": "2022-10-13T20:24:20.000Z"
            },
            {
                "uuid": "e5dda358941b0bd63e474a5a27a723c0",
                "is_member_of_exhibit": "1",
                "date": "October 1974",
                "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
                "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
                "caption": "Clarion article “Denver ‘Battling Ministers’",
                "item_type": "image",
                "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
                "text": "test text",
                "type": "item",
                "is_published": 1,
                "order": 4,
                "created": "2022-10-13T20:24:20.000Z"
            },
            {
                "uuid": "a72e0377e0dce115e5bc71fac040dbdb",
                "is_member_of_exhibit": "1",
                "date": "1975",
                "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
                "description": "Pioneers first mentioned in 1924-25 (vol 27) Kynewisbok, the student yearbook; in subsequent years (such as this image from the 1925-26 yearbook), the University added a “Pioneer Day” to their Homecoming celebrations, where faculty, students, and staff would dress in 1890s costume, often with white students in costume as Native Americans.",
                "caption": "caption text",
                "item_type": "image",
                "url": "a72e0377e0dce115e5bc71fac040dbdb.png",
                "text": "test text",
                "type": "item",
                "is_published": 1,
                "order": 3,
                "created": "2022-10-13T20:24:20.000Z"
            },
            {
                "uuid": "b2d4e85c511220df168e4240583de4e5",
                "is_member_of_exhibit": "1",
                "date": "Jan. 1, 1990",
                "title": "\"Pioneer Pete\" Image from Kynewisbok",
                "description": "\"Pioneer Pete\" character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
                "caption": "caption text",
                "item_type": "image",
                "url": "b2d4e85c511220df168e4240583de4e5.png",
                "text": "test text",
                "type": "item",
                "is_published": 1,
                "order": 6,
                "created": "2022-10-13T20:24:20.000Z"
            }
            // {
            //     "year_label": "1950",
            //     "items_left": [
            //         {
            //             "uuid": "27e8d544f03300b782ab2bf39d3cbb8a",
            //             "is_member_of_exhibit": "1",
            //             "date": "March 5, 1951",
            //             "title": "University of Denver Founder and Trustee John Evans",
            //             "description": "University of Denver (DU) founder John Evans poses for a portrait. Evans was also one of the founders of Northwestern University, as well as the second governor of the Colorado Territory.",
            //             "caption": "University of Denver founded by John Evans, also Colorado's Second Territorial Governor.",
            //             "item_type": "image",
            //             "url": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
            //             "text": "test text",
            //             "thumbnail": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
            //             "type": "item",
            //             "year_label": "1950", // insert a year label to the timeline before this item
            //             "styles": {
            //                 "item": { // items in grid
            //                     "color": "white",
            //                     "backgroundColor": "black",
            //                     "fontFamily": "arial"
            //                 }
            //             },
            //             "is_published": 1, // this should be ok here, not in the parent grid object
            //             "order": 1, // this should be ok here, not in the parent grid object
            //             "created": "2022-10-13T20:24:20.000Z"
            //         }
            //     ],
            //     "items_right": [
            //         {
            //             "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
            //             "is_member_of_exhibit": "1",
            //             "date": "November 29, 1955",
            //             "title": "One November Morning",
            //             "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
            //             "caption": "Sand Creek Massacre",
            //             "item_type": "image",
            //             "url": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
            //             "text": "test text",
            //             "type": "item",
            //             "is_published": 1,
            //             "order": 1,
            //             "created": "2022-10-13T20:24:20.000Z"
            //         }
            //     ] 
            // },
            // {
            //     "year_label": "1970",
            //     "items_left": [
            //         {
            //             "uuid": "69cc54aa37cc876deb529821667e2f89",
            //             "is_member_of_exhibit": "1",
            //             "date": "1972",
            //             "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            //             "description": "The \"Fighting Parsons\" is first mentioned as a nickname for the football team in the Clarion. No likeness or cartoon associated with the nickname; the team is also called \“Fighting Ministers.\"",
            //             "caption": "Clipping of \"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            //             "template": "grid",
            //             "columns": "4",
            //             "item_type": "text",
            //             "url": "69cc54aa37cc876deb529821667e2f89.jpeg",
            //             "text": "test text",
            //             "type": "item",
            //             "year_label": "1970",
            //             "is_published": 1,
            //             "order": 2,
            //             "created": "2022-10-13T20:24:20.000Z"
            //         },
            //         {
            //             "uuid": "a72e0377e0dce115e5bc71fac040dbdb",
            //             "is_member_of_exhibit": "1",
            //             "date": "1975",
            //             "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
            //             "description": "Pioneers first mentioned in 1924-25 (vol 27) Kynewisbok, the student yearbook; in subsequent years (such as this image from the 1925-26 yearbook), the University added a “Pioneer Day” to their Homecoming celebrations, where faculty, students, and staff would dress in 1890s costume, often with white students in costume as Native Americans.",
            //             "caption": "caption text",
            //             "item_type": "image",
            //             "url": "a72e0377e0dce115e5bc71fac040dbdb.png",
            //             "text": "test text",
            //             "type": "item",
            //             "is_published": 1,
            //             "order": 3,
            //             "created": "2022-10-13T20:24:20.000Z"
            //         }
            //     ],
            //     "items_right": [
            //         {
            //             "uuid": "e5dda358941b0bd63e474a5a27a723c0",
            //             "is_member_of_exhibit": "1",
            //             "date": "October 1974",
            //             "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
            //             "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
            //             "caption": "Clarion article “Denver ‘Battling Ministers’",
            //             "item_type": "image",
            //             "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
            //             "text": "test text",
            //             "type": "item",
            //             "is_published": 1,
            //             "order": 2,
            //             "created": "2022-10-13T20:24:20.000Z"
            //         },
            //         {
            //             "uuid": "b2d4e85c511220df168e4240583de4e5",
            //             "is_member_of_exhibit": "1",
            //             "date": "Jan. 1, 1990",
            //             "title": "\"Pioneer Pete\" Image from Kynewisbok",
            //             "description": "\"Pioneer Pete\" character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
            //             "caption": "caption text",
            //             "item_type": "image",
            //             "url": "b2d4e85c511220df168e4240583de4e5.png",
            //             "text": "test text",
            //             "type": "item",
            //             "is_published": 1,
            //             "order": 3,
            //             "created": "2022-10-13T20:24:20.000Z"
            //         }
            //     ] 
            // }
        ]
        // "items_left": [
        //     {
        //         "uuid": "27e8d544f03300b782ab2bf39d3cbb8a",
        //         "is_member_of_exhibit": "1",
        //         "date": "March 5, 1951",
        //         "title": "University of Denver Founder and Trustee John Evans",
        //         "description": "University of Denver (DU) founder John Evans poses for a portrait. Evans was also one of the founders of Northwestern University, as well as the second governor of the Colorado Territory.",
        //         "caption": "University of Denver founded by John Evans, also Colorado's Second Territorial Governor.",
        //         "item_type": "image",
        //         "url": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
        //         "text": "test text",
        //         "thumbnail": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
        //         "type": "item",
        //         "year_label": "1950", // insert a year label to the timeline before this item
        //         "styles": {
        //             "item": { // items in grid
        //                 "color": "white",
        //                 "backgroundColor": "black",
        //                 "fontFamily": "arial"
        //             }
        //         },
        //         "is_published": 1, // this should be ok here, not in the parent grid object
        //         "order": 1, // this should be ok here, not in the parent grid object
        //         "created": "2022-10-13T20:24:20.000Z"
        //     },
        //     // {
        //     //     "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
        //     //     "is_member_of_exhibit": "1",
        //     //     "date": "November 29, 1955",
        //     //     "title": "One November Morning",
        //     //     "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
        //     //     "caption": "Sand Creek Massacre",
        //     //     "item_type": "image",
        //     //     "url": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
        //     //     "text": "test text",
        //     //     "type": "item",
        //     //     "is_published": 1,
        //     //     "order": 2,
        //     //     "created": "2022-10-13T20:24:20.000Z"
        //     // },
        //     {
        //         "uuid": "69cc54aa37cc876deb529821667e2f89",
        //         "is_member_of_exhibit": "1",
        //         "date": "1972",
        //         "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
        //         "description": "The \"Fighting Parsons\" is first mentioned as a nickname for the football team in the Clarion. No likeness or cartoon associated with the nickname; the team is also called \“Fighting Ministers.\"",
        //         "caption": "Clipping of \"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
        //         "template": "grid",
        //         "columns": "4",
        //         "item_type": "text",
        //         "url": "69cc54aa37cc876deb529821667e2f89.jpeg",
        //         "text": "test text",
        //         "type": "item",
        //         "year_label": "1970",
        //         "is_published": 1,
        //         "order": 2,
        //         "created": "2022-10-13T20:24:20.000Z"
        //     },
        //     // {
        //     //     "uuid": "e5dda358941b0bd63e474a5a27a723c0",
        //     //     "is_member_of_exhibit": "1",
        //     //     "date": "October 1974",
        //     //     "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
        //     //     "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
        //     //     "caption": "Clarion article “Denver ‘Battling Ministers’",
        //     //     "item_type": "image",
        //     //     "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
        //     //     "text": "test text",
        //     //     "type": "item",
        //     //     "is_published": 1,
        //     //     "order": 4,
        //     //     "created": "2022-10-13T20:24:20.000Z"
        //     // },
        //     {
        //         "uuid": "a72e0377e0dce115e5bc71fac040dbdb",
        //         "is_member_of_exhibit": "1",
        //         "date": "1975",
        //         "title": "\"Ministers Snapped in Action\" article in the DU Clarion vol. 27.",
        //         "description": "Pioneers first mentioned in 1924-25 (vol 27) Kynewisbok, the student yearbook; in subsequent years (such as this image from the 1925-26 yearbook), the University added a “Pioneer Day” to their Homecoming celebrations, where faculty, students, and staff would dress in 1890s costume, often with white students in costume as Native Americans.",
        //         "caption": "caption text",
        //         "item_type": "image",
        //         "url": "a72e0377e0dce115e5bc71fac040dbdb.png",
        //         "text": "test text",
        //         "type": "item",
        //         "is_published": 1,
        //         "order": 3,
        //         "created": "2022-10-13T20:24:20.000Z"
        //     }
        //     // {
        //     //     "uuid": "b2d4e85c511220df168e4240583de4e5",
        //     //     "is_member_of_exhibit": "1",
        //     //     "date": "Jan. 1, 1990",
        //     //     "title": "\"Pioneer Pete\" Image from Kynewisbok",
        //     //     "description": "\"Pioneer Pete\" character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
        //     //     "caption": "caption text",
        //     //     "item_type": "image",
        //     //     "url": "b2d4e85c511220df168e4240583de4e5.png",
        //     //     "text": "test text",
        //     //     "type": "item",
        //     //     "is_published": 1,
        //     //     "order": 6,
        //     //     "created": "2022-10-13T20:24:20.000Z"
        //     // }
        // ],
        // "items_right": [
        //     {
        //         "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
        //         "is_member_of_exhibit": "1",
        //         "date": "November 29, 1955",
        //         "title": "One November Morning",
        //         "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
        //         "caption": "Sand Creek Massacre",
        //         "item_type": "image",
        //         "url": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
        //         "text": "test text",
        //         "type": "item",
        //         "is_published": 1,
        //         "order": 1,
        //         "created": "2022-10-13T20:24:20.000Z"
        //     },
        //     {
        //         "uuid": "e5dda358941b0bd63e474a5a27a723c0",
        //         "is_member_of_exhibit": "1",
        //         "date": "October 1974",
        //         "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
        //         "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
        //         "caption": "Clarion article “Denver ‘Battling Ministers’",
        //         "item_type": "image",
        //         "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
        //         "text": "test text",
        //         "type": "item",
        //         "is_published": 1,
        //         "order": 2,
        //         "created": "2022-10-13T20:24:20.000Z"
        //     },
        //     {
        //         "uuid": "b2d4e85c511220df168e4240583de4e5",
        //         "is_member_of_exhibit": "1",
        //         "date": "Jan. 1, 1990",
        //         "title": "\"Pioneer Pete\" Image from Kynewisbok",
        //         "description": "\"Pioneer Pete\" character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
        //         "caption": "caption text",
        //         "item_type": "image",
        //         "url": "b2d4e85c511220df168e4240583de4e5.png",
        //         "text": "test text",
        //         "type": "item",
        //         "is_published": 1,
        //         "order": 3,
        //         "created": "2022-10-13T20:24:20.000Z"
        //     }
        // ]
    }
</script>

<div class="test">
    <Item_Grid_Vertical_Timeline_2 {grid} />
</div>

<style>
    .label {
        text-align: center;
    }

    .test {
        border-style: none;
    }
</style>