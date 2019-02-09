const express=require('express');
const bodyParser=require('body-parser');
const fileUpload = require('express-fileupload');
const port=process.env.PORT||5000
const path=require('path');
let app=express()
var keys=require('./keys/keys')
const mongoose=require('mongoose');
const session =require('express-session');
mongoose.connect(keys.MongoURI,{ useNewUrlParser: true });
require('./models/userModel');
require('./models/fileModel');
const helmet = require('helmet')
app.use(helmet())
app.use(fileUpload());
app.use(bodyParser.json());
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: true,
}));
require('./routes/authRoutes')(app);
require('./routes/fileRoutes')(app);
if (process.env.NODE_ENV=='production')
    {
        app.use(express.static('client/build'));
        const path=require('path');
        app.get('*',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'client','build','index.html'));
        });
    }
app.listen(port,(err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("Server on ",port)
    }
})

