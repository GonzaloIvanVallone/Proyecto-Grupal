const { Router } = require("express");
const router = Router();
const { createNewUser, deleteUser, getAllUsers, promoteUser } = require('../Controllers/userController');

//localhost:3001/user

router.post("/", createNewUser);
router.put("/", deleteUser);
router.put("/:id", promoteUser);
router.get("/", getAllUsers);

module.exports = router;