var btoa = require('btoa');
var https = require('https'); 



var keys = {
    client: process.env.TWITTER_CLIENT_ID , 
    secret: process.env.TWITTER_SECRET_KEY
}

var combined = keys.client + ":" + keys.secret; 

var base64encoded = btoa(combined); 



function getAccessToken(handleAccessTokenResponse) {
    const options = {
        hostname: "api.twitter.com", 
        port: 443, 
        path: '/oauth2/token',
        method: 'POST', 
        headers: {
            'Authorization': 'Basic ' + base64encoded, 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }; 
    
    var postData = 'grant_type=client_credentials'; 
    var completeResponse = ''; 
    
    // Set up the request
    var postReq = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          //console.log('Response: ' + chunk);
          completeResponse += chunk; 
      });
      
      res.on('end', function() {
            // console.log("########################################"); 
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
            var error = null; 
            var accessToken = null; 
            
            if (this.statusCode == "200") {
                var responseJSON = JSON.parse(completeResponse); 
                accessToken = responseJSON.access_token; 
            } else {
                error = completeResponse; 
            }
            
            handleAccessTokenResponse(error, accessToken); 
            
            
            /*execute callback*/
            //sendBackResponseToBrowser(apiResponse); 
            
      }); 
    });
    
    postReq.write(postData);
    postReq.end();
    
}



//curl -H 'Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAOn%2F2AAAAAAA%2FK5ajiMUX%2B3UZ7R5yULG3sWQIIk%3D4TWghebaY5OI9jvdNIlMs12IEPPfHG16eo4MCJ2iCMZZDk9iCX' 
//https://api.twitter.com/1.1/search/tweets.json?q=birds

function getTweets(accessToken, sendResponseToBrowser) {
    const options = {
        hostname: "api.twitter.com", 
        port: 443, 
        path: '/1.1/search/tweets.json?q=birds',
        method: 'GET', 
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }; 
    
    var completeResponse = ''; 
    
    // Set up the request
    var twitterRequest = https.request(options, function(twitterResponse) {
      twitterResponse.setEncoding('utf8');
      twitterResponse.on('data', function (chunk) {
          //console.log('Response: ' + chunk);
          completeResponse += chunk; 
      });
      
      twitterResponse.on('end', function() {
            // console.log("########################################"); 
             console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
<<<<<<< HEAD
            var error = null; 
            var tweetsList; 
            
            
            if (this.statusCode != 200) {
                // error
                error = completeResponse
            } else {
                //success
                var responseJSON = JSON.parse(completeResponse); 
                tweetsList = responseJSON.statuses; 
            }
            
            
            sendResponseToBrowser(error, tweetsList); 
=======
            var tweetsList = null; 
            var error = null; 
            
            if (this.statusCode == "200") {
                var responseJSON = JSON.parse(completeResponse); 
                var tweetsList = responseJSON.statuses;
            } else {
                error = completeResponse; 
            }
            
            sendResponseToBrowser(error, tweetsList);
            
>>>>>>> c2a490152229b53cc378bb0d2ceda9895aa599e5
      }); 
    });
    
    twitterRequest.end();
    
}



function doAllTwitterRequests(callback) {
<<<<<<< HEAD
    getAccessToken(function(accessToken) {
=======
    console.log("In doAllTwitterRequests......"); 
    
    console.log("combined keys: " + combined); 
    getAccessToken(function(error, accessToken) {
        
        if (error) {
            console.log("error: " + error); 
            callback(error, null); 
            return; 
        }
        
>>>>>>> c2a490152229b53cc378bb0d2ceda9895aa599e5
        getTweets(accessToken, function(error, tweets) {
            callback(error, tweets); 
        }); 
    }); 
}

module.exports.doAllTwitterRequests = doAllTwitterRequests; 