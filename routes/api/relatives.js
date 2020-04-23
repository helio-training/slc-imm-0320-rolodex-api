const express = require('express');
const router = express.Router();
const {
    getRelatives,
    addRelative,
    deleteRelative,
    updateRelative
} = require('../../dal/relatives');
// const getRelatives = require('../../dal/relatives').getRelatives;

router.get('/', async function(req, res) {
    try{
        const data = await getRelatives();
        res.send(data);
    }catch(err){
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
});

router.post('/', async function (req, res) {
    try {
        const data = await addRelative(req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
});

router.put('/:id', async function (req, res) {
    try {
        const data = await updateRelative(req.params.id, req.body);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
});

router.patch('/', async function (req, res) {
    res.send('PATCH at /api/relatives');
});

router.delete('/:id', async function (req, res) {
    try {
        const data = await deleteRelative(req.params.id);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Issue, Check Server Logs');
    };
});

module.exports = router;