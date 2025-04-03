# Back-end using MySQL, NodeJS and Express

The aim of this tutorial is to create a simple web service that uses MySQL database to store data.
The web service will have an API which will enable one to:
- retrieve a list of existing news items;
- add a new news item;
- register a new user;
- login(authenticate) an existing user;

## MySQL

At this stage of the Lab Sessions, I assume that you already have experience with MySQL and phpMyAdmin. Therefore, we'll skip that part and empower you to create your own data models. You can access this databease through phpmyadmin: http://88.200.63.148/phpmyadmin. 

To login use:
USER_NAME: see e-classroom
PASSWORD: see e-classroom

## NodeJS
- Node enables developers to write JavaScript code that executes directly within a computer process, rather than within a web browser.
- Node provides access to several crucial global objects for use within Node program files, including modules, require, and process.
- Node offers a wide array of built-in modules that simplify interactions with the command line, the computer's file system, and the internet.
- Node empowers you with the capability to install packages developed by other developers.


[More info](https://www.codecademy.com/articles/what-is-node)


### Installation


[Official instructions](https://nodejs.org/en/)


## Express.js


### What is Express


- Express is a middleware that helps us to deal with server-side logic for web and mobile applications
- It's easy to use and plays along with many other frameworks, such as react, mongo,angular, etc.
- It's javascript :)


## Creating a NodeJs + Express.js server


We'll dive into ExpressJS by building something practical. In this case, we'll replicate the functionality of your codeigniter project. This tutorial is divided into four steps:


- [The server](#the-server)
- [The routes](#the-routes)
- [The DB](#the-db)
- [The CRUD](#the-crud)


Please follow these steps in order.


### The server


1. Clone this [repository](https://gitlab.com/klen.copic/sis-3-frameworks.git) and create a folder at the root level and name it *back-end* (short for Content Managment System) at the root level.


2. Navigate inside the folder and run the command


```console
npm init
```


- By pressing enter everytime console prompts, you will keep the default values if you don't modify the entries
- The outcome of this operation will be a file named *package.json* that contains the basic information of our NodeJS project, particularlly, the packages/dependecies that we have installed so far, none.


3. Install your first dependency by running the command:


```console
npm install express --save
```


4. In the root of this project, create a javascript empty file, by convention you should name it **index.js** but it doesn't really matter.


5. Open your **index.js**  in your favorite IDE and in the first line import the recently installed dependency at the top:


```javascript
const express = require('express')
```


- Note that in newer versions of JavaScript, you don't need to end statements with semicolons. :)
- If you're not familiar with JavaScript variable declaration, you can review this article:  <https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/>


6. Create an instace of *ExpressJS* like this.


```javascript
const app = express()
```


7. Create a simple route for the server and assign a port to listen on:


```javascript
const port = 


app.get("/",(req,res)=>{
res.send("hola")
})


///App listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})
```


- First, we choose the port we want the server to listen on and declare it as *const port*.
- In the app.get method, we specify two parameters. The first one defines the route the server expects, in this case, "/", which means "http://ADDRESS:PORT/". The second one is a callback function to handle the request and response. This is similar to what we did when creating the simple server. In this case, if someone visits the URL "http://ADDRESS:PORT/, we'll send the string "hola" to the browser.
- Finally,  in *app.listen*, we instruct our server to start listening on a specific port.


8. Save the file and in the console, run:


```console
node index.js
```


- If everything is correct, you should see the message "hola" in your browser.
- We could write all our logic in this ***index.js*** file, but at some point it's gona become messy so let's instead create some *routes* in different files using the power of *ExpressJS*.


### The routes


1. Inside your *back-end* folder create a new folder and name it: *routes*.


2. Inside *routes* folder create an empty javascript document and name it: *novice.js*.


3. In the *novice.js* file, import *express* and then create an instance of *express.Router*


```javascript
const express= require("express")
const novice = express.Router();
```


- We will see how it work once we define our first route


5. Create a route that points to *"/"*


```javascript
novice.get('/',(req,res)=>{
console.log("The route has been reached")
res.send("novice")
})
```


6. Export your module so it can be called from other script by putting at the end of the code.


```javascript
module.exports=novice
```


7. In **index.js**, import **novice.js** and then use it like this.


```javascript
//Import our custom modules-controllers
app.use(express.json());
const novice= require("./routes/novice")
//Routes
app.use('/novice', novice);
```


8. Save the file and in the console, run:


```console
node path/to/your/index.js
```


9. In the browser visit *http://ADDRESS:PORT/novice


- If you've followed each step so far, you should see a message in the console and the string "novice" in the browser.
- The next step in this tutorial is to consume information from the database you created in your codeigniter project. So, every time a user visits a specific endpoint, such as http://ADDRESS:PORT/novice, we retrieve news from the database.
- The idea for the next steps is: i) establish a connection with the database, and then ii) create our own CRUD operations.


### The DB


1. In the root of our back-end project, create a folder and name it DB.


2. Inside the DB folder, create an empty file and name it  **dbConn.js**


3. Install the following dependencies:


```console
npm install mysql2 dotenv
```


- The first one (mysql2) is a dependency that will help us manage the connection to the database, and the second one (dotenv) is used to securely store our database information.


4. In **DBConn.js**, import *ExpresJS*, just as in step **5** of **The server**


6. Define a variable to hold the database connection:


```javascript
const mysql = require('mysql2');


const  conn = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: 'Qcodeigniter',
 })


conn.connect((err) => {
     if(err){
         console.log("ERROR: " + err.message);
         return;   
     }
     console.log('Connection established');
   })
 ```


- In your case the value of the *database* key must match the exact name of your database.
- In the next step we will define the *host*, *user* and *password*.
- You may have noticed that I've included a block of code provisionally to check if the connection to the database was successful. For now, let's just save it.


7. In the back-end folder, create a file a name it *.env*, open it and write:


```text
DB_HOST=localhost
DB_USER=see-eclassroom
DB_PASS=see-eclassroom
DB_DATABASE=Qcodeigniter
```


- We want to keep this information private and not expose it in your repository, so let's also create a *.gitignore* file in the back-end folder and simply put:


```text
.env
```


8. Finally to test if it works, go to  **index.js** and add this line after the line where you imported *ExpressJS*:


```javascript
//Basic packages
const express = require('express')
require('dotenv').config()
const DB = require('./DB/dbConn.js')

```

9. Run the code as usual with *node index.js*


### The CRUD
For this part, it's important that you understand the logic of the server and how it interacts with the routes and the database. One technique to do this is to read the code and sketch the app's flow.


So far, we have learned how to create a server that listens for incoming requests, how to create a route to handle requests on a specific endpoint, and lastly, how to establish a connection with the database.


Now it's time to expand our application and write the code for Creating, Reading, Updating, and Deleting data from our database.


1. In **dbConn.js** add the code to handle the CRUD operations:
```javascript
let dataPool={}
 dataPool.allNovice=()=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM news`, (err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}


dataPool.oneNovica=(id)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`SELECT * FROM news WHERE id = ?`, id, (err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}


dataPool.creteNovica=(title,slug,text)=>{
 return new Promise ((resolve, reject)=>{
   conn.query(`INSERT INTO news (title,slug,text) VALUES (?,?,?)`, [title, slug, text], (err,res)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 })
}


module.exports = dataPool;
```


- Note that I have created an object variable to store the data returned after each query.
- The returned data is received as a callback from a given function. In this case, the function returns a  *[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)*.
- As you may noticed, the *Promise* is a function that will return either an error if the request failed or a resolution if data query was fulfilled.
- What is the data that needs to be resolved or return as error? The one we are requesting in the *conn.query()*
- The string that we pass as parameter into the query function might look familiar to you; this is because it is as SQL instruction that you  already learned to use in previous lab sessions.
- To keep things short I have also implemented a request for a single new *oneNovica* that it's pretty similar to the first function but I have included and identifier to overload the request.
- The last function *createNovica* follows a similar structure to *oneNoica* but receives 3 parameters instead. This is because we defined our database to autoincrement the id counter everytime a new article is inserted.
- Analyse previous code and make sure you understand what is going on.


2. Add the queries related with the user login
```javascript
dataPool.AuthUser=(username)=>
{
 return new Promise ((resolve, reject)=>{
   conn.query('SELECT * FROM user_login WHERE user_name = ?', username, (err,res, fields)=>{
     if(err){return reject(err)}
     return resolve(res)
   })
 }) 
 }
```
- In a sense, they follow a similar pattern as the previous queries for news, but in this case, they deal with data associated with user accounts.
3. Open **novice.js** and replace the all previous code with the following:


```javascript
const express= require("express")
const novice = express.Router();
const DB=require('../DB/dbConn.js')


//Gets all the news in the DB
novice.get('/', async (req,res, next)=>{
   try{
       var queryResult=await DB.allNovice();
       res.json(queryResult)
   }
   catch(err){
       console.log(err)
       res.sendStatus(500)
   }
})


//Gets one new based on the id
novice.get('/:id', async (req,res, next)=>{
   try{
       var queryResult=await DB.oneNovica(req.params.id)
       res.json(queryResult)
   }
   catch(err){
       console.log(err)
       res.sendStatus(500)
   }
})


//Inserts one new item to the database
novice.post('/', async (req,res, next)=>{
      
 let title = req.body.title
 let slug = req.body.slug
 let text = req.body.text


   var isAcompleteNovica=title && slug && text
   if (isAcompleteNovica)
   {
       try{
           var queryResult=await DB.creteNovica(title,slug,text)
           if (queryResult.affectedRows) {
               console.log("New article added!!")
             }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   } 
   else
   {
    console.log("A field is empty!!")
   }
   res.end()


 })
module.exports=novice
```
- Please note that the first two routes use the GET method, while the last one uses the POST method.
- Observe the use of try and catch statements that help in handling errors and prevent the application from breaking during runtime.
 


4. Create a new file  in **routes** folder and name it **users.js** then copy and paste the following code:
```javascript
const express= require("express")
const users = express.Router();
const DB=require('../DB/dbConn.js')


//Checks if user submitted both fields, if user exist and if the combination of user and password matches
users.post('/login', async (req, res) => {
 
 var username = req.body.username;
 var password = req.body.password;
   if (username && password)
   {
       try
       {
        let queryResult=await DB.AuthUser(username);
      
               if(queryResult.length>0)
               {
                   if(password===queryResult[0].user_password)
                   {
                    console.log(queryResult)
                    console.log("LOGIN OK");
                    res.status(200)
                   }
                   else
                   {
                      console.log("INCORRECT PASSWORD");
                      res.status(204)
                   }
               }else
               {
                  console.log("USER NOT REGISTRED");
                  res.status(204)  
               }
       }
       catch(err){
           console.log(err)
           res.status(500)
       }   
   }
   else
   {
       console.log("Please enter Username and Password!")
       res.status(204)
   }
   res.end();
});


// Inserts a new user in our database
// Add your code here!

module.exports=users
```


- Similarly to **novice.js**  we begin by importing the necessary dependencies and modules. Then, we proceed to define the logic for each route in this file. In this case, we are concerned with two main functionalities: i) handling user login attempts, and ii) facilitating user registration.
- For sure you noticed that in both files **novice.js** and **users.js** we are using the custom methods we created in **dbConn.js**. Also that we are using special keywords, such as: await and async.For now the only thing you need to know about them is that they are connected with the previously introduced *Promises*.
If you are curious about it please read some basic of [asynchronous programming](https://semaphoreci.com/blog/asynchronous-javascript#:~:text=Asynchronicity%20means%20that%20if%20JavaScript,callback%20queue%20and%20event%20loop) in JavaScript.


5. Save and run our server to check that everything works.


- You can use tools like [Postman](https://www.postman.com/) to send request to your server.


For now we have reached this tutorial. There are a few more thing to do in the back-end but we will finish them during later on.

## Exercises
### Exercises 1: POST request
Using postman create a post request to endpoint http://ADDRESS:PORT/novice to add new news item. Make sure to add title, slug and text parameters to the body.
Using postman create a post request to endpoint http://ADDRESS:PORT/users/login to authenticate user. Make sure to add username and password parameters to the body.


### Exercises 2: Adding JSON response to POST request
Update web application so that the POST requests in Exercise 1 responds with json. Do this for both endpoints mentioned in exercise 1. Here is an example response:
```json
{
 "success": true,
 "message": "News item added."
}
```

HINT: The code snippet below shows you how to add JSON response.
```javascript
const express = require('express');
const app = express();


app.get('/api/success', (req, res) => {
   res.json({ success: true });
});


app.listen(3000, () => {
   console.log('Server is running on port 3000');
});
```


### Exercises 3: Create new endpoint to register new users
The endpoint http://ADDRESS:PORT/users/register on post request should insert new user to QIgniter database, table user_login.


HINT: You need to do something very similar to what was done when adding news item to the database.
Here is example of SQL code to add new user to the database.


```SQL
INSERT INTO user_login (user_name,user_email,user_password) VALUES (?,?,?)
```

