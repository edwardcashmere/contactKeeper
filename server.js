const express=require('express');
const app=express();
const morgan=require('morgan');
const cors=require('cors');
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


app.listen(port,()=>{
    console.log('server running')
});