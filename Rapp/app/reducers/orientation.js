const initialState = null;

export default (state = initialState, action) => {
    if (action.type === 'orientationChange') {
        return action.payload;
    }
    return state;
}