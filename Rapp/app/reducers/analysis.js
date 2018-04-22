const initialState = {
    "chances": null,
    "text": null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return {
                "chances": null,
                "text": "Запрос..."
            };
        case 'ANALYSIS_TEXT':
            return {
                ...state,
                "text": action.payload
            };
        case 'ANALYSIS_CHANCES':
            return {
                ...state,
                text: action.payload.text.join("\n"),
                chances: action.payload.chances
            };
        default:
            return initialState;
    }
};