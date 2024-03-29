/**
	Copyright 2019 University of Denver

	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.

	You may obtain a copy of the License at
	http://www.apache.org/licenses/LICENSE-2.0

	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.
*/

 /**
 * @file 
 *
 * Paginator class
 * Create pagination data object for the view controllers
 *
 */

 'use strict';

 /**
  * create()
  * 
  * Creates the data to build a paginator for search results
  * 
  * @param {object} items - array of search results (paged)
  * @param {integer} page - page number
  * @param {integer} maxItems - maximum results per page
  * @param {integer} totalItems - total search results
  * @param {string} path - page path to parse out/update the "page" parameter
  * @returns paginatorData
  * 
  * @typedef {object} paginatorData
  * @property {integer}
  * @property {integer}
  * @property {integer}
  * @property {integer}
  * @property {integer}
  * @property {integer}
  * @property {integer}
  */
 export const create = function(items, page, maxItems, totalItems, path) {
    const MAX_PAGE_LINKS = 5;

    var pagination = {};
    pagination['page'] = page || 1;

    var pattern = /[?&]page=[0-9]*/i;
    if(path.search("page=") > 0) { // if(path.search(pattern) > 0) {
        path = path.replace(pattern, "");
    }

    // Determine is page param should be added as existing or initial param
    var prefix = path.indexOf("?") >= 0 ? "&" : "?";

    // Get total number of pages to be displayed in the page list
    pagination['pageCount'] = Math.ceil(totalItems / maxItems);

    // First item on the current page
    pagination['beginCount'] = (maxItems * (page-1)) + 1;

    // Get the max number of hits displayed as of this page.  
    if(items.length < maxItems) {
        // This is the last page.  Page hits should == the total number of hits here
        pagination['pageHits'] = (pagination.beginCount - 1) + items.length;
    }
    else {	
        pagination['pageHits'] = items.length * page;
    }

    // The total number of search results
    pagination['totalHits'] = totalItems;
    pagination['buttons'] = getButtons(page, maxItems, totalItems);

    // Add the path to the prev/next buttons
    pagination['path'] = {};
    if(pagination.buttons.prev > 0) {
        pagination.path['prev'] = path + prefix + "page=" + parseInt(pagination.buttons.prev);
    }
    if(pagination.buttons.next > 0) {
        pagination.path['next'] = path + prefix + "page=" + parseInt(pagination.buttons.next);
    }
    if(pagination.buttons.first > 0) {
        pagination.path["first"] = path + prefix + "page=1";
    }
    if(pagination.buttons.last > 0) {
        pagination.path["last"] = path + prefix + "page=" + parseInt(pagination.pageCount);
    }
    pagination.path['current'] = path + prefix;

    // Get the max number of page links to show
    pagination['maxPageLinks'] = MAX_PAGE_LINKS;

    // Show the page links if there are results
    if(pagination.totalHits > 0 && pagination.pageCount > 1) {

        // Pages present are within the range of max links.  Show current page within this range
        if(page <= (pagination.maxPageLinks / 2)) {

            // First page is always 1 here
            pagination['firstPageLink'] = 1;

            // Get the last page value.  If pages present are less than max links per page value, the last page is the max value.
            if(pagination.pageCount <= pagination.maxPageLinks) {
                pagination['lastPageLink'] = pagination.pageCount;
            }
            else {
                pagination['lastPageLink'] = pagination.maxPageLinks;
            }
        }

        // Pages present exceed the range of max links.  Show the current page at the center of the page list for ease of forward/backward navigation
        else {
            pagination['firstPageLink'] = parseInt(page) - (pagination.maxPageLinks / 2);
            pagination['lastPageLink'] = parseInt(page) + (pagination.maxPageLinks / 2);

            // Make sure the page list does not exceed the page count
            if(pagination.lastPageLink > pagination.pageCount) {
                pagination.lastPageLink = pagination.pageCount;
            }
        }
    }

    // If no search results, do not show any page links
    else {
        pagination['firstPageLink'] = 0;
        pagination['lastPageLink'] = 0;
    }

    return pagination;
}

/**
 * 
 *
 * @param 
 * @return 
 */
export const paginateResults = function(results, page) {
    var index = page < 1 ? 0 : page-1;
    var response = {}, maxResults = Settings.searchResultsPerPage;
    var offset = index * maxResults;

    response['results'] = [];
    response['data'] = {};

    for(var i=offset; i<(maxResults + offset); i++) {
        if(typeof results[i] != 'undefined') {
            response.results.push(results[i]);
        }
    }

    if(response.results.length < 1) {
        response.data['total'] = "";
        response.data['pageTotal'] = "";
        response.data['pageStart'] = "";
    }
    else {
        response.data['total'] = results.length;
        response.data['pageTotal'] = response.results.length + offset;
        response.data['pageStart'] = offset + 1;
    }

    return response;
}

/**
 * 
 *
 * @param 
 * @return 
 */
const getButtons = function(page, maxItems, totalItems) {
    var buttons = {
        prev: 0,
        next: 0,
        first: 0,
        last: 0
    }

    if(typeof page == "string") {
        page = parseInt(page);
    }

    // Show a next button if curent page * items per page still leaves room for more results
    if(page * maxItems < totalItems) {
        buttons.next = page+1;
        buttons.last = 1;
    }
    // Show a previous button if this is not the first page
    if(page > 1) {
        buttons.prev = page-1;
        buttons.first = 1;
    }

    return buttons;
}
 