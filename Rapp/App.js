import React from 'react';
import Entry from "./app/Entry";
import {Provider} from "react-redux";
import configureStore from './app/store/configureStore';
import {View, Dimensions} from "react-native";

const store = configureStore();

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    _onLayout() {
        let {height, width} = Dimensions.get('window');
        store.dispatch({
            type: 'orientationChange',
            payload: width > height ? 'LANDSCAPE' : 'PORTRAIT'
        });
    }

    render() {
        return (
            <Provider onLayout={(e) => {alert('bibi')}} store={store}>
                <View style={{flex: 1}} onLayout={this._onLayout.bind(this)}>
                    <Entry style={{backgroundColor: 'red'}}/>
                </View>
            </Provider>
        );
    }
}