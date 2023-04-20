// // //-------------------------Connect to redis-------------------------------------//
// var redis = require("redis");
// const { promisify } = require("util");
// const redisClient = redis.createClient(
//   17049,
//   "redis-17049.c81.us-east-1-2.ec2.cloud.redislabs.com",
//   { no_ready_check: true }
// );
// redisClient.auth("j30ymdDIRPY0BbPcmqRr0H46rhQgIaD1", function (err) {
//   if (err) throw err;
// });

// redisClient.on("connect", async function () {
//   console.log("Connected to Redis..");
// });

// //1. connect to the server
// //2. use the commands :

// //Connection setup for redis
// const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
// const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

// module.exports = {
//   SET_ASYNC,
//   GET_ASYNC,
// };

// const redis = require("redis");

// // Replace "YOUR_REDIS_HOSTNAME" and "YOUR_REDIS_PORT" with your Redis Cloud instance details
// const client = redis.createClient(
//   17049,
//   "redis-17049.c81.us-east-1-2.ec2.cloud.redislabs.com",
//   {
//     password: "j30ymdDIRPY0BbPcmqRr0H46rhQgIaD1",
//   }
// );
// module.exports = {
//   client,
// };
