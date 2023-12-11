const express= require("express")
const users = express.Router();
const DB=require('../db/dbConn.js')

//Checks if user submited both fields, if user exist and if the combiation of user and password matches
// TODO: implement  sessions and cookies to keep the user logged in.
// TODO: implement a logout route 
// TODO: use encryption to store passwords

users.post('/login', async (req, res, next) => {
    try{
     const username = req.body.username;
     const password = req.body.password;
     if (username && password){
         const queryResult=await DB.AuthUser(username)        
         if(queryResult.length>0){
             if(password===queryResult[0].user_password){
                 console.log(queryResult)
                 res.send({logged:true, user:queryResult[0]})
             } else{
                 res.sendStatus(204)
                  console.log("INCORRECT PASSWORD")
             }
         } else{
             res.sendStatus(204)
             console.log("USER NOT REGISTRED");   
         }
     } 
     else {
         res.sendStatus(204)
         console.log("Please enter Username and Password!")
     }
     res.end();
    }catch(err){
     console.log(err)
     res.sendStatus(500)
     next()
    }
  });
  

//Inserts a new user in our database id field are complete
users.post('/register', async (req, res, next) => {
    try{
    const username = req.body.username
	const password = req.body.password
    const email= req.body.email
    if (username && password && email){ 
        const queryResult=await DB.AddUser(username,email,password);
        if (queryResult.affectedRows) {
            console.log("New user added!!")
          }    
    } 
    else {
        console.log("A field is missing!")
    }
    res.end();
    }catch(err){
        console.log(err)
        res.sendStatus(500)
        next()
    }
    
});

module.exports=users
