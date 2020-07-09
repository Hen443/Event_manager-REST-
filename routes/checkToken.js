const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) {
        res.status(400).send({ message: 'Access Denied' })
        return
    }

    try {
        const check = jwt.verify(token, process.env.JWT_Token)
        req.user = check.id
        next()
    } catch (error) {
        res.status(400).send({ message: 'Invalid Token' })

    }
}