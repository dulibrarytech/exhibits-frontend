'use strict' 

import { Configuration } from '../config/config.js';

let {
    exhibitsClientApiKey = ""

} = Configuration;

export const validateApiKey = (keyString) => {
    let isValid = false;

    if(typeof keyString == 'string' && exhibitsClientApiKey.localeCompare(keyString.trim()) === 0) {
        isValid = true;
    }

    return isValid;
}