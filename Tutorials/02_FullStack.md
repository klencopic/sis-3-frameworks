# Full Stack

## Stablishing the communications Server-Client
So far  in these set of tutorials we have: i) built a server using **Express.js**, ii) established a connections with the db using **mysql** and iii) bulit the client(front-end) using **React.js**.

Finally is time to connect them all, to achieve this, we will:

- Install [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) as node dependency.
- Consume the API we created during **back-end** tutorial
- <strike>Create a proxy so we dont have to change the endpoints while building the final version of our client</strike>
- Create the logic in the client side to handle the responses from the server
- Define a way to keep an user logged

### CORS
1. Install CORS dependency. If we don't do this step we wont be able to retreive data from the server in the client server

```console
npm install cors
```

2. Import the new dependency into *index.js* in the server side
```javascript
const cors=require("cors")
```
3. Define some parameters that we need to let the server that it can respond to an specific address
```javascript
//Some configurations
app.use(express.urlencoded({extended : true}));
app.use(cors({
  origin:["http://88.200.63.148:3000"],
  methods:["GET", "POST"],
  credentials:true
}))
``` 

### Consuming the API

1. In client-side project install [axios](https://github.com/axios/axios) 

```console
npm install axios
```

2. In **NoviceView** create the state object and create an empty array to hold the server response

```javascript
constructor(props)
{
    super(props);
    this.state={
        Novice:[]
    }
}
```
3. Make a call to the server to get the data
```javascript
componentDidMount()
{
  axios.get('http://88.200.63.148:5000/novice')
  .then(response=>{
      console.log(response.data)
    this.setState({
      Novice:response.data
    })
  })
}
```
- *componentDidMount* is part of the life cycle of ***React.js*
- Notice that we are using axios and the *get* method to access the *'/novice'* endpoint
- As we are working with asynchronous requests we can use the method *.then*
- Once there is a response we access to the data object.
- We are using **setState** from **React.js** to put the data in the local state

4. In the **render** method create a variable data that stores what is contained in *Novice* from the local state.

```javascript
let data=this.state.Novice
```

5. Replace the old code from return with this:
```javascript
<div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:"10px"}}>
    {data.length > 0 ?
        data.map((d)=>{
            return(
                <div className="col" key={d.id}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{d.title}</h5>
                        <p className="card-text">{d.slug}</p>
                    </div>
                    <button style={{margin:"10px"}}  className="btn btn-primary bt">Read more</button>
                </div>
                </div>
                )
            })
             :"Loading..."}
        </div>
```
- We are using the ternary operator (**?**) to make a conditional rendering
- If there is data, then we map each item using those wrapping tags

6. If you did everything ok, you should be able to see the news from our data base.

### Proxy

1.<strike> Go to the *package.json* from our *client-dev* app and insert the rule for the proxy 

```javascript
"proxy":"http://88.200.63.148:5000"
```
2. Now fix the **NoviceView** and change the axios enpoint for *'/novice'*
- From now on we won't need to specify the whole URL</strike> 


### Client logic

I want to let you know that many things in this next section can be improve in many ways, but as we are triying ot learn we will follow the long/naive path. So this section will be subdivided into:

- Single news
- Add news 
- Sign in
- Login
- Using cookies and express-session


#### Single news
So far we have the view all the news available on the db. Each of  them is sent from the server with the corresponding id, so it will be easy to make a request to the server and get an specific **novica**. However remember that each component (NoviceView and SingleNovicaView) are children of the App.js component. So how can we share data between children? 

To address this question, let's make the following:

1. In **NoviceView** insert this function/method:
```javascript
QSetViewInParent=(obj)=>{
    this.props.QIDFromChild(obj)
}
```

- Pay attention to *this.props.QIFromChild(obj)*. It is injecting and object as a parameter.

2. In the *button* of this component add an onClick prop and call the previous declared method
```javascript
onClick={()=>this.QSetViewInParent({page:"novica", id: d.id})} 
```
- Every time the user clicks on the button of the mapped novica, we pass as an object  that identifies the view we want to render and also the id of that view

3. Go to **App.js** and add **Novica** key to our local state object and use the default value 1:
```javascript
this.state={
    this.state={
     CurrentPage:"home",
     Novica:1,
   }
}
```

4. In the QSetView method also insert the key but passing the id.
```javascript
QSetView=(obj)=>
{
  this.setState({
    CurrentPage:obj.page,
    Novica:obj.id || 0
  })
}
```

5. Now add to ***SingleNovicaView* the following prop:

```javascript
<SingleNovicaView data={state.Novica}  QIDFromChild={this.QSetView}/>
```

- data prop is used to assing the current id that comes from a callback from **NoviceView**
- QIDFromChild porp is used as callback to set "novice" page

6. In **SingleNovica.js** import axios
```javascript
import axios from 'axios'
```

7. Add novica key to the local state of this component (default value empty object)
```javascript
constructor(props)
{
    super(props);
    this.state={
        novica:{}
    }
}
```

8. Use *componentDidMount* method to start the get request.
```javascript
componentDidMount()
{
axios.get("/novice/"+this.props.data)
.then(response =>{
    console.log(response.data)
    this.setState({
        novica:response.data
    })
})
}

```

9. Check that you have the callback to pass data to the parent:
```javascript
QSetViewInParent=(obj)=>
{
    this.props.QIDFromChild(obj)
}
```
10. Replace the content of render method for this
```javascript
let novica= this.state.novica
    return(
    <div className="card" style={{margin:"10px"}}>
       {novica.length>0 ?
        <div>
            <h5 className="card-header">{novica[0].title}</h5>
            <div className="card-body">
            <h5 className="card-title">{novica[0].slug}</h5>
            <p className="card-text">{novica[0].text}</p>
            <button onClick={()=>this.QSetViewInParent({page:"novice"})}  className="btn btn-primary">Return news</button>
            </div>
        </div>
       :"Loading..."}
    </div>
    )
}
```

10. Well done!! We are able to retrieve one single new from our list of news. 


#### Add news

1. Open ***AddNovicaView.js*** and import axios
2. Add a constructor and define a property named **novica** of type object into the local state.
```javascript
constructor(props){
  super(props)
  this.state={
    novica:{}
  }
}
```
3. Add to everyinput tag the atttribute name and assign the corresponding value, for example:
```javascript
<input name="title" type="text" class="form-control"  placeholder="Title..."/>
```

4. Create a method that gets the text from each input field and stores the current value in the local state.
```javascript
QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        novica:{...prevState.novica,[e.target.name]:e.target.value}
        }))
    }
```
- We could actually create an independent method for each input element
- But this approach is more generic and reduces the code complexity

5. Add the prop on change to each input elememnt in out JSX
```javascript
<input name="title" onChange={(e)=>this.QGetTextFromField(e)}
 type="text" class="form-control"  placeholder="Title..."/>
```
- Now we are able to get the content of each field
6. Create a method that every time user click the button *Submit*, it posts the content of the local state to the data base.

```javascript
QPostNovica=()=>{
  axios.post('/novice',{
    title:this.state.novica.title,
    slug:this.state.novica.slug,
    text:this.state.novica.text
  })
  .then(response=>{
    console.log("Sent to server...")
  })
  .catch(err=>{
    console.log(err)
  })
}
```
7. Add the newly created method the button element from out JSX
```javascript
<button onClick={()=>this.QPostNovica()} className="btn btn-primary bt" style={{margin:"10px"}}>Send</button>
```
- If you pay attention, it would be much beterr to implement the logic to check if the data that is intended to be submitted is complete or not in the client side.
- Let's follow a simliar approach in Signup and Login views

#### Sign in
1. Open ***SignupView.js*** and import axios
2. Add a constructor and define a property named **user** of type object into the local state
```javascript
 constructor(props)
    {
        super(props);
        this.state={
            user:{
                type:"signup"
            }
        }
    }
```
3. Add to every input tag the atttribute name and assign the corresponding value, for example:
```javascript
<input name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
```

4. Create a method that gets the text from each input field and stores the current value in the local state.
```javascript
QGetTextFromField=(e)=>{
    this.setState(prevState=>({
        user:{...prevState.user,[e.target.name]:e.target.value}
        }))
    }
```
- Looks similar to something we did before?
5. Add the prop on change to each input elememnt in out JSX

```javascript
<input onChange={(e)=>this.QGetTextFromField(e)} name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
```
- Now we are able to get the content of each field
6. Create a method that every time user click the button *Submit/Send*, it posts the content of the local state to the data base.

```javascript
QPostSignup=()=>{
  axios.post('/users/register',{
    username:this.state.user.username,
    email:this.state.user.email,
    password:this.state.user.password
  })
  .then(response=>{
    console.log("Sent to server...")
  })
  .catch(err=>{
    console.log(err)
  })
}
```
7. Add the newly created method the button element from out JSX
```javascript
<button onClick={()=>this.QPostSignup()} className="btn btn-primary bt" style={{margin:"10px"}}>Send</button>
```
- Same case as before, it woul be a nice idea to revise the data in teh client side before submit it

#### Using cookies and express-session
 For login, we have to repeat same step 1-7 from previous views(AddNovicaView and SignupView). But as you might notice, if we refresh the browser our session will expire, but moreover non of the other react components know tha we are logged in the app. To solve this issue let's:

 1. In the server side install:
 ```console
npm install cookie-parser express-session
```
2. Import the cookie-parser in the ***index.js*** from our server and define the default settings
 ```javascript
const cookieParser=require("cookie-parser")

app.use(express.urlencoded({extended : true}));
app.use(cookieParser("somesecret"))
 ```

3. Go to ***users.js*** and import express-session and the define the following settings:
server and define the default settings
 ```javascript
const session = require("express-session")


users.use(session({
  secret:"somesecret",
  resave:false, 
  saveUninitialized:false,
  cookies:{
      expires:60*2
  }

}))
 ```

4. Create a new endpoint get for login and insert the follwing logic
 ```javascript

users.get('/login',(req,res)=>{
   if(req.session.user) 
   {
   res.send({
        logged:true,
        user:req.session.user
    })

   }
   else
   {
       res.send({logged:false})
   }
})
 ```

5. In client-side, open **app.js** and using *componentDidMount()* in-built function make a call to the new enpoint, so we get inforamtion about wheter the user is logged or not. 
 ```javascript
componentDidMount(){
  axios.get('/users/login')
  .then(response=>{
    console.log(response)
  })
}
 ```



6. In ***LoginView.js*** update the post response so the user data can be caught by the **App.js***
```javascript
   QPostLogin=()=>{
        axios.post('/users/login',{
          username:this.state.user.username,
          password:this.state.user.password
        },{withCredentials:true})
        .then(response=>{
          console.log("Sent to server...")
          this.QSendUser2Parent(response.data[0])
        })
        .catch(err=>{
          console.log(err)
        })
      }
```

7. Implement the following method to pass the object the response to the parent
```javascript
 QSendUser2Parent=(obj)=>{
    this.props.QUserFromChild(obj)
  } 

```

8. In ***App.js*** add the corresponding prop to *LogingView* component to receive the call back and set in the local state the user status.

```javascript
<LoginView QUserFromChild={this.QSetUser}/>
```
9. Create the method to set the local state, so we dont need to refresh the page:
 ```javascript
QSetUser=(obj)=>{
  this.setState({
    userStatus:{logged:true,user:[obj]}
  })
}
```
- we are customizing the response so it matches with the one we defined in the server side

10. In componentDidMouth method update make get call to our api to check if we are logged. 
 ```javascript
componentDidMount(){
  axios.get('/users/login')
  .then(response=>{
    console.log(response)
    this.setState({userStatus:response.data})

  })
}
 ```
 - componentDidMoint is called just once at the beginign of the render, so this will be helpful is someone refreshes the page


11. For you to practice...
- Once logged in, change the view  to AddNovicaView
- Make a conditional render for a logout button ang logout the session





Finally, if you are reading this last lines, let me congratulate you. You have finished our set of tutorials. Thank you for following me these weeks. 

See you around!! and don't forget to submit.
- *There will be extra poitn for those who manage to complete step 11 of this las section.*
- *Be aware that our project  is not ready for production,  there a few more steps to implement in order to achieve this.*
