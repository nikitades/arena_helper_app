import * as React from 'react';
import {Button, ScrollView, Text, View} from "react-native";
import MainStyle from "../styles/MainStyle";
import style from "../helpers/style";
import {connect} from "react-redux";
import * as generalActions from '../actions/generalActions';
import {bindActionCreators} from "redux";

class ClassSelectorScreen extends React.Component {

    _selectClass(classCode) {
        this.props.actions.setClass(classCode);
    }

    getBoldTextForCurrentClass(classCode) {
        if (classCode === this.props.previousClass) return {fontWeight: 'bold'};
        return {};
    }

    render() {
        return <View style={{width: '100%', height: '100%'}}>
            <Text style={style(MainStyle.heading1, {textAlign: 'center'})}>Выберите класс</Text>
            <ScrollView style={{marginTop: 20}}>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'mage')} data-class="mage" title="Маг"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'priest')} data-class="priest" title="Жрец"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'warlock')} data-class="warlock" title="Чернокнижник"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'druid')} data-class="druid" title="Друид"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'rogue')} data-class="rogue" title="Разбойник"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'shaman')} data-class="shaman" title="Шаман"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'warrior')} data-class="warrior" title="Воин"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'paladin')} data-class="paladin" title="Паладин"/>
                <Button style={{...this.getBoldTextForCurrentClass()}} onPress={this._selectClass.bind(this, 'hunter')} data-class="hunter" title="Охотник"/>
            </ScrollView>
        </View>;
    }
}

function mapStateToProps(state) {
    return {
        currentClass: state.classes.current,
        previousClass: state.classes.previous
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(generalActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(ClassSelectorScreen);