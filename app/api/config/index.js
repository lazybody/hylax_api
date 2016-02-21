/**
 * Created by hwang on 2016/2/21 13:50.
 */
'use strict';

var env_path = './' + process.env.NODE_ENV + '/';

var self = {
    api: require(env_path + 'config'),
    logger: require(env_path + 'logger')
};

module.exports = self;