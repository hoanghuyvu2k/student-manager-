/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see config/env/production.js)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const requestIp = require('request-ip');
const express = require('express');
const path = require('path');
module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/
  middleware: {
    customMiddleware: require('express')().use('/upload', require('express')['static'](path.join(__dirname, '../upload'))),
    passportInit: require('passport').initialize(),
    passportSession: require('passport').session(),
    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'expressFileUpload',
      'cookieParser',
      'staticUpload',
      'customMiddleware',
      'dontServeClient',

      'getIp',
      'session',
      'passportInit',
      'passportSession',
      'bodyParser',
      'compress',
      'logApiCall',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
    getIp: function (req, res, next) {
      const clientIp = requestIp.getClientIp(req);
      req.clientIp = clientIp;
      return next();
    },

    logApiCall: function (req, res, next) {
      if (req.url != '/')
        console.log("Requested :: ", req.method, req.url, req.body);
      log.logFile('http', 'requestLogger', 'request ...', {
        url: req.url, headers: {
          authorization: req.headers.authorization,
          'content-length': req.headers['content-length'],
          'country': req.headers['cloudfront-viewer-country'] ? req.headers['cloudfront-viewer-country'] : "",
          host: req.ip + '|' + req.headers['x-forwarded-for'] + '|' + req.connection.remoteAddress
          // host: process.env.NODE_ENV !== constant.ENV.PRO ? (req.ip + '|' + req.headers['x-forwarded-for'] + '|' + req.connection.remoteAddress) : ''
        }, body: Object.assign({}, req.body)
      });
      return next();
    },
    // logApiCall: (function () {
    //   return async function (req, res, next) {
    //     // req.setTimeout(40000);
    //     let startTime = new Date().getTime();
    //     res.on('close', async (err) => {
    //       console.log('**********CLOSESESESESESESESE******************')
    //     })
    //     // console.log("Requested :: ", req.method, req.url, req.headers.authorization, req.body);
    //     console.log("Requested :: ", req.method, req.url, req.body);
    //     log.logFile('http', 'requestLogger', 'request ...', {
    //       url: req.url, headers: {
    //         authorization: req.headers.authorization,
    //         'content-length': req.headers['content-length'],
    //         'country': req.headers['cloudfront-viewer-country'] ? req.headers['cloudfront-viewer-country'] : "",
    //         host: req.ip + '|' + req.headers['x-forwarded-for'] + '|' + req.connection.remoteAddress
    //         // host: process.env.NODE_ENV !== constant.ENV.PRO ? (req.ip + '|' + req.headers['x-forwarded-for'] + '|' + req.connection.remoteAddress) : ''
    //       }, body: Object.assign({}, req.body)
    //     });
    //     res.on('end', async () => {
    //     })
    //     res.on('finish', async () => {
    //       try {
    //         D_RequestLog.create({ createdAt: startTime, url: req.url, req: JSON.stringify(req.body), dur: new Date().getTime() - startTime, res: res.statusCode }).then(rs => { })
    //       } catch (err) {
    //         console.log(err.message)
    //       }
    //     })
    //     return next();
    //   }
    // })(),
    staticUpload: express.static(process.cwd() + '/upload'),
    // fileUploaded: express.static(process.cwd() + '/upload'),

    dontServeClient: function (req, res, next) {
      let requestAccepted = true;
      // try {
      //   requestAccepted = CConfig.cache.API_CONFIG.subConfigs.ACCEPT_REQUEST.value;
      // } catch (e) { sails.log(e) }
      // console.log('requestAccepted: ', requestAccepted);
      if (!requestAccepted)
        return res.json({ errorCode: 500, errorMsg: "The server is under maintenance" });
      else next();
    },
    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    bodyParser: (function _configureBodyParser() {
      var skipper = require('skipper');
      var middlewareFn = skipper({ strict: true, maxTimeToBuffer: 10000, limit: '20mb' });
      return middlewareFn;
    })(),

    expressFileUpload: require('express-fileupload')(),
  },

};