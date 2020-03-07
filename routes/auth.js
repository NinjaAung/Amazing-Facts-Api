const express = require('express');
const auth = express.Router();

const UserModel = require('../models/user');

const Joi = require('@hapi/joi');
const { registrationValidate } = require('../validation');


auth.post('/register', async (req, res) => {
    const { error } = registrationValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const usernameExist = await UserModel.findOne({username: req.body.username})
    if (usernameExist) return res.status(400).send('Username Taken')

    const user = new UserModel({
        username: req.body.username,
        password: req.body.password
    })
    try{
        const savedUser = await user.save();
        res.json(savedUser)
    }catch (err) {
        res.status(400).send(err)
    }
});

module.exports = auth;