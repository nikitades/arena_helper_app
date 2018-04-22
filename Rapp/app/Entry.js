import * as React from 'react';
import {connect} from 'react-redux';
import {View, Dimensions, Text} from 'react-native';
import ClassSelectorScreen from "./containers/ClassSelectorScreen";
import CardsSelectorScreen from "./containers/CardsSelectorScreen";
import MainStyle from "./styles/MainStyle";
import style from "./helpers/style";

class Entry extends React.Component {
    constructor(props) {
        super(props);
    }

    getContent() {
        switch (true) {
            case !this.props.currentClass:
                return <ClassSelectorScreen/>;
            default:
                return <CardsSelectorScreen/>;
        }
    }

    render() {
        return <View style={style(MainStyle.rootView, this.props.orientation === 'LANDSCAPE' ? {} : {paddingTop: 20})}>
            {this.getContent()}
        </View>;
    }
}

function mapStateToProps(state) {
    return {
        currentClass: state.classes.current,
        orientation: state.orientation
    };
}

export default connect(mapStateToProps)(Entry);

