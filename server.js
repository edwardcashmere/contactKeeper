const express=require('express');
const app=express();
const morgan=require('morgan');
const cors=require('cors');
const path = require('path');
const port =process.env.PORT || 8080 ;


//bring in db
const connectDB=require('./config/db');
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({extended:false}));


//require routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));
app.use('/api/contact',require('./routes/contact'));


//serve static  assets in production
if(NODE_ENV === "production"){
    //set static assets
    app.use(express.static('client/build'));
    app.get('*',(req,res)=> res.sendFile(path.resolve(__dirname,'client','build','index.html')))
}

app.listen(port,()=>{
    console.log('server running')
});