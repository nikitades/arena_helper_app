import * as React from 'react';
import {Text, View} from "react-native";
import {connect} from "react-redux";
import PortraitCardsSelector from "../elements/PortraitCardsSelector";
import LandscapeCardsSelector from "../elements/LandscapeCardsSelector";
import ClassCardsList from "../elements/ClassCardsList";
import {bindActionCreators} from "redux";
import * as generalActions from '../actions/generalActions';

class CardsSelectorScreen extends React.Component {
    render() {
        if (this.props.roster.log.length === 30) {
            let totalScore = 0;
            for (let i in this.props.roster.log) {
                let card = this.props.roster.log[i];
                totalScore += parseInt(card.tierScore);
            }
            return <View style={{padding: 20}}>
                <Text style={{textAlign: 'center', margin: 10}}>Колода собрана!</Text>
                <Text style={{textAlign: 'center', margin: 10}}>Суммарная крутизна: {totalScore}</Text>
            </View>
        }
        if (!this.props.roster.selecting) {
            let props = {resetRoster: this._resetRoster.bind(this), changeClass: this._changeClass.bind(this), next: this._next.bind(this)};
            return <View style={{flex: 1, alignContent: 'space-around'}}>
                {this.props.orientation === 'PORTRAIT' ? <PortraitCardsSelector {...props}/> :
                    <LandscapeCardsSelector {...props}/>}
            </View>;
        }
        return <ClassCardsList back={this.props.actions.resetSelectedCard} select={this._selectCard.bind(this)} class={this.props.currentClass}/>
    }

    async _selectCard(card) {
        await this.props.actions.selectCard(card);
        if (this.props.roster.full) this.props.actions.fetchAnalysis(this.props.currentClass, this.props.roster.log, [this.props.roster[1], this.props.roster[2], this.props.roster[3]]);
    }

    _changeClass() {
        this.props.actions.resetClass();
        this.props.actions.resetAllCards();
    }

    _resetRoster() {
        this.props.actions.resetAllCards();
    }

    _next(card, chances) {
        this.props.actions.next(card, chances);
    }
}

function mapStateToProps(state) {
    return {
        currentClass: state.classes.current,
        roster: state.roster,
        orientation: state.orientation
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(generalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsSelectorScreen);