/**
 * Created by hwang on 2016/2/21 13:26.
 */
'use strict';

var restify = require('restify');
var server = restify.createServer({
    name: 'hylax_api',
    versions: ['1.0.0']
});

var semver = require('semver');
var logger = require('app/helpers/logger')('restify');

server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.gzipResponse());
server.use(restify.fullResponse())
    .use(restify.bodyParser({mapParams: false}));

server.pre(function (req, res, next) {
    req.url = req.url.replace('api/', '');
    logger.debug('req url ',req.url);
    var pieces = req.url.replace(/^\/+/, '').split('/');
    var version = pieces[0];
    req.url = req.url.replace(version + '/', '');
    if (!semver.valid(version)) {
        version = version.replace(/v(\d{1})/, '$1.0.0');
    }
    if (semver.valid(version) && server.versions.indexOf(version) > -1) {
        req.url = req.url.replace(version + '/', '');
        req.headers['accept-version'] = version;
    }
    return next();
});

module.exports = {
    app: server
};