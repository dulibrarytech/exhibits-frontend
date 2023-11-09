'use strict' 

import { Configuration } from '../config/config.js';

let {
    exhibitsApiKey = ""

} = Configuration;

export const validateApiKey = (keyString) => {
    let isValid = false;

    if(typeof keyString == 'string' && exhibitsApiKey.localeCompare(keyString.trim()) === 0) {
        isValid = true;
    }

    return isValid;
}