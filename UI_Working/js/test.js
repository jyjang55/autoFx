/**
 * Created by comnic on 2018. 2. 11..
 */
var crypto = require('crypto');
var request = require('request');
var ACCESS_TOKEN = 'aa58e9b3-1037-42f1-86c7-140a74746064';
var SECRET_KEY = '0ca5163f-cf74-4e63-a4d4-8458e611d38c';
var url = 'https://api.coinone.co.kr/v2/order/limit_buy/';
var payload = {
    "access_token": ACCESS_TOKEN,
    "price": 500000,
    "qty": 0.1,
    "currency": "btc",
    "nonce": Date.now()
};

payload = new Buffer(JSON.stringify(payload)).toString('base64');

var signature = crypto
    .createHmac("sha512", SECRET_KEY.toUpperCase())
    .update(payload)
    .digest('hex');

var headers = {
    'content-type':'application/json',
    'X-COINONE-PAYLOAD': payload,
    'X-COINONE-SIGNATURE': signature
};

var options = {
    url: url,
    headers: headers,
    body: payload
};

request.post(options,
    function(error, response, body) {
        console.log(body);
    });