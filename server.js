const express=require('express');
const app=express();
const morgan=require('morgan');
const port =process.env.PORT || 3000 ;


app.use(morgan('dev'));
app.use(express.json());


//require routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/user',require('./routes/user'));
app.use('/api/contact',require('./routes/contact'));


app.listen(port,()=>{
    console.log('server running')
});