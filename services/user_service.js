const validateBody = require("../validations");
const userModel = require("../model/user_model");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const ObjectId = require("mongoose").Types.ObjectId;
//var redis = require("../redis");
//----insert user
const insertUser = async (req, res) => {
  try {
    var UserDetails = req.body;
    var { fname, lname, email, password, age } = UserDetails;
    if (!validateBody.isValid(fname) && !validateBody.isValid(lname)) {
      return res.status(400).send({
        status: false,
        message: "Please provide lname  or fname",
      });
    }
    if (!validateBody.isValid(email)) {
      return res.status(400).send({
        status: false,
        message: "Please provide email",
      });
    }
    if (!validateBody.isValidSyntaxOfEmail(email)) {
      return res
        .status(404)
        .send({ status: false, message: "Please provide a valid Email Id" });
    }
    if (!validateBody.isValidSyntaxOFPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password most contains atleast one upper case character, one special character, one number",
      });
    }
    userModel.findOne({ email: email }).then(async (result, err) => {
      if (result == null) {
        password = await bcrypt.hash(password, saltRounds);
        let InsertData = { fname, lname, email, password, age };
        const userData = await userModel.create(InsertData);
        // var token = await randomToken(16);
        // data = await redis.SET_ASYNC(
        //   `${token}`,
        //   JSON.stringify(userData),
        //   "EX",
        //   60 * 60
        // );
        return res.status(200).send({
          status: true,
          message: "Success",
          user: userData,
          // token: token,
        });
      } else {
        return res
          .status(409)
          .send({ status: false, message: "Email already exist" });
      }
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----update user
const updateUser = async (req, res) => {
  try {
    var UserData = req.body;
    const userId = req.params.userId;
    var { fname, lname, email, password, age } = UserData;

    let checkForParams = ObjectId.isValid(userId);
    if (!checkForParams) {
      return res.status(400).send({
        status: false,
        message: "Please Provide a valid Id in path params",
      });
    }
    if (!validateBody.isValid(fname) && !validateBody.isValid(lname)) {
      return res.status(400).send({
        status: false,
        message: "Please provide lname  or fname",
      });
    }
    if (!validateBody.isValid(email)) {
      return res.status(400).send({
        status: false,
        message: "Please provide email",
      });
    }
    if (!validateBody.isValidSyntaxOfEmail(email)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide a valid Email Id" });
    }
    if (!validateBody.isValidSyntaxOFPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password most contains atleast one upper case character, one special character, one number",
      });
    }
    userModel
      .findOne({
        $and: [{ email: email }, { _id: { $ne: userId } }],
      })
      .then(async (result, err) => {
        if (result == null) {
          password = await bcrypt.hash(password, saltRounds);
          var updateUserDetails = await userModel.findOneAndUpdate(
            { _id: userId },
            {
              $set: {
                fname: fname,
                lname: lname,
                email: email,
                password: password,
                age: age,
              },
            },
            { new: true }
          );
          return res.status(200).send({
            status: true,
            message: "Success",
            user: updateUserDetails,
          });
        } else {
          return res
            .status(409)
            .send({ status: false, message: "email already exist" });
        }
      });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    let getAllUsers = await userModel.find();
    if (getAllUsers.length < 0) {
      return res.status(404).send({ status: false, message: "user not found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Success", users: getAllUsers });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----get user by id
const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    let checkForParams = ObjectId.isValid(userId);
    if (!checkForParams) {
      return res.status(400).send({
        status: false,
        message: "Please Provide a valid Id in path params",
      });
    }
    let getUser = await userModel.findById({ _id: userId });
    if (getUser == null) {
      return res.status(404).send({ status: false, message: "user not found" });
    } else {
      return res
        .status(200)
        .send({ status: true, message: "Success", user: getUser });
    }
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----delete user by id
const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    let checkForParams = ObjectId.isValid(userId);
    if (!checkForParams) {
      return res.status(400).send({
        status: false,
        message: "Please Provide a valid Id in path params",
      });
    }
    let deleteUser = await userModel.deleteOne({ _id: userId });
    return res
      .status(200)
      .send({ status: true, message: "Success", user: deleteUser });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

// const userLogin = async (req, res) => {
//   try {
//     const loginCredentials = req.body;
//     const { email, password } = loginCredentials;

//     if (!validateBody.isValid(email)) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide Email id or email field",
//       });
//     }
//     if (!validateBody.isValidSyntaxOfEmail(email)) {
//       return res
//         .status(404)
//         .send({ status: false, message: "Please provide a valid Email Id" });
//     }
//     if (!validateBody.isValid(password)) {
//       return res.status(400).send({
//         status: false,
//         message: "Please provide password or password field",
//       });
//     }
//     await userModel.findOne({ email: email }).then((e_result) => {
//       if (e_result) {
//         bcrypt.compare(
//           password,
//           e_result.password,
//           async function (b_err, ifSuccess) {
//             if (b_err) {
//               return res
//                 .status(404)
//                 .send({ status: false, message: "user not found" });
//             } else {
//               if (!ifSuccess) {
//                 return res
//                   .status(401)
//                   .send({ status: false, message: "wrong credentials" });
//               } else {
//                 console.log("-----------------------------250");
//                 // var token = await randomToken(16);
//                 // Set the values of the set and the TTL in a transaction
//                 redis.client.SET();
//                 redis
//                   .multi()
//                   .sadd("mySet", JSON.stringify(e_result))
//                   .expire("mySet", 60 * 60)
//                   .exec((err, replies) => {
//                     console.log(replies, "------------");
//                   });
//                 data = await redis.SET_ASYNC(
//                   `${token}`,
//                   JSON.stringify(e_result),
//                   "EX",
//                   60 * 60
//                 );
//                 return res.status(200).send({
//                   status: true,
//                   message: "fetched from database",
//                   user: e_result,
//                   token: token,
//                 });
//               }
//             }
//           }
//         );
//       }
//     });
//   } catch (error) {
//     return res.status(500).send({ status: false, message: error.message });
//   }
// };

module.exports = {
  insertUser: insertUser,
  updateUser: updateUser,
  getUsers: getUsers,
  getUserById: getUserById,
  deleteUserById: deleteUserById,
  //  userLogin: userLogin,
};
