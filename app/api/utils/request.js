/**
 * Created by hwang on 2016/2/21 21:43.
 */
'use strict';

var _request = require('request'),
    config = require('app/api/config'),
    logger = require('app/helpers/logger')('utils-request');

var api = config.api.serverApi;

var self = function (req, res, next) {

    var url = api + req.url;

    var body = (req.body instanceof Buffer || req.body instanceof String) ? req.body : '';
    req.headers['content-length'] = body.length;

    var x = request(req, {
        url: url,
        method: req.method,
        headers: req.headers,
        body: body
    });
    x.on('error', function (e) {
        logger.error('request hylax api error', e);
        if (!res.headersSent) {
            res.status(500).send('Internal Server Error');
            res.end();
        }
    });
    x.pipe(res);
};

var request = function (req, options, callback) {
    if (!options.headers) {
        options.headers = req.headers;
    }

    options.timeout = 15000;

    logger.trace('call hylax api:', options);

    var x = _request(options, callback);
    return x;
};


module.exports = self;