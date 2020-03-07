const express = require('express');
const auth = express.Router();

const FactModel = require('../models/facts');
const UserModel = require('../models/user');

const Joi = require('@hapi/joi');

const schema = {
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
}

auth.post('/register', async (req, res) => {
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


auth.post('/login', (req, res) => {

});
