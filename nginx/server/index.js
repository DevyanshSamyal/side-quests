const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Container 3');
});

app.listen(7777, () => {
    console.log('listening on port 7777');
});