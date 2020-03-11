/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */



const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let website = "https://api.ipify.org/?format=json";
  // let website = "https://api.ipify24555.org/?format=json"; // TESTER CODE:  wrong domain to throw error
  // let website = "https://api.ipify.org/?forMMmat=json";      // TESTER CODE: to generate wrong response.statusCode // fail. because response becomes unidentified.
  request(website, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    if (error) {
      return callback(error, null);
    }
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
    // console.log('body:', body); // Print the HTML for the homepage.
      const ip = JSON.parse(body).ip; // NOTE-TO-SELF : REMEMBER : the opposite is JSON.stringify(object)
      console.log('@iss.js --> my IP is: ', ip); // Print the HTML for the homepage.
      callback(null, ip);
    }    
  });
};


/////////////////////////////////////////////////////////////////
const fetchCoordsByIP = function(ip, callback) {
  // use request to fetch coordinates from API
  const coordWebsite = "https://ipvigilante.com/" + ip;
  request(coordWebsite, (error, response, body) => {
    // ERROR HANDLING
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // LOGIC

    // console.log(JSON.parse(body));
    // console.log(JSON.parse(body).data.latitude);
    // console.log(JSON.parse(body).data.longitude);
    const coordinates = {};
    coordinates.latitude = JSON.parse(body).data.latitude;
    coordinates.longitude = JSON.parse(body).data.longitude;
    console.log(coordinates);
    callback(null, coordinates);
  });
};
//////////////////////////////////////////////////////
//http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // ...

  const theWebsite = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(theWebsite, (error, response, body) => {
    // ERROR HANDLING
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    // LOGIC
    // console.log(JSON.parse(body).response);
    const passes = JSON.parse(body).response;
    // console.log(JSON.parse(body).data.latitude);
    // console.log(JSON.parse(body).data.longitude);
    // const coordinates = {};
    // coordinates.latitude = JSON.parse(body).data.latitude;
    // coordinates.longitude = JSON.parse(body).data.longitude;
    // console.log(coordinates);
    callback(null, passes);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };