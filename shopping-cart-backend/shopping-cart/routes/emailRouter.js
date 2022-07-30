var express = require('express');
var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML
var cors = require('../cors');
var handlebars = require('handlebars');
var fs = require('fs');
require("dotenv").config()
const envEmail = process.env.email;
const envPassword = process.env.password;
const emailRouter = express.Router();
var nodemailer = require('nodemailer');// importing node mailer
var htmlContent = require('../export-content');

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            callback(err);
            throw err;

        }
        else {
            callback(null, html);
        }
    });
};

emailRouter.route('/')


    .options(cors.cors, (req, res) => {
        console.log("Coming email here");
        res.sendstatus(200);
    })
    .post(cors.cors, (req, res, next) => {
        var transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: envEmail,// replace with your email
                pass: envPassword// replace with your password
            }

        });

        readHTMLFile(__dirname + '/email-content.html', function (err, html) {
            var template = handlebars.compile(html);
            var itemsList = {
                'items': req.body.items
            };

            var htmlToSend = template(itemsList);
            var mailOptions = {
                from: envEmail,// replace with your email
                to: req.body.email,// replace with recipient email
                subject: `Checkout Confirmation`,
                html: htmlToSend
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    res.send('error')// if error occurs send error as response to client
                } else {
                    console.log('Email sent: ' + info.response);
                    res.send('Sent Successfully')// if mail is sent successfully send sent successfully as response
                }
            });
        });
    })


module.exports = emailRouter;