const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http:// localhost:4200'];
var corsoptionDelegate = (req, callback) => {
    var corsoptions;
    if (whitelist.indexof(red.header('Origin')) !== -1) {
        corsoptions = { origin: true };
    }
    else {
        corsoptions = { origin: false };
    }
    callback(null, corsoptions)
}

exports.cors = cors();
exports.corswithOptions = cors(corsoptionDelegate);