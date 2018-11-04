/*
var express = require('express');
var router = express.Router();
const appConfig = require('./boxConfig.js');
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

// Fetch config file for instantiating SDK instance
// SAVE YOUR OWN APP CONFIG FILE TO config.json
//const configJSON = JSON.parse(fs.readFileSync('config.json'));


const sdk = new boxSDK({
    clientID: appConfig.oauthClientId,
    clientSecret: appConfig.oauthClientSecret
});

// Instantiate instance of SDK using generated JSON config
//const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
//const client = sdk.getAppAuthClient('enterprise');

// Set service account to use as-user header
//client.asUser('14516989');
//client.asSelf();

// Create app user client (user access token)
const client = sdk.getAppAuthClient('enterprise');

// Upload file
const stream = fs.createReadStream('./public/images/heart.jpg');
client.files.uploadFile('0', 'tempdoc.jpg', stream).then(file => {
    console.log(util.inspect(file, false, null));
}).catch(function (err) {
    console.log(util.inspect(err.response.body, false, null));
});


module.exports = router;*/

var express = require('express');
var router = express.Router();
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK
const fs = require('fs');                // File system for config

// Fetch config file for instantiating SDK instance
// SAVE YOUR OWN APP CONFIG FILE TO config.json
const configJSON = JSON.parse(fs.readFileSync('config.json'));

// Instantiate instance of SDK using generated JSON config
const sdk = boxSDK.getPreconfiguredInstance(configJSON);

// Create service account client
//const client = sdk.getAppAuthClient('enterprise');

// Set service account to use as-user header
//client.asUser('14516989');
//client.asSelf();

// Create app user client (user access token)
const client = sdk.getAppAuthClient('enterprise');

// Upload file
const stream = fs.createReadStream('./public/images/' +req.query.img);
client.files.uploadFile('0', 'temp'+Date.now()+'.jpg', stream).then(file => {
    console.log(util.inspect(file, false, null));
}).catch(function (err) {
    console.log(util.inspect(err.response.body, false, null));
});

module.exports = router;