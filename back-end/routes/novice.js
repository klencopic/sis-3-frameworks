const express = require('express');
const novice = express.Router();

novice.get('/', (req, res) => {
    res.send('Novice');
});

module.exports = novice;
