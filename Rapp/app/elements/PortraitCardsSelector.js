import * as React from 'react';
import {connect} from "react-redux";
import {Button, Image, Text, TouchableHighlight, View} from "react-native";
import style from "../helpers/style";
import MainStyle from "../styles/MainStyle";
import urls from "../config/urls";
import EmptyCard from "./EmptyCard";
import {bindActionCreators} from "redux";
import * as generalActions from '../actions/generalActions';
import stripTags from 'striptags';

class PortraitCardsSelector extends React.Component {

    _showCardList(number) {
        this.props.actions.setSelectedCard(number);
    }

    getCardsLayout() {
        return ([this.props.roster[1], this.props.roster[2], this.props.roster[3]]).map((i, n) => {
            if (i === null) return <View key={n} style={style(MainStyle.cardsSelectorCard, {
                flexDirection: 'row',
                marginBottom: 20
            })}>
                <View style={{flex: 2}}>
                    <TouchableHighlight onPress={this._showCardList.bind(this, n + 1)} underlayColor="rgba(0,0,0,0.1)">
                        <EmptyCard/>
                    </TouchableHighlight>
                </View>
                <View style={{flex: 3}}/>
            </View>;
            let chancesPercent = this.props.analysis.chances && this.props.analysis.chances[n] ? this.props.analysis.chances && this.props.analysis.chances[n] : '';
            chancesPercent = Math.round(chancesPercent);
            return <View key={n} style={style(MainStyle.cardsSelectorCard, {flexDirection: 'row', marginBottom: 20})}>
                <TouchableHighlight style={{flex: 2}} onPress={this._showCardList.bind(this, n + 1)} underlayColor="rgba(0,0,0,0.2)">
                    <Image style={{height: '100%', width: '100%'}} resizeMode="contain"
                           source={{uri: urls.image_url(i.dbfId)}}/>
                </TouchableHighlight>
                <View style={{
                    flex: 3,
                    marginTop: 10,
                    marginLeft: 10,
                    justifyContent: 'space-between',
                    paddingRight: 20
                }}>
                    <View style={{flex: 3}}>
                        <Text style={style(MainStyle.cardsSelectorCardSubText)}>{i.ruName}</Text>
                        <Text style={style(MainStyle.cardsSelectorCardText, {
                            marginTop: 10,
                            fontSize: 10
                        })} numberOfLines={2}>{stripTags(i.ruText) || ''}</Text>
                        <Text style={style(MainStyle.cardsSelectorCardText, {
                            marginTop: 10,
                            fontSize: 14,
                            color: 'crimson',
                            fontWeight: '700'
                        })}>{chancesPercent ? chancesPercent + ' pts' : ''}</Text>
                    </View>
                    {this.props.roster.full ? <View style={{justifyContent: 'flex-end', flex: 2}}>
                        <TouchableHighlight onPress={() => this.props.next(i, chancesPercent)} style={{flex: 1, justifyContent: 'center'}} underlayColor="rgba(0,0,0,0)">
                            <Text style={{fontSize: 14, fontWeight: '700', textAlign: 'left'}}>Выбрать</Text>
                        </TouchableHighlight>
                    </View> : null}
                </View>
            </View>;
        })
    }

    render() {
        return <View style={{justifyContent: 'space-between', flex: 1}}>
            <View style={{flex: 9}}>
                <View style={style(MainStyle.cardsSelector, {flex: 1, flexDirection: 'column'})}>
                    {this.getCardsLayout()}
                </View>
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
                <Text style={{textAlign: 'center'}}>{this.props.analysis.text}</Text>
            </View>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingBottom: 10
            }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PortraitCardsSelector);