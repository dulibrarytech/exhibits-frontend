<script>
    import Vertical_Scroll from '../../templates/Exhibit__Vertical_Scroll.svelte';

    let items = [
        /* heading as separate object in exhibit (with order) ? */
        {
            "type": "heading",
            "is_member_of_exhibit": "1",
            "text": "Settler Colonialism",
            "subtext": "and the University of Denver",
            "order": 1
        },
        {
            "uuid": "f14d40a9ba5f040c5868c36b473ad7f5",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "title": "Settler Colonialism and the University of Denver",
            "caption": "Image from Kynewisbok, vol36, academic year 1933-1934",
            "template": "row",
            "item_type": "image",
            "url": "f14d40a9ba5f040c5868c36b473ad7f5.jpg",
            "text": "<p>The history of the “Pioneer” nickname and related mascots is inextricably intertwined with the U.S.-specific history of settler colonialism. Settler-colonialism as a system has its goal to eliminate (typically through genocide), replace, and/or subjugate the communities indigenous to the land that the colonizers inhabit; this system is how the United States was \“settled.\” </p>"+
                "<p>The state of Colorado saw one of the most brutal examples of settler colonialism in the Sand Creek Massacre, which took place in November 1864, just months after the University of Denver was founded. Colorado’s Third Cavalry, led by Colonel John Chivington (also a member of the DU Board of Trustees and early donor to DU), committed the massacre, killing hundreds of mostly Cheyenne and Arapaho women, children, and elders. John Evans, the founder of the University of Denver and then-Territorial Governor, was found by the John Evans Study Committee to have been culpable for the massacre given his aggressively anti-Native rhetoric and actions leading up to the massacre. </p>",
            "type": "item",
            "layout": "item_bottom",
            "is_published": 1,
            "order": 2,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "fae0f084c5cf26968c65577028af0150",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "title": "Settler Colonialism and the University of Denver",
            "caption": "Image from Kynewisbok, vol36, academic year 1933-1934",
            "template": "row",
            "item_type": "image",
            "url": "fae0f084c5cf26968c65577028af0150.jpg",
            "text": "<p>The University began to reckon with its role in and responsibility for the Sand Creek Massacre in the years leading up to the 150th anniversary of both the University and the Massacre in 2014. A committee of faculty and staff from DU and other institutions was created to inquire into the nature of John Evans’ involvement in the Sand Creek Massacre. The University of Denver \"John Evans Study Committee Report\" was produced, and the study found John Evans culpable in the Sand Creek Massacre. This report and some of the recommendations from the Native American Inclusivity Task Force (2016) helped implement some modest structural change, but these changes have proven to be inconsistent and incomplete. The Native Student Alliance (NSA) has been the primary force behind the most recent demands to remove both the “Boone” character and the “Pioneer” moniker, as both are legacies of the U.S. and DU’s history with settler colonialism. </p>"+
                "<p>As so many communities reckon with the presence and prominence of statues, memorials, flags, and other signifiers of our racist and colonial history, the University of Denver has a choice: Which side of history do we want to be on? </p>",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 3,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "type": "heading",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "text": "Why #NoMorePios?",
            "order": 4
        },
        {
            "uuid": "8622855bad898d8002d50d9c7b035265",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "October 29, 2020",
            "title": "Response letter from members of the University of Denver Indigenous Faculty regarding Chancellor’s communication on 10/21/2020",
            "caption": "Response letter from members of the University of Denver Indigenous Faculty regarding Chancellor’s communication on 10/21/2020",
            "template": "row",
            "item_type": "pdf",
            "url": "8622855bad898d8002d50d9c7b035265.pdf",
            "text": "The #NotYourMascots campaign started in 2014 on social media by journalist Jacqueline Keeler (Diné and Yankton Sioux). She explains that the mission of the campaign is to \"combat the public misappropriation of Native American imagery, and [call] out entities complacent with, as well as ones directly profiting from, blatant racism.\" Though #NoMorePios aims to address the \"Pioneer\" moniker and the associated mascots rather than the appropriative imagery of Native peoples, the two have similar goals. This image and the rest of the exhibit show that the \"Pioneer\" nickname, used since 1925, has been associated with the glorification of settler colonialism and related cultural appropriation of images of Native peoples."+
                "Other schools in the American West with similar mascot and nickname histories have changed their mascots in response to student protest and engagement. In 2016, the student newspaper of Whitman College (founded 1859) in Walla Walla, Washington changed their name from “The Pioneer” to “The Whitman Wire.” The editors wrote, “At the time the paper was founded, the college was in the midst of reinforcing a telling of history that celebrated the arrival of white invaders–pioneers–to the Columbia Plateau. According to this story of the pioneers, they arrived in an empty and savage land. In reality, they were coming into the homelands of the Cayuse, Walla Walla, Umatilla and other peoples who have inhabited this land for as long as any can remember.” (Johnson, Cornett, and Clay, 2016). The California State University campus at Long Beach removed a statue of “Prospector Pete” from the courtyard (Del Real, 2018). Another campus of California State University at East Bay removed Pioneer Pete as their mascot in 2018. The University has, however, retained the “pioneer” moniker (Diaz, 2018). "+
                "While the Pioneer moniker persists, continued harm to the original inhabitants of the land that the University of Denver sits on, and all Indigenous peoples, is inevitable.",
            "type": "item",
            "layout": "item_right",
            "is_published": 1,
            "order": 5,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "type": "heading",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "text": "Colonialism and Stereotypes:",
            "subtext": "How Mascots Can Harm",
            "order": 6
        },
        {
            "uuid": "4c49851b1e3cde26737fe83d5d544a4c",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "title": "Two-Page \"Homecoming\" Spread in 1976-77 Kynewisbok Yearbook",
            "caption": "Two-Page \"Homecoming\" Spread in 1976-77 Kynewisbok Yearbook",
            "template": "row",
            "item_type": "image",
            "url": "4c49851b1e3cde26737fe83d5d544a4c.png",
            "text": "Mascots that uphold and reinforce settler colonial stereotypes can have negative psychological ramifications for Native youth. Stephanie Fryberg (Tulalip), writing with several co-authors (2010) found that after viewing mascots and “romantic” movies like Pocahontas, Native youth had lower self-esteem and sense of community worth (2010). Davis-Delano, Gone, and Fryberg (2020) explored the psychosocial effects of mascots on Native youth through a comprehensive review. They found that Native American mascots, regardless of the stated intent to “honor” Native Americans, “induce or correlate with negative psychosocial outcomes.” There was no evidence from any study that Native American mascots foster positive or beneficial psychosocial effects for Native Americans.” (Davis-Delano et al., 2020).  The use of mascots and other romanticized views of Native Americans and the American West maintain the harmful stereotype that Native Americans are part of the historicized past, rather than contemporary people who are part of sovereign nations that continue to survive and resist. "+
                "As the University re-engages the Native American Community Advisory board and continues down the path of reconciliation with the Northern Cheyenne, Northern Arapaho and Southern Cheyenne and Arapaho Nations, it is important that senior leadership reckon honestly and transparently with the impacts of our decisions about messaging and representation in regards to the mascot and Pioneer nickname.",
            "type": "item",
            "layout": "item_right",
            "is_published": 1,
            "order": 7,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "type": "heading",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "text": "Mascots, Nicknames, and Resistance Timeline (1864-2000)",
            "subtext": "",
            "order": 8
        },
        {
            "uuid": "27e8d544f03300b782ab2bf39d3cbb8a",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "March 5, 1864",
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
            "order": 9,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "6cf1a7cf3bd10f588bd0122d05346877",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "November 29, 1864 ",
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
            "order": 10,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "69cc54aa37cc876deb529821667e2f89",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "1919",
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
            "order": 11,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "e5dda358941b0bd63e474a5a27a723c0",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "October 1924",
            "title": "\"Denver 'Battling Ministers' Seek Fitting Name\" Clarion Article.",
            "description": "Clarion article “Denver ‘Battling Ministers’ Seek Fitting Name: War Cry to Replace Outworn Slogans is Big Contest Aim” highlights student desire to change nickname to something that better reflects the school mission and spirit.",
            "caption": "Clarion article “Denver ‘Battling Ministers’",
            "template": "grid",
            "columns": "4",
            "item_type": "image",
            "url": "e5dda358941b0bd63e474a5a27a723c0.jpeg",
            "text": "test? text",
            "type": "item",
            "layout": "item_top",
            "is_published": 1,
            "order": 12,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "a72e0377e0dce115e5bc71fac040dbdb",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "1925",
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
            "order": 13,
            "created": "2022-10-13T20:24:20.000Z"
        },
        {
            "uuid": "b2d4e85c511220df168e4240583de4e5",
            "is_member_of_exhibit": "d3e461769ebe6c4c15f828724f923677",
            "date": "1940s to 1950s",
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
            "order": 14,
            "created": "2022-10-13T20:24:20.000Z"
        }
    ]
</script>

<div class="test">
    <Vertical_Scroll {items} />
</div>