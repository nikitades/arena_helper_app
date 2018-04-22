const initialState = {
    1: null,
    2: null,
    3: null,
    full: false,
    selecting: null,
    log: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_CARD':
            return {
                ...state,
                selecting: action.payload
            };
        case 'RESET_ALL_CARDS':
            return {
                ...state,
                1: null,
                2: null,
                3: null,
                full: false,
                log: []
            };
        case 'RESET_SELECTED_CARD':
            return {
                ...state,
                selecting: null
            };
        case 'SELECT_CARD':
            return {
                ...state,
                [+state.selecting]: action.payload,
                full: (() => {
                    let result = 0;
                    for (let i = 1; i < 4; i++) {
                        if ((state.selecting === i && !!action.payload) || !!state[i]) result++;
                    }
                    return result >= 3;
                })(),
                selecting: null
            };
        case 'NEXT':
            let newLog = [];
            if (state.log.length) newLog = newLog.concat(state.log);
            newLog.push(action.payload);
            return {
                ...state,
                1: null,
                2: null,
                3: null,
                selecting: null,
                log: newLog
            };
        default:
            return state;
    }
}
