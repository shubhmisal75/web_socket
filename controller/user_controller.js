const services = require("../services/user_service");

//----insert user
const insertUser = async (req, res) => {
  try {
    const result = await services.insertUser(req, res);
  } catch (err) {
    console.log(err);
  }
};

//----update user
const updateUser = async (req, res) => {
  try {
    const result = await services.updateUser(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----get users
const getUsers = async (req, res) => {
  try {
    const result = await services.getUsers(req, res);
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
    const result = await services.getUserById(req, res);
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
    const result = await services.deleteUserById(req, res);
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "server error",
    });
  }
};

//----delete user by id
// const userLogin = async (req, res) => {
//   try {
//     const result = await services.userLogin(req, res);
//   } catch (err) {
//     return res.status(500).send({
//       status: false,
//       message: "server error",
//     });
//   }
// };

//-----exports//
module.exports = {
  insertUser: insertUser,
  updateUser: updateUser,
  getUsers: getUsers,
  getUserById: getUserById,
  deleteUserById: deleteUserById,
  //  userLogin: userLogin,
};
