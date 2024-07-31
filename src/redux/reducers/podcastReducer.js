const initialState = {
    currentPodcast: null,
    time: 0,
    isPlaying: false,
    volume: 1
    };

const podcastReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PODCASTS':
            return {
                currentPodcast: action.payload.currentPodcast,
                time: action.payload.time,
                isPlaying: action.payload.isPlaying,
                volume: action.payload.volume
            };
        case 'REMOVE_PODCASTS':
            return {
                currentPodcast: null,
                time: 0,
                isPlaying: false,
                volume: 1
            };
        default:
            return state;
    }
}