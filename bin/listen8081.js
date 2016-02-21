/**
 * Created by hwang on 2016/2/21 13:25.
 */
'use strict';

var _ = require('underscore');

// set NODE_ENV & default: rd
process.env.NODE_ENV = _.isString(process.env.NODE_ENV) ? process.env.NODE_ENV.trim() : '' ;
if (_.indexOf(["production", "qa", "rd", "local"], process.env.NODE_ENV) === -1) {
    process.env.NODE_ENV = 'rd';
}

// load Server
var app = require('app/restifyServer').app;

require('app/api/routers');

app.listen(8081);

console.log('[NODE_ENV: ' + process.env.NODE_ENV + '] Server started, listen 8081.');