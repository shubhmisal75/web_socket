const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");
//const RedisMiddleware = require("../middleware");

router.post("/InsertUser", userController.insertUser);
router.put("/UpdateUser/:userId", userController.updateUser);
router.get("/GetUserById/:userId", userController.getUserById);
router.get("/GetUsers", userController.getUsers);
router.delete("/DeleteUser/:userId", userController.deleteUserById);
// router.post("/UserLogin", userController.userLogin);
module.exports = router;
