<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</svelte:head>

<script>
    import Item_Grid_Vertical_Timeline from '../../templates/partials/Item_Grid_Vertical_Timeline.svelte';

    let grid = {
      "uuid": "3aa1143f8af6e78dc014b4f4befdea17",
      "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
      "type": "vertical_timeline",
      "title": "vertical timeline item grid",
      "order": 4,
      "styles": "{\"item_grid\":{\"color\":\"#303030\",\"backgroundColor\":\"gray\",\"fontFamily\":\"Cursive\"}}",
      "items": [
        {
          "uuid": "87ad6d70b9e0200aebe41a584464f71b",
          "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
          "date": "1864-03-05T00:00:00",
          "title": "University of Denver Founder and Trustee John Evans",
          "description": "University of Denver (DU) founder John Evans poses for a portrait. Evans was also one of the founders of Northwestern University, as well as the second governor of the Colorado Territory.",
          "caption": "University of Denver founded by John Evans, also Colorado&amp;#39;s Second Territorial Governor.",
          "item_type": "image",
          "media": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
          "text": "test text",
          "thumbnail": "27e8d544f03300b782ab2bf39d3cbb8a.jpeg",
          "type": "item",
          //"year_label": "1850",
          "styles": "{\"item\":{\"color\":\"green\",\"backgroundColor\":\"black\",\"fontFamily\":\"arial\"}}",
          "is_published": 1,
          "order": 1,
          "created": "2022-10-13T20:24:20.000Z"
        },
        {
          "uuid": "baaca6d355abc40b0cd65c177ab3d05d",
          "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
          "date": "1864-11-29T00:00:00",
          "title": "One November Morning",
          "description": "Sand Creek Massacre. More than 160 Cheyenne and Arapaho people - primarily women, children, and elders - are massacred by the Colorado Third Cavalry, led by DU trustee Colonel John Chivington.",
          "caption": "Sand Creek Massacre",
          "item_type": "image",
          "media": "6cf1a7cf3bd10f588bd0122d05346877.jpeg",
          "text": "test text",
          "type": "item",
          "styles": "{\"item\":{}}",
          "is_published": 1,
          "order": 2,
          "created": "2022-10-13T20:24:20.000Z"
        },
        {
          "uuid": "a7363389900a8447dee841f4dd88b94a",
          "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
          "date": "1919-01-01T00:00:00",
          "title": "&amp;#34;Ministers Snapped in Action&amp;#34; article in the DU Clarion vol. 27.",
          "description": "The &amp;#34;Fighting Parsons&amp;#34; is first mentioned as a nickname for the football team in the Clarion. No likeness or cartoon associated with the nickname; the team is also called “Fighting Ministers.&amp;#34;",
          "caption": "Clipping of &amp;#34;Ministers Snapped in Action&amp;#34; article in the DU Clarion vol. 27.",
          "item_type": "image",
          "media": "69cc54aa37cc876deb529821667e2f89.jpeg",
          "text": "test text",
          "type": "item",
          "styles": "{}",
          //"year_label": "1900",
          "is_published": 1,
          "order": 3,
          "created": "2022-10-13T20:24:20.000Z"
        },
        {
          "uuid": "04baf4e03f9649bab40c5159a91b9fd2",
          "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
          "date": "1924-10-01T00:00:00",
          "title": "&amp;#34;Denver &amp;#39;Battling Ministers&amp;#39; Seek Fitting Name&amp;#34; Clarion Article.",
          "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
          "caption": "Clarion article “Denver ‘Battling Ministers’",
          "item_type": "image",
          "media": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
          "text": "test text",
          "type": "item",
          "styles": "{}",
          "is_published": 1,
          "order": 4,
          "created": "2022-10-13T20:24:20.000Z"
        },
        {
          "uuid": "553e16022bb5673ae94f2d9c2fbcb5d5",
          "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
          "date": "1925-01-01T00:00:00",
          "title": "&amp;#34;Ministers Snapped in Action&amp;#34; article in the DU Clarion vol. 27.",
          "description": "Pioneers first mentioned in 1924-25 (vol 27) Kynewisbok, the student yearbook; in subsequent years (such as this image from the 1925-26 yearbook), the University added a “Pioneer Day” to their Homecoming celebrations, where faculty, students, and staff would dress in 1890s costume, often with white students in costume as Native Americans.",
          "caption": "caption text",
          "item_type": "image",
          "media": "a72e0377e0dce115e5bc71fac040dbdb.png",
          "text": "test text",
          "type": "item",
          "styles": "{}",
          "is_published": 1,
          "order": 5,
          "created": "2022-10-13T20:24:20.000Z"
        },
        {
          "uuid": "f913c85558f6a979d201d6c68a5f6297",
          "is_member_of_exhibit": "dd748b2c862c71bf50c1238c62ca26f0",
          "date": "1955-07-01T00:00:00",
          "title": "&amp;#34;Pioneer Pete&amp;#34; Image from Kynewisbok",
          "description": "&amp;#34;Pioneer Pete&amp;#34; character appears first as illustrations and then as a mascot-type in the 1950s. “Pioneer Pete” was a person in costume who appeared at football games",
          "caption": "caption text",
          "item_type": "image",
          "media": "b2d4e85c511220df168e4240583de4e5.png",
          "text": "test text",
          "type": "item",
          //"year_label": "1950",
          "styles": "{}",
          "is_published": 1,
          "order": 6,
          "created": "2022-10-13T20:24:20.000Z"
        }
      ],
      "is_published": 1
    }
</script>

<div class="test">
    <Item_Grid_Vertical_Timeline {grid} />
</div>

<style>
    .label {
        text-align: center;
    }

    .test {
        border-style: none;
    }
</style>