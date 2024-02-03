const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        jwt.verify(req.token, secret, (err, decoded) => {
            if (err) {
                res.status(401);
                if (err.expiredAt) {
                    //if token expired, the err object will have an 'expiredAt' key
                    res.send({ message: 'Your token has expired. Please re-authenticate' })
                } else {
                    res.send({ message: 'You are NOT authorized to access this resource' })
                }
            } else {
                console.log("in next")
                next()
            }
        });
    }
}

module.exports = verifyToken