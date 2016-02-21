/**
 * Created by hwang on 2016/2/21 13:30.
 */
'use strict';

var log4js = require('log4js'),
    config = require('app/api/config').logger;

log4js.setGlobalLogLevel(config.level);

module.exports = function(ns) {
    return log4js.getLogger(ns);
};