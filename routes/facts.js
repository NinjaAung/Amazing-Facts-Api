const express = require('express');
const Fact = require('../models/facts')
const facts = express.Router();


facts.get('/', async (req, res) => { 
    try{
        const facts = await Fact.find({}); // Recieve all posts
        res.json(facts)
    } catch (err) {
        res.json({message: err})
    }

});


facts.post('/', async (req, res) => { 
    const fact = new Fact({ // Add a post
        fact: req.body.fact
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
        const fact = await Fact.findById(req.params.factId);
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
        const removedFact = await Fact.remove({_id: req.params.factId});
        res.json(removedFact);
    } catch (err) {
        res.json({message: err});
    }
});


facts.put('/:factId', async (req, res) => {
    try {
        const updateFact = await Fact.update(
            {_id: req.params.factId}, 
            { $set: { fact: req.body.fact }
        });
        res.json(updateFact);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = facts;