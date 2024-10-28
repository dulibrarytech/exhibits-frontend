'use strict'

import * as LOGGER from 'loglevel';
import { Configuration } from '../config/config.js';

if(Configuration.runtimeEnvironment == 'development') {
    LOGGER.setLevel('trace');
}
else {
    LOGGER.setLevel('error');
}

export const module = () => {
    return LOGGER;
}