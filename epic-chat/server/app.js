const express       = require('express');
const bodyParser    = require('body-parser');
const path          = require('path');
const app           = express();


app.use(bodyParser.json()); // it will parse all the incoming and outgoing request with json parser
app.use(express.static(path.join(__dirname, '../dist'))); //directory of static files 


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})


app.listen(3000, ()=> console.log('Listening on Port 3000'));
