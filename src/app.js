'use strict';

import React, { Component } from 'react';
import { View, Navigator } from 'react-native';
import MainScreen from './pages/MainScreen';

export default class App extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ component: MainScreen }}
                    renderScene={(route, navigator) => {
                        return <route.component navigator={navigator}  {...route.arges} />
                    } } />
            </View>
        );
    }
}