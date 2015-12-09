var request = require('request');

request.get('https://pacific-stream-1533.herokuapp.com/',
    function (error, response, body) {

    // Assume this code works correctly, if this is the case
    // What can we infer about the parameter variable?
    if (error) {
        console.log("Error!  Request failed - " + error);
    } else if (!error && response.statusCode === 200) {
        console.log(body);
    }
    // I argue this code is incomplete. What is missing?
});
