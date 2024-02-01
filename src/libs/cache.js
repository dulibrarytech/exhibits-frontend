import lscache from 'lscache';

export const Cache = (() => {

    const storeExhibits = (exhibits) => {
        lscache.set('exhibits', exhibits);
    }

    const getExhibitById = (exhibitId) => {
        let exhibits = lscache.get('exhibits');
        return exhibits?.find((exhibit) => {
            return exhibit.uuid == exhibitId;
        });
    }

    const storeSearchData = (data) => {
        lscache.set('search_data', data);
    }

    const getSearchData = () => {
        return lscache.get('search_data');
    }

    const deleteSearchData = () => {
        lscache.set('search_data', undefined);
    }

    return {
        storeExhibits,
        getExhibitById,
        storeSearchData,
        getSearchData,
        deleteSearchData
    }
})()