'use strict';
import React, {Component} from 'react';
import {View, Text, Image, ListView, StyleSheet} from 'react-native';
import Util from "../utils/Util";
import HomeClassifyGoodsList from './HomeClassifyGoodsList';

const deviceWidth = Util.getWidth();
const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

export default class HomeClassifyList extends Component {

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
                renderRow={this._renderClassifyView.bind(this)}
                enableEmptySections={true}
            />
        );
    }

    _renderClassifyView(data) {
        return (
            <View style={{alignItems: 'center', backgroundColor: '#FFF', marginTop: 10, paddingTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                    <Image source={{uri: data.iconImg}} style={{width: 20, height: 20}}/>
                    <Text style={{fontSize: 14, color: '#000000'}}>{data.name}</Text>
                    <Image source={require('../images/home_right.png')} style={{width: 3, height: 6.5, marginLeft: 5}}/>
                </View>
                <View style={{backgroundColor: '#F4F4F4', width: deviceWidth, height: 0.5}}/>
                <HomeClassifyGoodsList dataSource={data.goodsList}/>
            </View>
        );
    }
}
