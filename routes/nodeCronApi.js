const express = require('express');
const router = express.Router();
const cron = require('node-cron');

router.post('/nodecron', (req, res) => {

    cron.schedule('*/2 * * * *',() => {
        console.log('task every two minutes');
        res.json({message: 'task every two minutes'});
    });
})

module.exports = router;