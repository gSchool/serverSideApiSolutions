/*Server Side Requests

Objectives & Potential Concept Checking Questions:
================================================================================
Illustrate the difference between serve side requests and client side requests.
    What is the difference between server side and client side requests?


Understand why you would want to make requests on the server side.
    What are some reasons for sever side requests?
    When might you prefer a client side request?

Use the request module to make GET and POST requests
    What is the requests module?
    What is an example of a similar module that you might have used in the browser?
    Could I use the requests module in the browser?

Make server side requests with express
    What is express' role in the API request?
    What is the requests module role in the API request?
================================================================================

LESSON START:
 Draw the two paths, client only API, and server only API.
 Then hammer in that you can do BOTH!

CONCEPT CHECKING:
What is the difference between server side and client side requests?
    ...

What are some reasons for sever side requests?
    ... After the class seems exhausted from answering ...
     CORS:
        Maybe I want to combine information in my DB with info from an API
        (Would I absolutely HAVE to do this server side? no)

     Other Security Concerns:
        I don't want my OAuth key to S3 on the wild web

     Bespoke Endpoints:
        Show the Etsy example -- DRAW IT!

     General Performance:
         I may want to make requests to multiple APIs using my servers amazing connection
         I may want to use my beefy server instead of my clients crappy 4 year old phone's processor

What browser security policy might prevent us from using an api on the client side?
    If they didn't get it from before, ask again now. CORS!
    This browser policy prevents resources from different domains than the origin domain (whatever domain sent you the JS)

Why would you want requests for a service like S3 to happen mainly on the server side?
    Expose my S3 key to the wild wild web? No thanks.

What are some other examples of APIs that you'd prefer on the server side?
    See above again,
    Bespoke endpoints,
    API's that contain data you really want to do heavy processing on,
    Take advantage of a server side caching implementation instead of always fetching data

Define Service Oriented Architecture
    SOA's typically provide RESTful services as the means of doing CRUD tasks
    create, read, update, destroy.
    Said another way, the RESTful service is the mechanism for accessing the DB.
    It's bigger than just that though -- API's and services are just rules for communicating between computers.
    Salesforce API's for example can trigger emails, trigger the creation of reports ...
    Truly, an API request can result in arbitrary server side behavior, an API route is just an entry point
    for telling a remote machine to do some work.

    NOW IS A GOOD TIME TO TALK ABOUT THE ETSY BESPOKE ENDPOINTS EXAMPLE!!!

####Request Module#####

The request module allows us to make server side HTTP requests. Installing the request module into your
node app is the same as always:

npm install --save request

GET Requests

Making a get request is also straight forward:
*/

// The version without .get ... blah

// This will default to making a get request to the student roster app we used before.
// We can also specify that the request is a get to be a little more clear. This is preferred for readability:

// ### Get Basic, the difference between request(...) and request.get(...)

// #### basicGet.js ####

//Exercise
//
//Make 2 simple apps with node:
//
//A app that simply makes a get request to the student roster page by default and console logs the body of the response,
// but if the user specifies a command line argument for a url, the app should make a request to the specified url instead.

// ### getURL.js ###

// Write a node app that takes a imdb id as a command line argument and then makes a get request to the OMDB api
// for details about that movie. The app should console log the title of the movie, the year, the actors,
// the genre, and the runtime. Keep in mind what type of data the body of the response is.
// What does the following request return:
//
//node app.js tt3899796

// ### getOMDB.js ###

//POST Requests
//
//The request module provides a .post convenience method as well, but the easiest way to use post and specify json data is to use an options hash as a parameter to post. Here is an example:

//CONCEPT CHECKING
// BEFORE WE DIVE IN, WHAT IS A POST, and how is it different from a GET?

// #### basicPost.js ###

//
//Exercise
//
//Follow the steps at the google url shortener api docs to get your own api key. Look at the docs and figure out the requirements for making a url shortening request. Write a node app that takes a url on the command line and shortens it. The app should console log the shortened url. Take note of what type of object the body is when you get it back.
//    Request Module With Express
//

// ### urlShortener.js ###

// CONCEPT CHECKING:
// What is an API token and why might google require us to have one?
// Is POST the correct HTTP method if this is a RESTful service? Are we creating a resource?
// So, would you argue google url shorterner service is a REST service? I say no, but it's kind of nebulous.

// What does the following express app do?
// Wait for the students to try (no separate file for this)

var express = require('express'),
    app = express();

app.get("/", function (req, res) {
    var responseStr = "Hello World";
});

app.listen(3000, function () {
    console.log("Starting a server on localhost:3000");
});

// The take away is that the node app does not return a response until res.send or res.render is called.
// So how can we integrate a server side request into our express app?

// ( there is also no separate file for this one)

var express = require('express'),
    app = express(),
    request = require('request');

app.get("/", function (req, res) {
    request.get('http://www.omdbapi.com/?i=tt4331680&plot=short&r=json', function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            var result = "Title: " + movieData.Title + "<br>" + "Year: " + movieData.Year + "<br>";
            res.send(result);
        }
    });
});

app.listen(3000, function () {
    console.log("Starting a server on localhost:3000");
});

//This code is a little problematic though. If we get a non 200 response, we never return a response to the user.
// Make sure to take care of the error cases as well:

// ### apiServer.js ###
