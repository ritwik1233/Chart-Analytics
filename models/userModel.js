var mongoose=require('mongoose');
var {Schema}=mongoose;

var userSchema=new Schema({
    email:String,
    fname:String,
    lname:String,
    password:String,
    phone:String,
});
mongoose.model('users',userSchema);