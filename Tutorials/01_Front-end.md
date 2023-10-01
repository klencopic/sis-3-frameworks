
# Front-end using ReactJS

## Basic
1. Install react using npx 

``` console
    npx create-react-app name-of-your-app
```
-in my case I have installed my app in the root folder of my CMS project and I have named it: client-dev

2. If react was succcesfully installed you will see something like this in your console:
<img src="./assets/ReactInstalled.png" width="500" alt="accessibility text">

3. Now let's navigate into the client-dev and type in the console
``` console
    npm start
```
- To see the result, simply type in your browser http://localhost:3000, if you are runnin this remotely then you will have to put the ip address you want to reach, for example: http://88.200.63.148:3000. 

- So far we have to diffetent address: one for the server in the port 5000 and the second one in the client in the port 3000. We will keep this like thtat for now. At the end fo the projects things will be a littel bit different.

- The structure of the folder must be something like this:
<img src="./assets/client-folders.png" width="500" alt="accessibility text">

- We are interested in the folder that is named *src*, because there is where the logic of the *front-end* will happen.

4. In Visual Code open the file *App.js* and delete all the content.
- This is because we won't use *hooks* for this project, instead we will implement OOP.
- Try to save and you will see in your browser that React returns an error.

5. In line number one write the name of the dependencies we need
``` javascript 
    import React from
```
6. Then create an empty class App that extends from React.Component
``` javascript 
    class App extends React.Component{}
```
- Remeber to check the documentation every time you can to know about the methods and life cycle of the component :)

7. In the body of the class let's call the render method. 
``` javascript 
    class App extends React.Component
    {
        render()
        {
            ///Here we should put what  we wan to display in the browser, for example
            return "Hola mundo!!"
        }
    }
```
- if you save, we still will  have an error inthe browser since we haven't export our class object yet.
8. Export your class at the end of the code
``` javascript 
export default App
```
- After saving, you will see how the browser displays our string.
-  Let's make somthing more fancy by introducing a new concept: JSX <https://reactjs.org/docs/introducing-jsx.html>. 

## Visuals
1. Instead of returning an string, let's implement the following. 
``` javascript 
return(

 <div id="APP" className="container">

        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a className="nav-link " href="#">About</a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link "  href="#">News</a>
                    </li>
                      
                    <li className="nav-item">
                      <a className="nav-link">Add news</a>
                    </li>

                    <li className="nav-item"> 
                      <a className="nav-link " href="#">Sign up</a>
                    </li>

                    <li className="nav-item" >
                      <a className="nav-link "  href="#">Login</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
        </div>

        <div id="viewer" className="row container">

        </div>

    </div>

)
```
- Save and visualize the outcome (sometimes you need to reaload the webpage to see the result)
- The structure of our simple CMS is there, it has a *div* dedicated for the menu and a *div* for the viewer. As you can observer, I have already declared some classes for the style, currently they are unactive since we have not attached the framework to our app. Such classes come from a framework named, [Bootstraps](https://getbootstrap.com/docs/5.1/getting-started/introduction/). You can learn more about them in the official web page.


2. Open *index.html* that is located in the *public* folder. Inside the tag *head* copy and paste the following tag:

```HTMl
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
```
- Then, inside *body* tag copy and paste:

```HTMl
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
```
- if you reload your porject you should be able to get a nav bar tha look more or less like this

<img src="./assets/navbar.png" width="500" alt="accessibility text"/>

- Notice that html attributes/props follow a different syntax in JSX. For example: 

``` HTML
    <li onclick="" style="float:right"><a href="#about">Login</a></li>
```
- In JSX will be

``` JSX
    <li onClick="" style={{float:"right"}}><a href="#">Login</a><li>
```

3. Copy and paste the following piece of code inside the *div* tag with *id* *viewer* 
``` JSX
{/* Home*/} 
<div className="card" style={{margin:"10px"}}>
  <div className="card-body">
    <h5 className="card-title">Welcome!!!</h5>
    <p className="card-text">You are in hte home page</p>
  </div>
</div>

{/* About*/} 
<div className="card" style={{margin:"10px"}}>
  <div className="card-body">
    <h5 className="card-title">About us</h5>
    <p className="card-text">Do you really want to know about us? </p>
  </div>
</div>

{/* News*/} 
 <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:"10px"}}>
  <div className="col">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">Slug</p>
      </div>
      <button style={{margin:"10px"}}  className="btn btn-primary bt">Read more</button>
    </div>
  </div>
</div>

{/* Single new*/} 
<div className="card" style={{margin:"10px"}}>
  <h5 className="card-header">Featured</h5>
    <div className="card-body">
      <h5 className="card-title">Special title treatment</h5>
      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <button onClick={()=>this.QSetViewInParent({page:"novice"})}  className="btn btn-primary">Return news</button>
    </div>
</div>


{/* Create new*/} 
<div className="card" style={{margin:"10px"}}>
  <h3 style={{margin:"10px"}}>Welcome user</h3>
  <div className="mb-3" style={{margin:"10px"}}>
    <label  className="form-label">Title</label>
    <input type="text" class="form-control"  placeholder="Title..."/>
  </div>
  <div className="mb-3" style={{margin:"10px"}}>
    <label  className="form-label">Slug</label>
    <input type="text" class="form-control"  placeholder="Slug..."/>
  </div>
  <div class="mb-3" style={{margin:"10px"}}>
    <label  class="form-label">Text</label>
    <textarea class="form-control" rows="3"></textarea>
  </div>
  <button  className="btn btn-primary bt" style={{margin:"10px"}}>Send</button>
</div>

{/* Signup*/} 
<div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
  <form style={{margin:"20px"}} >
    <div className="mb-3">
      <label className="form-label">Username</label>
      <input name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
      <label className="form-label">Email address</label>
      <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
      </div>
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
    </div>
  </form>
  <button style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
</div>
{/* Login*/} 

 <div className="card" style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
  <form style={{margin:"20px"}} >
    <div className="mb-3">
      <label className="form-label">Username</label>
      <input name="username"  type="text" className="form-control" id="exampleInputEmail1"/>
    </div>
    <div className="mb-3">
      <label className="form-label">Password</label>
      <input name="password" type="password" className="form-control" id="exampleInputPassword1"/>
    </div>
  </form>
  <button  style={{margin:"10px"}} className="btn btn-primary bt">Sign up</button>
</div>
```
- Save and reload and you will see how all the view of every seccion will look.
- Our code is gettin a little bit complicated and handle it properly will get hard. So let's make each view of the viewer a *Component* so we can make our code a little bit more modular.

4. In *src* folder create a new folder and name it ***CustomComponent***

5. Inside ***CustomComponent*** create 7 empty javascritp documents. You can name them as you wish but to folllow this tutorial I recommend you to assig these names:

<img src="./assets/folderStructure.png" width="500" alt="accessibility text"/>

6. Open ***HomeView.js***, import react, create a class. In the render method return the *div* block that corresponds to that view.
```javascript
import React from 'react'

class HomeView extends React.Component
{
  render()
  {
    return(
    {/* Home*/} 
    <div className="card" style={{margin:"10px"}}>
      <div className="card-body">
        <h5 className="card-title">Welcome!!!</h5>
        <p className="card-text">You are in the home page</p>
      </div>
    </div> 
    )
  }
}
```
- Finally, to our app to be able to use this file/component in ***app.js***, insert this line at the end
```javascript
export default HomeView

```
- ***Repeat this procedure for every view***

7. In ***app.js***, import our custom components.
```javascript
//Import CustomComponents
import NoviceView from './CustomComponents/NoviceView';
import HomeView from './CustomComponents/HomeView';
```
8. After fully completed step 6 and 7, delete all content between the *div* with the *id* *viewer*. Instead place ***one*** of the custom compoentes we have created.
```javascript
<div id="viewer" className="row container">
  <HomeView />
</div>
```
9. Save and reload. Are you able to see the content of the compoment? If yes, you can continue to the next part of the tutorial;  otherwise check what are you missing from the previous steps.


## User interactions

Now it's time to prepare the application to be ready to receive data and handle users input data. 

In this session we will do the logic for i) the menu, so the app know what CustomComponent to show, ii) the forms, so the app stores locally th data to be send.  

1. In ***app.js**  let's define our constructor and on it let's define an object and name it state.

```javascript
///The constructor of our app.
constructor(props)
 {
   super(props);
   //state is where our "global" variable will be store
   this.state={
   }
 } 
```
- *state* is an object that that will store all the information of our app
2. In *state* object create the key *CurrentPage* and give the default value of *"home"*

3. Create a method that receives the *state* as paramenter and returns a *view* 
```javascript

 QGetView=(state)=>
 {
   let page = state.CurrentPage

    switch(page)
    {  
      case "home":
        return <HomeView/> 
      case "about":
        return <AboutView/>
      case "novice": 
        return <NoviceView/>
      case "addnew":
        return <AddNovicaView/>
      case "signup":
        return <SignupView />
      case "login":
        return <LoginView />
      case "novica":
        return <SingleNovicaView />
    
    }
 }
```
4. In the tag of id *viewer*, replace any content with the following content:
```javascript
<div className="row container">
  {this.QGetView(this.state)}
</div>
```
- So far not too much has change, we still should be able to see the content of *HomeView* component as it is the defaul value

5. Use the following piece of code
```javascript
QSetView=(obj)=>
{
  this.setState({
    CurrentPage:obj.page
  })
}
```
- This is a custom method that gets an object as parameter and every time it is invoked, it calls a in-build method form react to update the *state* of our app
- In this case we are updating the *CurrenPage* and we are assignin the value of the property *page*

6. To each *a* tag in our ***app.js*** add an onClick attribute and call the method we created in previous step

```javascript
<a  onClick={()=>this.QSetView({page:"home"})} className="navbar-brand" href="#">Home</a>
```
- every button should set a different string
- what string should we pass to the method? the ones that QGetView is expecting
- We almost finish with the conditional rendering, we are just missing to implement the one that show a  single new every time we press in *Read more* from *NoviceView* component. 

7. In the *QGetView* modify *NoviceView* so it look like this:

```javascript
<NoviceView QIDFromChild={this.QSetView}/>
```
- As you may remeber, you can assign prop to any react component.
- Our prop in this case will receive a value fromthe child and we will invoke the *QSetView* method to define the view

8. Open ***NoviceView.js*** and add this constructor and method:

```javascript

QSetViewInParent=(obj)=>{
    this.props.QIDFromChild(obj)
}
```

- To the button add the method we have created and pass as page the value *novica*

```javascript
<button onClick={()=>this.QSetViewInParent({page:"novica"})} style={{margin:"10px"}}  className="btn btn-primary bt">Read more</button>
```

- Later on we will update the object we are sending with the id of  the new we are clicking on
- Repeat step 7 and 8 for ***SingleNovicaView***

9. In the *QGetView* modify *SignupView* so it look like this:

```javascript
<SignupView QUserFromChild={this.QHandleUserLog}/>
```

10. Open ***SingleupView.js*** and add this constructor and methods:

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
    QGetTextFromField=(e)=>{
        this.setState(prevState=>({
            user:{...prevState.user,[e.target.name]:e.target.value}
        }))
    }
    
    QSentUserToParent=()=>{
        this.props.QUserFromChild(this.state.user)
    }

```

- To each input tag  add an *onChage* prop and call our *QGetTextFromField* like this.

```javascript
<input onChange={(e)=>this.QGetTextFromField(e)} name="username" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
```

- As you can obsever, everytime an user types in the keyboar the local state is updated in a property given by the name of the input
- Notice that the user object already contains a property *type* with a default value of *signup*

- Modify the button of this component so it can invoke our *QSentUserToParent*

```javascript
<button onClick={()=>this.QSentUserToParent()} style={{margin:"10px"}}  className="btn btn-primary bt">Submit</button>
```

- Repeat step 9 and 10 for ***LoginView*** but change the default *user.type* to *login*

10. Save and reload.

- Done!!. We have finished preparing our Front-end.
- The remaining thing is to connect it with our back-end and preapre it to deploy it.

For now zip everything we have done today and submit it to e-classroom/push it to the repo.
Next session, in order to finish our project it is mandatory to finilize the back-end accordigly to the previous tutorials.



