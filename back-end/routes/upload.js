const multer = require('multer');
const express = require("express")
const upload = express.Router();
const DB = require('../db/dbConn.js')


let upload_dest = multer({ dest: 'uploads/' })


upload.post('/', upload_dest.single('file'), async (req, res, next) => {
    if(!req.session.logged_in){
        console.log("req.session.logged_in: "+req.session.logged_in)
        res.json({status:{success: false, msg: "You need to log-in!"}})
        res.end(200)
        return
    }

   const file = req.file;
   
   console.log(file.filename);
   
   if (!file) {
     res.send({ status: { success: false, msg: "Could not uplpad" }});
   }else{
     res.send({ status: { success: true, msg: "File upladed" }});
   }  
})

module.exports = upload
