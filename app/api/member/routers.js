/**
 * Created by hwang on 2016/2/21 13:32.
 */
'use strict';

var app = require('app/restifyServer').app;
var utils = require('app/api/utils');

var membersOperator = require('./members');
app.get({path: '/merchant/:account/members', version: '1.0.0'}, utils.request);