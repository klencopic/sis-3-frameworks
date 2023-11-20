const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const novice = require('./routes/novice');

app.use('/novice', novice);
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
