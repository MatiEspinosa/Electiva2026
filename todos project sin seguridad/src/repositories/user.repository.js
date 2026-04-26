const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const findUserByUserName = async (username) => {
  return await User.findOne({ username: username });
};

const isValidPassword = async (password, userPassword) => {
  const result = await bcrypt.compare(password, userPassword);
  return result;
};

const saveUser = async (name, username, password, email) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name: name,
    username: username,
    password: hashedPassword,
    email: email
  });

  console.log(newUser);
  
  const res = await newUser.save();
  return res;
};

module.exports = {
  findUserByUserName,
  isValidPassword,
  saveUser
};
