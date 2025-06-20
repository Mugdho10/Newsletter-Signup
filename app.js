const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const { log } = require('console');
const https = require('https');
// const axios = require('axios');
// const { url } = require('inspector');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.post('/', async (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const data = {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    };


    var jsonData = JSON.stringify(data);

    const url = 'https://us14.api.mailchimp.com/3.0/lists/d061755ff7/members';
    const options = {
        method: 'POST',
        auth: 'anystring:2bc56b0283e6e4f85db9eb103b731ff3-us14'
    };

    const request = https.request(url, options, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(path.join(__dirname, 'success.html'));
        } else {
            res.sendFile(path.join(__dirname, 'failure.html'));
        }

        response.on('data', (data) => {
            console.log(JSON.parse(data));
        });
    });
    console.log(jsonData);
    request.write(jsonData);
    request.end();
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});



// API Key - 2bc56b0283e6e4f85db9eb103b731ff3-us14
// Audience/List ID - d061755ff7