//  Early exit if no url was provided
if(!process.argv[2]) {
    console.log("Sorry, you must provide a url to be shortened.");
    return;
}

var request = require('request');

var apiKey = 'AIzaSyAQ7Vnwg1SxITpiYxHhkrAEso9mOi_j_6o';
var url = 'https://www.googleapis.com/urlshortener/v1/ur  l?key=' + apiKey;
var longUrl = process.argv[2];

var data = {
    longUrl: longUrl
};

var options = {
    uri: url,
    method: 'POST',
    json: data
};

// Finally, make a request
request(options, function (error, response, body) {
    if (error) {
        console.log(error);
    } else if (!error && response.statusCode === 200) {
        console.log(response.body);
    }
    else {
        console.log('Something strange happened, there is no error, but status code is not 200.');
        console.log('Dumping response:');
        console.log(response);

    }
});