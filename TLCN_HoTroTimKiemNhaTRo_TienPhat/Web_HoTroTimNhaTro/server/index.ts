import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';

import userRouter from './routers/user.router';
import homeRouter from './routers/phongtro.router';
import homePageRouter from './routers/home.router';

import flash from 'connect-flash';

const app = express();

/* Khai báo để sử dụng kịch bản passport */
import './config/passport.config';

app.use(session({
    name: 'login',
    secret : 'secured_key',
    resave : false,
    saveUninitialized : false,
    cookie:{
      maxAge:1000*60*15
    }
}))

app.use([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true,
  })
]);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));

app.use('/nguoi-dung',userRouter);
app.use('/phong-tro',homeRouter);
app.use('/trang-chu',homePageRouter);

app.listen(8000, async ()=>{
    await mongoose.connect('mongodb://localhost:51734', {
      dbName: "Database_PhongTroVN"
    });

    console.log("Listen port 8000");    
});
