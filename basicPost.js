var request = require('request');

// This is the data we will POST to the remote server
var data = {
    name: 'Baxster',
    hobby: 'Wearing hoodies',
    avatar: 'http://www.happinessabounds.com/wp-content/uploads/2012/12/cute-corgi-in-hoodie.jpg'
};

// Cookies go in a "Cookie Jar", this code creates such a cookie jar and a cookie
// WHAT IS A COOKIE? WHY DO WE NEED ONE?
var jar = request.jar();
var cookie = request.cookie('login=g9fullstack');
var url = 'https://pacific-stream-1533.herokuapp.com/students';
jar.setCookie(cookie, url);

// Options are the parameters for making a request.
var options = {
    uri: url,
    method: 'POST',
    json: data,
    jar: jar
};

// Finally, make a request
request(options, function (error, response, body) {
    if (error) {
        console.log(error);
    } else if (!error && response.statusCode >= 400) {
        console.log(response.statusCode);
        console.log(body);
    } else if (!error && response.statusCode === 200) {
        // This is such an unsatisfying result... We posted a cute corgi shouldn't we
        // at LEAST get something FUN back?
        console.log('Success!');
    }
    // I disagree with the above, because there are plenty of unhandled cases...
    // What happens if(response.statusCode < 400 && response.statusCode !== 200) ?
    // But we've covered this before
});