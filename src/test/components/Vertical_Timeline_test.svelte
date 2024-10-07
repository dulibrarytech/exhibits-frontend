<svelte:head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
</svelte:head>

<script>
    import Item_Grid_Vertical_Timeline from '../../templates/partials/Item_Grid_Vertical_Timeline.svelte';

    let grid = {
      "uuid": "79e82ffbc8990ab4d03255707f3b1527",
      "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
      "type": "vertical_timeline",
      "title": "<div style=\"color: #8b2332\">Mascots, Nicknames, and Resistance timeline (1860 - 2020)</div>",
      "text": "This timeline includes major events (1864-2008) in University of Denver history related to its history with Native Americans (including but not limited to the Cheyenne and Arapaho nations), settler colonialism, and our mascots and nicknames. This timeline is not inclusive or reflective of all logo and branding changes during the University's history.",
      "order": 1,
      // "styles": "{\"backgroundColor\":\"#E3DCC2\"}",
      "styles": {
        "backgroundColor":"#E3DCC2"
      },
      "items": [
        {
          "uuid": "57b325a7f779a5ad1558340205e052ab",
          "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
          "date": "1864-03-05T00:00:00",
          "title": "<div style=\"color: #8b2332; text-align: center\">March 5, 1864</div>",
          "description": "University of Denver was founded by John Evans, also Colorado's Second Territorial Governor.",
          "caption": "Image: Portrait of John Evans between 1880-1897. Courtesy of DU Special Collections and Archives.",
          "item_type": "image",
          "media": "57b325a7f779a5ad1558340205e052ab.jpg",
          "layout": "media_bottom",
          "text": "",
          "thumbnail": "",
          "type": "item",
          "styles": {},
          "is_published": 1,
          "order": 1        
        },
        // {
        //   "uuid": "8119b5f5a23193bc59bf60882a3e889e",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "1864-11-29T00:00:00",
        //   "title": "November 29, 1864",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 2        
        // },
        // {
        //   "uuid": "ed099cd4004d2ca5a4a747a72c800ae2",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "1919-01-01T00:00:00",
        //   "title": "1919",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 3        
        // },
        // {
        //   "uuid": "77d4137d354ae026bb023b9fa081598e",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 4        
        // },
        // {
        //   "uuid": "0a1577c13dbc91442ad563be0f3be928",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 5        
        // },
        // {
        //   "uuid": "e4d7eab69954844dc2c5b767ff7dd60b",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 6        
        // },
        // {
        //   "uuid": "e366566d5444cfd8e74e5e57c67b497e",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 7      
        // },
        // {
        //   "uuid": "dad70c0a4e9ff51fa838c6d03488fa17",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 8     
        // },
        // {
        //   "uuid": "8d6a19a529125f1f7a944cdc42ffb4c1",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 9       
        // },
        // {
        //   "uuid": "53c475922d3d1e68ddca7039c9bdeb0a",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 10        
        // },
        // {
        //   "uuid": "22ea0c2d0383bb3c251f2a92304a57e6",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 11       
        // },
        // {
        //   "uuid": "d94eea928db27bc7b55d0b2875fee94d",
        //   "is_member_of_exhibit": "cd1c36f45f1fa9e80b060ea9e893bab6",
        //   "date": "",
        //   "title": "",
        //   "description": "",
        //   "caption": "",
        //   "item_type": "image",
        //   "media": "",
        //   "text": "",
        //   "thumbnail": "",
        //   "type": "item",
        //   "styles": {},
        //   "is_published": 1,
        //   "order": 12       
        // }
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