const initialState = {
    podcasts: [],
    loading: false,
    error: null,
    };

const podcastReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PODCASTS_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_PODCASTS_SUCCESS':
            return {
                ...state,
                loading: false,
                podcasts: action.payload,
            };
        case 'FETCH_PODCASTS_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}