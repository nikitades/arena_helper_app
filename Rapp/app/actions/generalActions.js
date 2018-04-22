import urls from "../config/urls";

export function setClass(classCode) {
    return {
        type: 'SET_CLASS',
        payload: classCode
    }
}

export function resetClass() {
    return {
        type: 'RESET_CLASS'
    };
}

export function setSelectedCard(number, state) {
    return {
        type: 'SET_SELECTED_CARD',
        payload: number
    };
}

export function resetSelectedCard() {
    return {
        type: 'RESET_SELECTED_CARD'
    }
}

export function resetAllCards() {
    return {
        type: 'RESET_ALL_CARDS'
    };
}

export function selectCard(card) {
    return {
        type: 'SELECT_CARD',
        payload: card
    };
}

export function fetchAnalysis(currentClass, log, roster) {
    return async dispatch => {
        dispatch({
            type: 'FETCH_START'
        });
        let url = urls.multiScore(currentClass, log, roster);
        let data;
        try {
            data = await fetch(url, {
                method: 'GET',
                headers: {
                    "Referer": urls.site_address() + '/arena/' + currentClass,
                    "X-Requested-With": "XMLHttpRequest"
                }
            });
        } catch (e) {
            dispatch({
                type: 'ANALYSIS_TEXT',
                payload: 'Сервер не отвечает!'
            });
        }
        data = await data.json();
        dispatch({
            type: 'ANALYSIS_CHANCES',
            payload: {
                chances: data.chances,
                text: data.msg.filter((item, i) => {
                    return data.msg.indexOf(item) === i;
                }).map(item => {
                    switch (item) {
                        case 'heal_needed':
                            return 'Нужно лечение!';
                        case 'big_cards_needed':
                            return 'Нужны большие карты!';
                        case 'silence_needed':
                            return 'Нужна немота!';
                        case 'draw_needed':
                            return 'Нужен добор!';
                        case 'removal_needed':
                            return 'Нужны ремувалы!';
                        default:
                            return item;
                    }
                })
            }
        })
    }
}

export function next(card, chances) {
    return {
        type: 'NEXT',
        payload: {
            ...card,
            tierScore: chances
        }
    };
}