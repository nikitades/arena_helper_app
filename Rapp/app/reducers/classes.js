const initialState = {
    current: null,
    previous: null
};

export default function classes(state = initialState, action) {
    switch (action.type) {
        case 'SET_CLASS':
            return {
                current: action.payload,
                previous: state.current || null
            };
        case 'RESET_CLASS':
            return {
                current: null,
                previous: state.current || null
            };
        default:
            return state;
    }
}