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

    return {
        storeExhibits,
        getExhibitById
    }
})()