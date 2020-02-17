// index.js
// note : my home IP is 65.94.183.104 to use and it locates to montreal
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("IP fetching: It didn't work!" , error);
    return;
  }

  console.log('IP fetching: It worked! Returned IP:' , ip);
});
// const ip = "65.94.183.104";
const ip = "65.9400.183.104";
fetchCoordsByIP(ip, (error, data) => {
  if (error) {
    console.log('coords fetching didnt work...\n', error);
    return;
  }

  console.log('coords fetching worked!\n coordinates are : ', data);
});