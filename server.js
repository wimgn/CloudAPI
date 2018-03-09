const express = require('express');
const path = require('path');

const app = express();

//Dit laten staan voor de ISS positie opvraging !
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Point static path to dist folder
app.use(express.static(path.join(__dirname, 'dist')));  

//breid de server code verder uit voor de REST API


app.listen(3000, () => { console.log("server is running") });
