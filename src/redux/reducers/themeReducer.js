const initialState = {
    theme: localStorage.getItem('theme-mode') || 'dark',
};

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            const newTheme = state.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('chakra-ui-color-mode', newTheme);
            console.log(localStorage.getItem('theme-mode'));
            return {
                ...state,
                theme: newTheme,
            };
        default:
            return state;
    }
};

export default themeReducer;
