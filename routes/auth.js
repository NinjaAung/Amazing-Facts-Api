const express = require('express');
const auth = express.Router();
const bcrypt = require('bcrypt')

const UserModel = require('../models/user');

const Joi = require('@hapi/joi');
const { registrationValidate, loginValidate } = require('../validation');


auth.post('/register', async (req, res) => {
    const { error } = registrationValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const usernameExist = await UserModel.findOne({username: req.body.username})
    if (usernameExist) return res.status(400).send('Username Taken')


    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    const user = new UserModel({
        username: req.body.username,
        password: hashpassword
    })
    try{
        const savedUser = await user.save();
        res.status(200).json({user: user._id})
    }catch (err) {
        res.status(400).send(err)
    }
});


auth.post('/login' ,async (req, res) => {
    const { error } = loginValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

})


module.exports = auth;