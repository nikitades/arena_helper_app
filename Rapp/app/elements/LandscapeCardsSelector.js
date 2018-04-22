import * as React from 'react';
import {connect} from "react-redux";
import {Button, Image, Text, TouchableHighlight, View} from "react-native";
import style from "../helpers/style";
import MainStyle from "../styles/MainStyle";
import urls from "../config/urls";
import * as generalActions from '../actions/generalActions';
import {bindActionCreators} from "redux";
import EmptyCard from "./EmptyCard";
import stripTags from 'striptags';

class LandscapeCardsSelector extends React.Component {

    _showCardList(number) {
        this.props.actions.setSelectedCard(number);
    }

    getCardsLayout() {
        return ([this.props.roster[1], this.props.roster[2], this.props.roster[3]]).map((i, n) => {
            if (i === null) return <View key={n} style={style(MainStyle.cardsSelectorCard, {
                flexDirection: 'row',
                marginBottom: 20
            })}>
                <View style={{flex: 1}}>
                    <TouchableHighlight onPress={this._showCardList.bind(this, n + 1)} underlayColor="rgba(0,0,0,0.2)">
                        <EmptyCard/>
                    </TouchableHighlight>
                </View>
            </View>;
            let chancesText = this.props.analysis.chances && this.props.analysis.chances[n] ? this.props.analysis.chances && this.props.analysis.chances[n] : '';
            return <View key={n} style={style(MainStyle.cardsSelectorCard)}>
                <TouchableHighlight style={{flex: 6}} onPress={this._showCardList.bind(this, n + 1)}
                                    underlayColor="rgba(0,0,0,0.2)">
                    <Image style={{height: '100%', width: '100%'}} resizeMode="contain"
                           source={{uri: urls.image_url(i.dbfId)}}/>
                </TouchableHighlight>
                <View style={{flex: 4, marginTop: 10, marginLeft: 10, justifyContent: 'space-between'}}>
                    <View>
                        <Text style={style(MainStyle.cardsSelectorCardSubText, {textAlign: 'center'})}>{i.ruName}</Text>
                        <Text style={style(MainStyle.cardsSelectorCardText, {
                            textAlign: 'center',
                            fontSize: 10
                        })} numberOfLines={2 }>{stripTags(i.ruText) || ''}</Text>
                        <Text style={style(MainStyle.cardsSelectorCardText, {
                            textAlign: 'center',
                            fontSize: 14,
                            color: 'crimson',
                            fontWeight: '700'
                        })}>{chancesText ? chancesText + ' pts' : ''}</Text>
                    </View>
                    {this.props.roster.full ?
                        <TouchableHighlight onPress={() => this.props.next(i, chancesText)} underlayColor="rgba(0,0,0,0)">
                            <Text style={{
                                fontSize: 14,
                                fontWeight: '700',
                                textAlign: 'center',
                                padding: 10
                            }}>Выбрать</Text>
                        </TouchableHighlight> : null}
                </View>
            </View>
        });
    }

    render() {
        return <View style={{flex: 1}}>
            <View style={{flex: 20}}>
                <View style={style(MainStyle.cardsSelector, {flex: 1})}>
                    {this.getCardsLayout()}
                </View>
            </View>
            <View style={{flex: 2, justifyContent: 'center', paddingTop: 25}}>
                <Text style={{textAlign: 'center'}}>{this.props.analysis.text}</Text>
            </View>
            <View style={{flex: 2, flexDirection: 'row', paddingBottom: 20}}>
                <View style={{flex: 1}}>
                    <Button onPress={this.props.changeClass} title="Сменить класс"/>
                </View>
                <View style={{flex: 1}}>
                    <Button onPress={this.props.resetRoster} title="Сбросить карты"/>
                </View>
            </View>
        </View>
    }
}

function mapStateToProps(state) {
    return {
        roster: state.roster,
        selectedClass: state.classes.current,
        analysis: state.analysis
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(generalActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandscapeCardsSelector);