const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require ('mysql2');

const app = express();

app.use(cors());
app.use(bodyparser.json());


const db = mysql.createConnection({
    host:'localhost',
    user:'sammy',
    password:'Mysql@123',
    database:'registerdb',
    port:3306
})

db.connect(err=>{
    if (err) {console.log(err,'dberr');}
    console.log('database connected...');
});

// get all data
app.get('/users',(req,res)=>{
    let qr = 'select * from users';
    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result  
            })
        }
    })
 });

//create data

app.post('/users',(req,res)=>{
    console.log(req.body,'createdata');

    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let eMail = req.body.email;
    let dateofBirth = req.body.dateofbirth;
    let mobileNo = req.body.mobileno;

    let qr = `insert into users(firstname,lastname,email,dateofbirth,mobileno)values('${firstName}','${lastName}','${eMail}','${dateofBirth}','${mobileNo}')`;
    console.log(qr,'qr')
    db.query(qr,(err,result)=>{
        
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'data inserted',
        })
    });
});


app.listen(3000,()=>{
    console.log('server running..');
});   