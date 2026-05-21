const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);

router.get("/", auth, role("ADMIN"), ctrl.getAllUsers);
router.get("/:id", auth, ctrl.getUserById);
router.put("/:id", auth, ctrl.updateUser);
router.delete("/:id", auth, role("ADMIN"), ctrl.deleteUser);

module.exports = router;