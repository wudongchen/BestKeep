'use strict';

import React, {Component} from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    ListView,
    TouchableOpacity,
    ToastAndroid,
    StyleSheet,
} from "react-native";
import ViewPager from "react-native-viewpager";
import Util from "../utils/Util";
import TopOrNewGoodsList from "../components/TopOrNewGoodsList";
import HomeClassifyList from "../components/HomeClassifyList";
import HomeBKSelectedList from "../components/HomeBKSelectedList";

const deviceWidth = Util.getWidth();
const tableRowCount = 4;
const tableWidth = deviceWidth / tableRowCount;

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannerDataSource: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2
            }),
            homeTableDataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            }),
            hotDataSource: [],
            newDataSource: [],
            classifyDataSource: [],
            bkSelectedDataSource: [],
            toolbarBackgroundColor: 'rgba(0,0,0,0)',
            isLoad: true
        };
    }

    componentDidMount() {
        this.getHomeData();
    }

    render() {
        if (this.state.isLoad) {
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',marginTop: Util.isAndroid ? 0 : 20}}>
                    <Text style={{textAlign: 'center', fontSize: 20}}>加载中...</Text>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1, marginTop:  20}}>
                    <ScrollView style={{backgroundColor: '#F2F2F2'}} onScroll={this._onScroll.bind(this)}>
                        {this.renderTopBanner()}
                        {this.renderTable()}
                        <TopOrNewGoodsList dataSource={this.state.hotDataSource} type={0}/>
                        <TopOrNewGoodsList dataSource={this.state.newDataSource} type={1}/>
                        <Image source={require('../images/home_bk_selected.png')}
                               style={{width: deviceWidth, height: 120, marginTop: 10}}
                               resizeMode={Image.resizeMode.stretch}/>
                        <HomeBKSelectedList dataSource={this.state.bkSelectedDataSource}/>
                        <HomeClassifyList dataSource={this.state.classifyDataSource}/>
                    </ScrollView>
                    {this.renderTopToolbar()}
                </View>
            );
        }
    }

    _onScroll(e) {
        var y = e.nativeEvent.contentOffset.y;

        if (y < 112) {
            this.setState({toolbarBackgroundColor: 'rgba(0,0,0,0)'})
        } else {
            this.setState({toolbarBackgroundColor: 'rgba(255,255,255,255)'})
        }
    }

    /*头部工具栏*/
    renderTopToolbar() {
        return (
            <View
                style={[styles.searchStyle, {backgroundColor: this.state.toolbarBackgroundColor}]}>
                <Image source={require('../images/scan_code.png')} style={styles.scanCodeIconStyle}/>
                <View style={styles.searchTextViewStyle}>
                    <Image source={require('../images/search.png')} style={styles.searchIconStyle}/>
                    <Text style={styles.searchTextStyle}>请输入商品名称</Text>
                </View>
                <Image source={require('../images/message.png')} style={styles.msgIconStyle}/>
            </View>
        );
    }

    /*广告Banner*/
    renderTopBanner() {
        return (
            <ViewPager
                locked={true}
                dataSource={this.state.bannerDataSource}
                renderPage={this._renderTopBannerPager.bind(this)}
                isLoop={true}
                autoPlay={true}/>
        );
    }

    _renderTopBannerPager(data) {
        return (
            <Image
                source={{uri: data.img}}
                style={styles.pageStyle}
                resizeMode={Image.resizeMode.cover}
            />
        );
    }

    /*首页Table*/
    renderTable() {
        return (
            <ListView
                style={{backgroundColor: '#FFF'}}
                removeClippedSubviews={true}
                dataSource={this.state.homeTableDataSource}
                renderRow={this._renderTableView.bind(this)}
                contentContainerStyle={styles.homeTableStyle}
            />
        );
    }

    _renderTableView(data) {
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={this._onClickButton.bind(this, data)}>
                <View style={styles.homeTableViewStyle}>
                    <Image source={{uri: data.img}} style={{width: 40, height: 40, marginBottom: 5}}/>
                    <Text style={{fontSize: 12}}>{data.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onClickButton(data) {
        if (Util.isAndroid) {
            ToastAndroid.show(data.name, ToastAndroid.SHORT);
        } else {

        }
    }

    getHomeData() {
        fetch("http://api.bestkeep.cn/index_v228").then((response)=>response.json())
            .then((responseJson)=> {
                let result = responseJson.data;
                this.setState({
                    bannerDataSource: this.state.bannerDataSource.cloneWithPages(result.bannerList),
                    homeTableDataSource: this.state.homeTableDataSource.cloneWithRows(result.topIconList),
                    hotDataSource: result.startList,
                    newDataSource: result.newList,
                    classifyDataSource: result.categoryIconList,
                    bkSelectedDataSource: result.bkjxList[0].goodsList,
                    isLoad: false
                });
            }).catch((error)=> {
            alert(error)
        });
    }
}

const styles = StyleSheet.create({
    //头部Toolbar
    searchStyle: {
        width: deviceWidth,
        height: 48,
        top: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#00000000'
    },
    scanCodeIconStyle: {
        height: 20,
        width: 20,
        flex: 0,
        marginLeft: 10,
        marginRight: 10
    },
    searchIconStyle: {
        height: 20,
        width: 20,
        marginLeft: 5,
    },
    msgIconStyle: {
        height: 20,
        width: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    searchTextStyle: {
        color: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 5,
    },
    searchTextViewStyle: {
        width: deviceWidth - 80,
        backgroundColor: '#D9D9D97D',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    //广告ViewPage
    pageStyle: {
        width: deviceWidth,
        height: 160
    },
    //HomeTable
    homeTableStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeTableViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
        width: tableWidth,
    },
    hotStyle: {}
});

