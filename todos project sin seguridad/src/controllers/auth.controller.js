const {
  findUserByUserName,
  isValidPassword,
  saveUser,
} = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");

const postAuthLogin = async (req, res) => {
  const { body } = req;
  const { userName, password } = body;

  const user = await findUserByUserName(userName);
  console.log("user: " + user);

  if (!user) {
    res.status(400).json({
      message: "Credenciales invalidas.",
    });
    return;
  }

  const isValidPass = await isValidPassword(password, user.password);

  if (!isValidPass) {
    res.status(400).json({
      message: "Credenciales invalidas.",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
      userName: user.userName,
    },
    process.env.AUTH_SECRET_KEY,
    {
      expiresIn: "1h",
    },
  );

  res.json({ token });
};

const postAuthSingup = async (req, res) => {
  const { body } = req;
  const { username, name, password, email } = body;

  const user = await findUserByUserName(username);

  if (user) {
    res.status(400).json({
      message: "Nombre de usuario ya esta en uso.",
    });
    return;
  }

  try {
    await saveUser(name, username, password, email);
    res.status(201).json({
      message: "Usuario registrado exitosamente: "
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      message: "Ha ocurrido un error inesperado.",
    });
  }
};

module.exports = {
  postAuthLogin,
  postAuthSingup,
};
