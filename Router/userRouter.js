const express = require('express');
const { 
  signup,
  login,
  userdetails, 
} = require('../Controller/userController');
const { userVarification } = require('../Middleware/middleware');
const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/userdetails', userVarification, userdetails);

module.exports = {
  userRouter,
};
