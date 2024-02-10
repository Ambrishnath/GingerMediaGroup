const { signupService, loginService } = require('../Service/userService');

const signup = async (req, res) => {
  try {
    const result = await signupService(req.body);
    if (result.success) {
      res.status(result.status).send(result);
    } else {
      res.status(result.error.status).send(result);
    }
  } catch (err) {
    res.status(err.status).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(result.status).send(result);
  } catch (err) {
    res.status(err.status).send(err.message);
  }
}

const userdetails = async (req, res) => {
  res.status(200).send(req.student);
}

module.exports = {
  signup,
  login,
  userdetails,
};
