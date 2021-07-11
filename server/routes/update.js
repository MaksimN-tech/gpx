const router = require("express").Router();
const User = require("../models/user.model");
require("../db/connect");
const jwt = require("jsonwebtoken");
router.route("/")
  .patch(async(req, res) => {
  try {
    const { name, surname, token } = req.body;
    const decoded = jwt.verify(token, "environment");
    await User.findOneAndUpdate({ _id: decoded.id }, { name:name,surname:surname });
    res.status(201).json({
      status: 1,
      error: 0,
      error_description: null,
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      error: 1,
      error_description: "server error"});
  }
});

module.exports = router;
