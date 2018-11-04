var express = require('express');
var router = express.Router();
const Clarifai = require('clarifai');
var fs = require('fs');
const util = require('util');            // Deep inspection of objects
const boxSDK = require('box-node-sdk');  // Box SDK

const app = new Clarifai.App({
    apiKey: '91d7b5baa0244d9c8400e0f4057cf5ea'
});
const configJSON = JSON.parse(fs.readFileSync('config.json'));
const sdk = boxSDK.getPreconfiguredInstance(configJSON);
const client = sdk.getAppAuthClient('enterprise');
router.get('/', function (req, res, next) {
    var code = req.query.code;
    console.log(code);
    const stream = fs.createReadStream('./public/images/' +req.query.img);
    client.files.uploadFile('0', 'image'+Date.now()+'.jpg', stream).then(file => {
        console.log(util.inspect(file, false, null));
    }).catch(function (err) {
        console.log(util.inspect(err.response.body, false, null));
    });
    var imgStr= fs.readFileSync('./public/images/'+req.query.img,'base64');
    app.models.predict(Clarifai.GENERAL_MODEL, imgStr).then(
        function(response) {
            var jsonData = JSON.parse(JSON.stringify(response));
            var conceptsArray = jsonData.outputs[0].data.concepts;
            var tagArray = [];
            for(var i=0;i<conceptsArray.length;i++){
                tagArray.push(conceptsArray[i].name);
            }
           // res.render('index',{img:'./images/'+req.query.img, data:tagArray});
            res.send(tagArray);


        },
        function(err) {
            console.error(err);
        }
    );
})



module.exports = router;