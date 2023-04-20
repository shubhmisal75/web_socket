// //Middleware to check data present in redis or not if present return from here with data else ..next
// var redis = require("./redis");
// const middleware = async function (req, res, next) {
//   token = req.headers["token"];
//   if (token) {
//     const fromCache = await redis.GET_ASYNC(`${token}`);
//     if (fromCache) {
//       return res.status(200).send({
//         status: true,
//         message: "fetched from redis cache",
//         user: JSON.parse(fromCache),
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// };

// module.exports.middleware = middleware;
