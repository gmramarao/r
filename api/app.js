'use strict';
const express=require('express');
const compression = require('compression')
const forceDomain = require('forcedomain');
const path=require('path');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const mongoose=require('mongoose');
const config=require('./config/database');
const app=express();
const morgan = require('morgan');
app.use(compression());
app.use(morgan('dev'));
// app.use(forceDomain({
//   protocol: 'https'
// }));

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

var admin = require('./routes/admin');
var user = require('./routes/user');
var vendor = require('./routes/vendor');

app.use('/admin',admin);
app.use('/user',user);
app.use('/vendor',vendor);

app.use(express.static(path.join(__dirname,'public')));

app.listen(port,
  function(){
    console.log('Server logged on '+port)
  }
);

mongoose.connect(config.database);

mongoose.connection.on('connected',function(){
  console.log('connected to database'+config.database)
});

mongoose.connection.on('error',function(a){
  console.log('Error' + a);
});
app.get('*',function(a,b){
  b.sendFile(path.join(__dirname + '/public/index.html'))
});


