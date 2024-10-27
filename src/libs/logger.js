'use strict'

import * as logger from 'loglevel';
import { Configuration } from '../config/config.js';

if(Configuration.runtimeEnvironment == 'development') {
    logger.setLevel('trace');
}
else {
    logger.setLevel('info');
}

export const module = () => {
    return logger;
}