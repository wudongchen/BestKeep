'use strict';

import {Platform, Dimensions} from "react-native"

let Util = {
    isAndroid: ()=> {
        if (Platform.OS === 'android') {
            return true;
        } else {
            return false;
        }
    },
    getWidth: ()=> {
        return Dimensions.get('window').width;
    },
    getHeight: ()=> {
        return Dimensions.get('window').height;
    }
};

export default Util;