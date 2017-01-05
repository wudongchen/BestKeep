'use strict';
import React, {Component} from 'react';
import {View, Text, Image, ListView, StyleSheet} from 'react-native';
import Util from "../utils/Util";

const deviceWidth = Util.getWidth();
const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});
const rowCount = 3;
const classifyWidth = deviceWidth / rowCount;

export default class HomeClassifyGoodsList extends Component {

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
            <ListView
                style={{backgroundColor: '#FFF'}}
                removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderClassifyGoodsView.bind(this)}
                contentContainerStyle={styles.goodsListStyle}
                enableEmptySections={true}
            />
        );
    }

    _renderClassifyGoodsView(data) {
        return (
            <View style={styles.goodsViewStyle}>
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
const styles = StyleSheet.create({
    goodsListStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    goodsViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: classifyWidth,
    },
});
