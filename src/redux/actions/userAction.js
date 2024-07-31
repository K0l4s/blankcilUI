export const setProfile = (profile) => ({
    type: 'SET_PROFILE',
    payload: { profile }
});

export const removeProfile = () => ({
    type: 'REMOVE_PROFILE'
});