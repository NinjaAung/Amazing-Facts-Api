const express = require('express');
const FactModel = require('../models/facts')
const facts = express.Router();


facts.get('/', async (req, res) => { 
    try{
        const facts = await FactModel.find({}); // Recieve all posts
        res.json(facts)
    } catch (err) {
        res.json({message: err})
    }

});


facts.post('/', async (req, res) => { 
    const fact = new FactModel({ // Add a post
        fact: req.body.fact,
        user: req.body.user
    });
    try{
        const savedFact = await fact.save();
        res.json(savedFact);
    } catch (err) {
        res.json({message: err})
    }
});

facts.get('/:factId', async (req, res) => {
    try {
        const fact = await FactModel.findById(req.params.factId);
        if (fact == null) {
            res.status(404).send("Fact has been Deleted or Never Exsisted")
        } else {
            res.json(fact)
        }
    } catch (err) {
        res.json({message: err});
    }
});


facts.delete('/:factId', async (req, res) => {
    try {
        const removedFact = await FactModel.remove({_id: req.params.factId});
        res.json(removedFact);
    } catch (err) {
        res.json({message: err});
    }
});


facts.put('/:factId', async (req, res) => {
    try {
        const updateFact = await FactModel.update(
            {_id: req.params.factId}, 
            { $set: { fact: req.body.fact }
        });
        res.json(updateFact);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = facts;