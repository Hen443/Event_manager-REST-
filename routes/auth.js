const router = require('express').Router()
const User = require('../models/user')
const validator = require('validator');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const sendgrid = require('nodemailer-sendgrid-transport')
const bcrypt = require('bcrypt');
const checkToken = require('./checkToken');

const transporter = nodemailer.createTransport(sendgrid({
    auth: { api_key: process.env.send_grid }
}))

router.post('/login', async (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    const emailexis = await User.findOne({ email: req.body.email })
    if (!emailexis) {
        res.status(400).send({ message: 'Wrong Email or Password' })
        return
    }
    const ifyou = await bcrypt.compare(req.body.password, emailexis.password)

    if (!ifyou) {
        res.status(400).send({ message: 'Wrong Email or Password' })
        return
    }

    const token = jwt.sign({ id: emailexis._id }, 'tumo_students');
    res.send({ auth_token: token })
})

router.post('/register', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const emailEx = await User.findOne({ email: req.body.email })

    if (req.body.name.trim() != "" && req.body.password.length >= 6 && req.body.password.length <= 32 && validator.isEmail(req.body.email)) {

        if (emailEx == null) {
            const hashedPass = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPass
            })

            try {
                const data = await user.save()
                await transporter.sendMail({
                    to: req.body.email,
                    from: 'henrik.a.y@tumo.org',
                    subject: 'Congratss!!!!',
                    text: "hello",
                    html: `<h1>Hello ${req.body.name} !!!</h1>`
                })
                res.set('Content-Type', 'application/json');
                res.send(data)


            }
            catch (error) {
                res.status(403).send({ message: error })

            };
        }
        else {
            res.status(400).send({ message: 'Email already exists' })
        }

    }

    else {
        res.setHeader('Content-Type', 'application/json');
        res.status(403).send({ message: 'validation error' })

    }
})

router.get('/profile', checkToken, async (req, res) => {
    try {
        const profile = await User.findById(req.user).select('name email date _id')
        res.send(profile)

    } catch (error) {
        res.status(400).send({ message: error })
    }
})

module.exports = router