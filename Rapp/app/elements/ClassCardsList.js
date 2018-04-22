import * as React from 'react';
import {Keyboard, SectionList, Text, TextInput, TouchableHighlight, View} from "react-native";
import classCards from '../config/cards';

export default class ClassCardsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: null
        }
    }

    _setFilter(txt) {
        this.setState({
            ...this.state,
            filter: txt
        });
    }

    _renderItem(data) {
        return <TouchableHighlight onPress={this.props.select.bind(null, data.item)} underlayColor="rgba(0,0,0,0.1)">
            <View key={data.item.id} style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 15}}>
                <Text style={{fontSize: 14}}>{data.item.ruName}</Text>
            </View>
        </TouchableHighlight>;
    }

    _renderSectionHeader(data) {
        return <View key={data.section.id}
                     style={{paddingTop: 5, paddingBottom: 5, paddingLeft: 15, backgroundColor: 'rgba(0,0,0,0.2)'}}>
            <Text style={{fontSize: 12, fontWeight: '700'}}>{data.section.title}</Text>
        </View>;
    }

    _getCardsSet(_class) {
        switch (_class) {
            case 'priest':
                return classCards.filter(item => item.cardClass === 'PRIEST' || item.cardClass === 'NEUTRAL');
            case 'mage':
                return classCards.filter(item => item.cardClass === 'MAGE' || item.cardClass === 'NEUTRAL');
            case 'warlock':
                return classCards.filter(item => item.cardClass === 'WARLOCK' || item.cardClass === 'NEUTRAL');
            case 'shaman':
                return classCards.filter(item => item.cardClass === 'SHAMAN' || item.cardClass === 'NEUTRAL');
            case 'rogue':
                return classCards.filter(item => item.cardClass === 'ROGUE' || item.cardClass === 'NEUTRAL');
            case 'druid':
                return classCards.filter(item => item.cardClass === 'DRUID' || item.cardClass === 'NEUTRAL');
            case 'warrior':
                return classCards.filter(item => item.cardClass === 'WARRIOR' || item.cardClass === 'NEUTRAL');
            case 'paladin':
                return classCards.filter(item => item.cardClass === 'PALADIN' || item.cardClass === 'NEUTRAL');
            case 'hunter':
                return classCards.filter(item => item.cardClass === 'HUNTER' || item.cardClass === 'NEUTRAL');
        }
    }

    _groupData() {
        let cardsSet = this._getCardsSet(this.props.class).sort((a, b) => a.ruName.localeCompare(b.ruName));
        let _output = {};
        let output = [];
        for (let i in cardsSet) {
            let card = cardsSet[i];
            if (!!this.state.filter) {
                let words = card.ruName.split(' ');
                let relativeWords = words.filter(word => word.slice(0, this.state.filter.length) === this.state.filter);
                if (relativeWords.length === 0) continue;
                words.map(word => {
                    let bold = word.slice(0, this.state.filter.length) === this.state.filter;
                    return <TextInput style={bold ? {fontWeight: '700'} : {}}>{word}</TextInput>;
                });
            }
            let firstLetter = card.ruName.slice(0, 1);
            if (!_output[firstLetter]) _output[firstLetter] = [];
            _output[firstLetter].push(card);
        }
        for (let i in _output) {
            output.push({
                title: i,
                id: Math.random().toString().slice(2, 7),
                data: _output[i]
            });
        }
        return output;
    }

    _getCardsList() {
        let data = this._groupData();
        if (!data.length) return <Text style={{textAlign: 'center', marginTop: 25, fontSize: 14, fontWeight: '700'}}>Нет
            доступных карт!</Text>;
        return <SectionList
            initialNumToRender='5'
            keyExtractor={(item, index) => index}
            renderItem={this._renderItem.bind(this)}
            renderSectionHeader={this._renderSectionHeader}
            sections={this._groupData()}/>;
    }

    render() {
        return <View>
            <View style={{flexDirection: 'row'}}>
                <TextInput
                    style={{
                        flex: 6,
                        borderWidth: 1,
                        borderColor: 'rgba(0,0,0,0.1)',
                        paddingTop: 15,
                        paddingBottom: 15,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                    autoFocus={false}
                    autoCorrect={false}
                    onChangeText={this._setFilter.bind(this)}
                    onSubmitEditing={Keyboard.dismiss}
                />
                <TouchableHighlight onPress={this.props.back} underlayColor="rgba(0,0,0,0.1)"
                                    style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text style={{fontSize: 12}}>Назад</Text>
                </TouchableHighlight>
            </View>
            <Text style={{fontSize: 10, color: 'rgba(0,0,0,0.4)', textAlign: 'center', padding: 3}}>
                Скрыть клавиатуру на return
            </Text>
            {this._getCardsList()}
        </View>;
    }
}