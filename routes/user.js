const express = require('express');
const crypto = require('crypto')
const FactModel = require('../models/facts')
const UserModel = require('../models/user')
const user = express.Router();


user.post('/add', async (req, res) => {
    let salt = crypto.randomBytes(16).toString('base64');
    try{
        let hash = crypto.createHmac('sha512',salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
        UserModel.createUser(req.body)
        .then((result) => {
        res.status(201).send({id: result._id});
    });
    } catch (err) {
        res.json({message: err})
    }
});

module.exports = user;