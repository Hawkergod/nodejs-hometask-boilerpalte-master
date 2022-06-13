const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user
router.get("/", UserService.getAllUsers);
router.get("/:id", UserService.getUserById);
router.post("/", createUserValid, responseMiddleware, UserService.createUser);
router.put("/:id", updateUserValid, responseMiddleware, UserService.updateUser);
router.delete("/:id", UserService.deleteUser);

module.exports = router;