'use strict';
import React, {Component} from 'react';
import {View, Text, Image, ListView, StyleSheet} from 'react-native';
import Util from "../utils/Util";

const deviceWidth = Util.getWidth();
const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class HomeBKSelectedList extends Component {

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
                style={{backgroundColor: '#F2F2F2'}}
                pageSize={2}
                removeClippedSubviews={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderBKSelectedView.bind(this)}
                enableEmptySections={true}
            />
        );
    }

    _renderBKSelectedView(data) {
        return (
            <View style={{flexDirection: 'row', backgroundColor: '#FFF', padding: 10}}>
                <Image source={{uri: data.goodsCoverImg}} style={{width: 110, height: 110, marginRight: 10}}/>
                <View style={{flexDirection: 'column', marginBottom: 10}}>
                    <Text style={{fontSize: 15, color: '#404040'}} numberOfLines={1}>{data.goodsSpecialDescribe}</Text>
                    <Text style={{fontSize: 12, color: '#666666'}} numberOfLines={2}>{data.goodsName}</Text>
                    <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-end'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text
                                style={{alignItems: 'center', fontSize: 17, color: '#FF1010'}}>{data.goodsPrice}</Text>
                            <Text style={{alignItems: 'center', fontSize: 10, color: '#666666'}}>{data.upText}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 11, color: '#666666'}}>市场价: </Text>
                            <Text style={{
                                fontSize: 11,
                                color: '#666666',
                                textDecorationLine: 'line-through'
                            }}>{data.goodsMarketPrice}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
