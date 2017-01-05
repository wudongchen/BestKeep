'use strict';

import React, { Component } from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomePage from './HomePage'
import ClassifyPage from './ClassifyPage'
import ShopCartPage from './ShopCartPage'
import MePage from './MePage'

export default class MainScreen extends Component {

    static defaultProps = {
        selectedColor: '#03BFA0'
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    render() {
        const {selectedColor} = this.props;
        return (
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabBar}>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'home'}
                    title='首页'
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => this.setState({ selectedTab: 'home' })}
                    renderIcon={() => <Image source={require('../images/tab/tab_home.png')} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={require('../images/tab/tab_home_sel.png')} style={styles.icon} />}
                    >
                    <HomePage />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'classify'}
                    title='分类'
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => this.setState({ selectedTab: 'classify' })}
                    renderIcon={() => <Image source={require('../images/tab/tab_classify.png')} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={require('../images/tab/tab_classify_sel.png')} style={styles.icon} />}
                    >
                    <ClassifyPage />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'shopCart'}
                    title='购物车'
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => this.setState({ selectedTab: 'shopCart' })}
                    renderIcon={() => <Image source={require('../images/tab/tab_shopcart.png')} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={require('../images/tab/tab_shopcart_sel.png')} style={styles.icon} />}
                    >
                    <ShopCartPage />
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'me'}
                    title='我的'
                    selectedTitleStyle={{ color: selectedColor }}
                    onPress={() => this.setState({ selectedTab: 'me' })}
                    renderIcon={() => <Image source={require('../images/tab/tab_me.png')} style={styles.icon} />}
                    renderSelectedIcon={() => <Image source={require('../images/tab/tab_me_sel.png')} style={styles.icon} />}
                    >
                    <MePage />
                </TabNavigator.Item >
            </TabNavigator>
        );
    }
    componentWillMount() {
        const {selectedColor, normalColor} = this.props;
    }
}

const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
    },
    icon: {
        height: 25,
        width: 25
    }
});
