'use strict' 

import { Configuration } from '../config/config.js';
import { USER_ROLE } from '../config/global-constants';

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

export const getUserRole = (key) => {
    let role = USER_ROLE.STANDARD;

    if(key && validateApiKey(key)) role = USER_ROLE.ADMIN;

    return role;
}

export const isAdmin = (key=null) => {
    return key && validateApiKey(key) ? true : false;
}