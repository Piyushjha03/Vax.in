
import express from "express"
import mysql from "mysql"
import cors from "cors"
import path from "path";

const app=express();

app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
    host:"bp6aanxbenfnmv7lwtwg-mysql.services.clever-cloud.com",
    user:"ulbct18t49ghznva",
    password:"dMa4nRpIXKI62RsIDJGf",
    database:"bp6aanxbenfnmv7lwtwg",
    multipleStatements: true
})

db.connect();

app.post('/login',(req,res)=>{
    const userId=req.body.userId;
    const password=req.body.password;
    const q="SELECT * FROM user WHERE aadhar_number=? AND password=?"

    db.query(q,
    [userId,password],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        if(result.length>0){
            res.send(result);
        }
        else{
            res.send();
        }
    }
    )
}) 

app.post('/register',(req,res)=>{
    const getAge = (dob) => Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10);

const firstName=req.body.firstName;
const lastName=req.body.lastName;
const phnumber=parseInt(req.body.phnumber);
const dob=req.body.dob;
const vaccination_status="false";
const age=getAge(req.body.dob);
const address=req.body.address;
const aadhar_number=req.body.aadhar_number;
const gender=req.body.gender;
const password=req.body.password;

    const q="INSERT INTO user(firstName,lastName,phnumber,dob,vaccination_status,age,address,aadhar_number,gender,password) VALUES(?,?,?,?,?,?,?,?,?,?)"

    db.query(q,
    [firstName,lastName,phnumber,dob,vaccination_status,age,address,aadhar_number,gender,password],
    (err,result)=>{
        if(err){console.log(err);}
    }
    )
})

app.post('/',(req,res)=>{
    const state=req.body.selectedState.toLowerCase();
    const district=req.body.selectedDistrict.toLowerCase();
    const q="SELECT * FROM center WHERE state=? AND district=? ORDER BY number_of_slots DESC"
    
    db.query(q,
    [state,district],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        else{
            res.send(result);
        }
    }
    )
    console.log(res);
})

app.post('/camp',(req,res)=>{
    const c_id=parseInt(req.body.c_id);
    const date_of_slot=req.body.date_of_slot;
    const uh_id=parseInt(req.body.uh_id);
    const vaccine_type=req.body.vaccine_type;
    const time_of_slot=req.body.time_of_slot;

    const q="INSERT INTO slot (c_id,date_of_slot,uh_id,vaccine_type,time_of_slot) values(?,?,?,?,?)"
    
    db.query(q,
    [c_id,date_of_slot,uh_id,vaccine_type,time_of_slot],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        else{
            res.send(result);
            const q2="UPDATE center SET number_of_slots=number_of_slots-1 WHERE centre_id=?"
    db.query(q2,
        c_id,
        )
        console.log(res);
        }
    }
    )
 

    
})


app.post('/account',(req,res)=>{
    const uh_id=parseInt(req.body.uh_id);
    const q="SELECT * FROM slot WHERE uh_id=?"
    
    db.query(q,
    [uh_id],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        else{
            res.send(result);}

})})

app.post('/account2',(req,res)=>{
    console.log(req.body);
     const centre_id=parseInt(req.body.c_id);
     const q="SELECT * FROM center WHERE centre_id=?"
    
    db.query(q,
    [centre_id],
    (err,result)=>{
        if(err){
            res.send({err:err})
        }
        else{
            res.send(result);}})

})

app.post('/update',(req,res)=>{
    const getAge = (dob) => Math.floor((new Date() - new Date(dob).getTime()) / 3.15576e+10);
const firstName=req.body.firstName;
const lastName=req.body.lastName;
const phnumber=parseInt(req.body.phnumber);
const dob=req.body.dob.substring(0,10);
const vaccination_status="false";
const age=getAge(req.body.dob);
const address=req.body.address;
const aadhar_number=req.body.aadhar_number;
const gender=req.body.gender;
const password=req.body.password;

    const q="UPDATE user SET firstName=?,lastName=?,phnumber=?,dob=?,vaccination_status=?,age=?,address=?,aadhar_number=?,gender=?,password=? WHERE aadhar_number =?"

    db.query(q,
    [firstName,lastName,phnumber,dob,vaccination_status,age,address,aadhar_number,gender,password,aadhar_number],
    (err,result)=>{
        if(err){console.log(err);
        }
        else{
            res.send(result);}

    }
    )
})

app.use('/test',(req,res)=>{res.json({message:"hello"})});

app.listen(8800,()=>{
    console.log("connected");
})
