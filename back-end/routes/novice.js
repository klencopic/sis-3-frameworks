const multer = require('multer');
const express = require("express")
const novice = express.Router();
const DB = require('../db/dbConn.js')


//Gets all the news in the DB
novice.get('/', async (req, res, next) => {
    try {
        var queryResult = await DB.allNovice();
        res.json(queryResult)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})



//Gets one new based on the id
novice.get('/:id', async (req, res, next) => {
    try {
        var queryResult = await DB.oneNovica(req.params.id)
        res.json(queryResult)
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

//Gets one new based on the id
novice.delete('/delete/:id', async (req, res, next) => {
    try {
        var queryResult = await DB.deleteNovica(req.params.id)
        if (queryResult.affectedRows) {
            res.json({status:{success: true, msg: "News deleted!"}})
        }else{
            res.json({status:{success: false, msg: "Could not delete!"}})
        }
        
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

let upload_dest = multer({ dest: 'uploads/' })

//Inserts one new item to the database
novice.post('/', upload_dest.single('file'), async (req, res, next) => {

    if(!req.session.logged_in){
        console.log("req.session.logged_in: "+req.session.logged_in)
        res.json({status:{success: false, msg: "Can not add news. You need to log-in!"}})
        res.end(200)
        return
    }

    let title = req.body.title
    let slug = req.body.slug
    let text = req.body.text
    let file = req.file


    var isAcompleteNovica = title && slug && text && file
    if (isAcompleteNovica) {
        try {
            const file = req.file;
            console.log(file.filename);
            
            if (!file) {
                res.json({ status: { success: false, msg: "Could not upload" }});
            }else{
                console.log("File upladed");
                var queryResult = await DB.creteNovica(title, slug, text, file.filename)
                if (queryResult.affectedRows) {
                    console.log("New article added!!")
                    res.json({status:{success: true, msg: "News item added!"}})
                }
            }
            }  
           

            
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    else {
        console.log("A field is empty!")
        res.json({status:{success: false, msg: "A field is empty!"}})
        }
    res.end()


})

//Inserts one new item to the database
novice.post('/edit/', async (req, res, next) => {

    // if(!req.session.logged_in){
    //     console.log("req.session.logged_in: "+req.session.logged_in)
    //     res.json({status:{success: false, msg: "Can not add news. You need to log-in!"}})
    //     res.end(200)
    //     return
    // }

    let title = req.body.title
    let slug = req.body.slug
    let text = req.body.text
    let id = req.body.id
    

    var isAcompleteNovica = title && slug && text && id 
    if (isAcompleteNovica) {
        try {
            var queryResult = await DB.updateNovica(title, slug, text,id)
            if (queryResult.affectedRows) {
                res.json({status:{success: true, msg: "News updated!"}})
            }else{
                res.json({status:{success: false, msg: "News can not be updated!"}})
            }
        }  
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
    else {
        console.log("A field is empty!")
        res.json({status:{success: false, msg: "A field is empty!"}})
        }
    res.end()


})

module.exports = novice
