const jwt = require('jsonwebtoken');


const userVarification = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
         throw new Error('Please login').status(401);  
        }
        const token = req.headers.authorization.split(' ')[1];
        req.student = await jwt.verify(token, 'student');
        next();    
    } catch (err) {
        res.status(err.status).send(err)
    }
}

module.exports = {
    userVarification,
}
