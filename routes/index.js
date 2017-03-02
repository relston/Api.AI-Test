'use strict'
let apiai = require('apiai');
let express = require('express');

let router = express.Router();
let app = apiai("api key");

// Routes!
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.post('/input', (req, res, next) => {
	getBotResponse(req.body.text, botResponse => {
		let botText = handleBotResponse(botResponse)
		res.json({message: botText});
	});
});
module.exports = router;

// Data Access Methods!!
let getBotResponse = (chatText, cb) => {
	let request = app.textRequest(chatText, {
    	sessionId: '<unique session id>'
	});
	request.on('response', function(response) {
		cb(response);
	});
	request.on('error', function(error) {
	});
	request.end();
}
let handleBotResponse = (botResponse, cb) => {
	console.log("handling response!", botResponse.result.fulfillment.speech);
	let responseText =  botResponse.result.fulfillment.speech;
	return responseText;
}