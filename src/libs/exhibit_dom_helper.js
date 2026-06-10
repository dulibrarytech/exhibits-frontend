/**
 * exhibit_dom_helper.js
 * 
 * functions to update the dom elements on the exhibit template
 * for minor updates that can not be done locally, or are not possible with css
 */

'use strict'

/** 
 * perform updates on exhibit item elements that are on the exhibit template
 */ 
export const updateExhibitTemplateElements = (exhibitTemplate) => {
  const exhibitItems = exhibitTemplate.querySelector(".exhibit-items").children;

  for(const exhibitItem of exhibitItems) {
      
      // set subheading background color to next sibling item's background color
      if(exhibitItem.children[0].classList.contains("exhibit-subheading")) { 
          setSubheadingBackgroundColor(exhibitItem)
      }
  }
}

/** 
 * sets a subheading item background color to the background color of its sibling item on the template, if the background color has not been set by the user styles
 */
const setSubheadingBackgroundColor = (subheadingItem) => {
  let siblingItem = subheadingItem.nextElementSibling.querySelector(".template-item"); // this element will have styles set by user data
  let subheadingElement = subheadingItem.children[0];

  if(siblingItem && subheadingElement.style.backgroundColor == "") {
      subheadingElement.style.backgroundColor = siblingItem.style.backgroundColor;
  }
}