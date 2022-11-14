'use strict'

import axios from 'axios';

export const index = (() => {

    let ELASTIC_URL;
    let ELASTIC_INDEX;

    const getAllExhibits = async (id) => {
        let exhibits = [];
        
        try {
            // Test
            let response = await axios.get('http://localhost:5678/api/v1/exhibits');

            // TODO
            // let response = await axios.get(`${ELASTIC_URL}/ELASTIC_INDEX/_search`, {query: '*'});
            
            exhibits = response.data;
        }
        catch(e) {
            console.error(e);
        }
        
        return exhibits;
    }

    const getExhibitById = async (id) => {
        let exhibit = null;

        try {
            // Test
            let response = await axios.get(`http://localhost:5678/api/v1/exhibits/${id}`);
            let data = response.data;

            // TODO
            // let data = await axios.get(`${ELASTIC_URL}/ELASTIC_INDEX/_search`, {query: {id field == id}});

            // Test
            response = await axios.get(`http://localhost:5678/api/v1/exhibits/${id}/items`);
            let items = response.data;

            // TODO
            // let sections = await axios.get(`${ELASTIC_URL}/ELASTIC_INDEX/_search`, {query: {'is_member_of': id});

            exhibit = {data, items};
        }
        catch(e) {
            console.error(e);
        }

        return exhibit;
    }

    return {
        getAllExhibits,
        getExhibitById
    }
})()
