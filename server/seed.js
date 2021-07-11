require("./db/connect");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

(async function seed() {
  const user = new User({
    name: "user",
    email: "test@test.com",
    password: "userpass",
  });
  await user.save();
  const id = user._id;
  const token = await jwt.sign({ id }, "environment", {
    expiresIn: "5 days",
  });
  await User.updateOne({ _id: user._id }, { access_token: token });

  mongoose.disconnect(() => {
    console.log("connection was closed!");
  });
})();
