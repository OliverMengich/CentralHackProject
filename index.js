const express = require('express');
const path = require('path');
/*
const address = "0:b9dc9b7df2eb6cc005fd7cd693dc567ea4be7a0b1c429853bf38aa2992cb988d";

const {contractPackage, keypair} = require('./controllers/depend');
console.log(keypair);
const ProcessMessage = require('./models/process');
const {abiContract, signerKeys, TonClient} = require('@tonclient/core');
const {libNode} = require('@tonclient/lib-node');
TonClient.useBinaryLibrary(libNode);*/

const bodyParser = require('body-parser');
const app = express();

const router = require('./routes/router');
// Define the templating engines to be used
app.set('view engine', 'ejs');
// allow to render the views from the views folder
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
// express allows to access the CSS files in the public folder
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.static(path.join(__dirname,'/views')));
app.use('/',router);
app.use((req,res,next)=>{
    res.status(404).render('404', {
        pageTitle: 'Page Not Found'
    });
});

app.listen(3000,(req,res)=>{
    console.log(`Server listening at port ${3000}`);
});
