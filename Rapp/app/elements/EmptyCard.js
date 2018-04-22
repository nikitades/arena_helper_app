import * as React from 'react';
import {Text, View} from "react-native";

export default class EmptyCard extends React.Component {
    render() {
        return <View style={{backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', width: '70%', height: '100%', marginLeft: '15%', marginRight: '15%'}}>
            <Text style={{fontSize: 36, textAlign: 'center'}}>?</Text>
        </View>;
    }
}