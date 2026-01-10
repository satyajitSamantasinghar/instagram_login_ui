const express = require("express");
const router = express.Router();
const { saveLogin } = require("../controllers/loginController");

router.post("/", saveLogin);

module.exports = router;
