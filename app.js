const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const { log } = require('console');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/', (req, res) => {
    
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    console.log(firstName, lastName, email);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});