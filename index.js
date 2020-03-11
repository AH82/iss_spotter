// // index.js
// // note : my home IP is 65.94.183.104 to use and it locates to montreal
// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("IP fetching: It didn't work!" , error);
//     return;
//   }

//   console.log('IP fetching: It worked! Returned IP:' , ip);
// });


// ////////////////////////////////////////////////////////////
// const ip = "65.94.183.104";
// // const ip = "65.9400.183.104";

// /* fetchCoordsByIP(ip, (error, data) => {
//   if (error) {
//     console.log('coords fetching didnt work...\n', error);
//     return;
//   }

//   console.log('coords fetching worked!\n coordinates are : ', data);
// }); */
// //////////////////////////////////
//   // { latitude: '45.51150', longitude: '-73.56830' }

//   const coords = { latitude: '45.51150', longitude: '-73.56830' };
//   // const coords = { latitude: 'gg', longitude: '-73.56830' };
// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     console.log('ISSFlyOver fetching didnt work...\n', error);
//     return;
//   }

//   console.log('ISSFlyOver fetching worked!\n', data);
// });

const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});
