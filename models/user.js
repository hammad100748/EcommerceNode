/**
 * Created by user on 4/23/2017.
 */
var mongoose=require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var Schema=mongoose.Schema;

/* User Schema */
var UserSchema=new Schema({

    email:{type:String, unique:true, lowercase:true},

    password:String,

    profile:{
        name:{type:String,default:''},
        picture:{type:String,default:''}
    },

    address:String,

    history:[{
        date:Date,
        paid:{type:Number,default:0}
        // item:{type:Schema.Types.ObjectId,ref:''}
    }]
});

/* Hashing Password */
// pre is used like before going to DB it will come through here
UserSchema.pre('save',function (next) {
    var user=this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10,function (err,salt) {
       if(err) return next(err);
        bcrypt.hash(user.password,salt,null,function (err,hash) {
            if(err) return next(err);
            user.password=hash;
            next();
        });
    });
});