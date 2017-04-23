/**
 * Created by user on 4/23/2017.
 */
var express=require('express');
var morgan=require('morgan');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var ejsMate=require('ejs-mate');


var User=require('./models/user');

var app=express();

mongoose.connect('mongodb://root:abcd1234@ds115411.mlab.com:15411/ecommerce',function (err) {
   if(err){
       console.log(err)
   }else {
       console.log('Connected to MongoDB');
   }
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.engine('ejs',ejsMate);
app.set('view engine','ejs');

// Routes
app.get('/',function (req,res) {
    res.render('main/home');
});

app.post('/create-user',function (req,res,next) {
   var user=new User();
    user.profile.name=req.body.name;
    user.password=req.body.password;
    user.email=req.body.email;

    user.save(function (err) {
        if (err) return next(err);
        res.json('User Created');
    });
});

app.listen(3000,function (err) {
    if(err) throw err;
    console.log('Server is running on port 3000');
});