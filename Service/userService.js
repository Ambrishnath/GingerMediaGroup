const { StudentModel } = require('../Schema/studentSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signupService = async (req) => {
  try {
    const { email } = req;
    const studentFound = await StudentModel.findOne({ email });
    if (studentFound) {
      return {
        success: true,
        status: 200,
        message: 'Student already exist',
        response: studentFound
      }
    }
    const studentdata = await new StudentModel(req).save();
    return {
      success: true,
      status: 200,
      message: 'Student has been ceated',
      response: studentdata
    }
  } catch (error) {
    return error;
  }
};

const loginService = async (req) => {

  try {
    const { email, password } = req;
    if (!email || !password) {
      const err = new Error('Please provide correct credentials');
      err.status = 401;
      throw err;
    }

    const studentData = await StudentModel.findOne({ email });
    if (!studentData) {
      const err = new Error('There is no record found from that given data. Please give valid detail');
      err.status = 404;
      throw err;
    }

    const isPasswordCorrect = password === studentData.password;

    if (!isPasswordCorrect) {
      throw new Error('Password is not correct').status(401)
    }
    const data = JSON.stringify(studentData);
    const token = await jwt.sign(data, 'student')

    return {
      success: true,
      status: 200,
      message: 'Student has been logged in',
      response: token
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  signupService,
  loginService,
};
