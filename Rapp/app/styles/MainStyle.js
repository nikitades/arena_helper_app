import {StyleSheet} from 'react-native';
let style ={
    rootView: {
        marginTop: 20,
        flex: 1
    },
    heading1: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    cardsSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    cardsSelectorCard: {
        flex: 1,
        height: '100%',
        alignContent: 'flex-start'
    },
    cardsSelectorCardText: {
        textAlign: 'left',
        fontWeight: "700"
    },
    cardsSelectorCardSubText: {
        textAlign: 'left',
        fontWeight: "400"
    }
};
export default StyleSheet.create(style);