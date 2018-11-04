const bodyParser = require('body-parser') // Body Parser for JSON encoded bodies
const boxSDK = require('box-node-sdk');   // Box SDK
const clarifai = require('clarifai');     // Clarifai SDK   // Keys and config
const express = require('express')();     // Express
const fs = require('fs');                 // File system access
const http = require('http');             // HTTP server
const util = require('util');
const appConfig = require('./boxConfig.js');       // Auth keys and Box SDK
const boxSDK = appConfig.boxSDK;

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({
    extended: true
}));

// Create new Box SDK instance

const sdk = new boxSDK({
    clientID: appConfig.oauthClientId,
    clientSecret: appConfig.oauthClientSecret
});

// Instantiate a new Clarifai app instance
const app = new clarifai.App({
    apiKey: '91d7b5baa0244d9c8400e0f4057cf5ea'
});

client._session.getAccessToken().then(token => {
    const fileURL = `https://api.box.com/2.0/files/${fileID}/content?access_token=${token}`;

    // predict the contents of an image by passing in a url
    app.models.predict(clarifai.GENERAL_MODEL, fileURL).then(
        function(response) {
            // Capture all categories
            let entries = [];
            for (let category of response.outputs[0].data.concepts) {
                if (category.value > 0.9) {
                    entries.push({ type: 'text', text: category.name });
                }
            }


            // Set Box metadata template information
            const metadataTemplate = 'boxSkillsCards';
            const metadata = {
                cards: [{
                    created_at: new Date().toISOString(),
                    type: 'skill_card',
                    skill_card_type: 'keyword',
                    skill_card_title: {
                        message: 'Categories'
                    },
                    skill: {
                        type: 'service',
                        id: 'jleblanc-clarifai-heroku'
                    },
                    invocation: {
                        type: 'skill_invocation',
                        id: fileId
                    },
                    entries: entries
                }]};

        });
});
            // Create server
            const port = process.env.PORT || 3000;
            http.createServer(express).listen(port, () => {
                console.log(`Server started: Listening on port ${port}`);
            });