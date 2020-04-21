const express = require('express');
const router = express.Router();
const {
    getRelatives
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
    res.send('POST at /api/relatives');
});

router.put('/:id', async function (req, res) {
    res.send('PUT at /api/relatives');
});

router.patch('/', async function (req, res) {
    res.send('PATCH at /api/relatives');
});

router.delete('/:id', async function (req, res) {
    res.send('DELETE at /api/relatives');
});

module.exports = router;