export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching);
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroeAdd = (hero) => {
    return {
        type: 'HEROE_ADD',
        payload: hero,
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching())
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters,
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTER_FETCHING_ERROR',
    }
}

// dispatch приходит автоматически, при использовании redux-thunk
export const filterActive = (typeFilter) => (dispatch) => {
    setTimeout(() => {
        dispatch({
            type: 'ACTIVE_FILTER',
            payload: typeFilter,
        });
    }, 1000);
}

export const deleteHero = (id) => {
    return {
        type: 'DELETE_HERO',
        payload: id
    }
}