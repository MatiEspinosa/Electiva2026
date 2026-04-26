const mongoose = require("mongoose");
const userSchema = require("./schemas/user.schema")

const User = mongoose.model("User", userSchema);

module.exports = User;













/* const users = [
  {
    id: 1,
    name: "Matias",
    userName: "mespinosa",
    password: "$2b$10$.3ydA8Oj9BWBD27W9QD2Eu.uDqltVDIVyva.j7Pp3zVs5jwGULZdi",
  },
  {
    id: 2,
    name: "Emiliano",
    userName: "eespinosa",
    password: "$2b$10$DF/KGGx1jcSkAMPy/lN64e1kHjko7fEYJjUYlc28htoUKUE8RhuFS",
  },
  {
    id: 3,
    name: "Matias A",
    userName: "macosta",
    password: "$2b$10$m5q.w/U3CiFc8dD85mk1i.YZItzx47fjUtNftUsJYYHDW2GPXrdom",
  },
];

const getUsers = () => users;

const isValidPassword = async (password, userPassword) => {
    const result = await bcrypt.compare(password, userPassword);
    return result;
}


const saveUser = async (name, userName, password) => {
  const lastUser = users[users.length - 1];

    const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: name,
    userName: userName,
    password: hashedPassword,
  };

  if (lastUser) {
    newUser.id = lastUser.id + 1;
  } else {
    newUser.id = 1;
  }

  users.push(newUser);
  console.log(newUser);
  return newUser.id;
};

const findUserByUserName = (userName) => {
    const user = users.find((u => u.userName == userName));
    return user;
} 

module.exports = {
    getUsers,
    isValidPassword,
    saveUser,
    findUserByUserName
} */