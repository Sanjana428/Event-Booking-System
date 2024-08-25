const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    // const secretKey='b492b4fb66cc693d0e7d5f4c06d1594ffcd75b27acc51ee6af4011c0fb83d2f88addd93f0579f418c1819c3de7a6c0f42f4a378be7957e06f96af0149a4d3151';
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    });
};

module.exports = generateToken;
