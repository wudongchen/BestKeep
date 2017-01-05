'use strict';
import React, {Component} from 'react';
import {View, Text, Image, ListView} from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

export default class TopOrNewGoodsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: dataSource.cloneWithRows(this.props.dataSource)
        }
    }

    componentWillReceiveProps() {
        this.setState({
            dataSource: dataSource.cloneWithRows(this.props.dataSource)
        })
    }

    render() {
        return (
            <View style={{alignItems: 'center', backgroundColor: '#FFF', marginTop: 10, paddingTop: 10}}>

                <Image
                    source={this.props.type === 0 ? require('../images/hot_home.png') : require('../images/new_home.png')}
                    style={{width: 120, height: 13, marginBottom: 10}}/>

                <ListView
                    style={{backgroundColor: '#FFF'}}
                    removeClippedSubviews={false}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderGoodsView.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections={true}
                />

            </View>
        );
    }

    _renderGoodsView(data) {
        return (
            <View style={{width: 100, paddingBottom: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={{uri: data.goodsCoverImg}} style={{width: 90, height: 90, marginBottom: 5}}/>
                <Text numberOfLines={1}
                      style={{textAlign: 'center', width: 95, fontSize: 12, marginBottom: 5}}>{data.goodsName}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{alignItems: 'center', fontSize: 11, color: '#FF1010'}}>{data.goodsPrice}</Text>
                    <Text style={{alignItems: 'center', fontSize: 8}}>{data.upText}</Text>
                </View>
            </View>
        );
    }
}