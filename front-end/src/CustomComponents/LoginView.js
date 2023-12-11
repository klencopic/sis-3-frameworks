import {Component} from "react";
import axios from "axios";
import PropTypes from 'prop-types';


import { API_URL } from "../Utils/Configuration";
import { LOGIN } from "../Utils/Constants";

/**
 * The LoginView component provides a form for users to log in.
 *
 * @class LoginView
 * @extends {React.Component}
 */
class LoginView extends Component{
  /// This implementation should be changed to match your use case.
  constructor(props){
      super(props);
      this.state={
          user:{
              type:LOGIN
          }
      }
  }


QGetTextFromField=(e)=>{
  this.setState(prevState=>({
      user:{...prevState.user,[e.target.name]:e.target.value}
  }))
}

QPostLogin=()=>{
  // TODO: you should validate the data before sending it to the server,
  // also think about the security of the data; right now we are sending it as plain text
  axios.post(API_URL + '/users/login',
  {
    username:this.state.user.username,
    password:this.state.user.password
  })
  .then(response=>{
    console.log("Sent to server...")
    console.log(response.status)
    if(response.status === 200){
      console.log(response.data)
      this.props.QUserFromChild(response.data)
    }else if(response.status === 204){
      // Request was processed but user is not registered, or credentials are incorrect, do something.
      console.log("Request was ok but something with user data is no correct")
    }else{
      console.log("Something is really wrong, DEBUG!")
    }

  })
  .catch(err=>{
    console.log(err)
  })
}    


render(){
  console.log(this.state.user)
    return(
        <div className="card" 
              style={{width:"400px", marginLeft:"auto", marginRight:"auto", marginTop:"10px", marginBottom:"10px"}}>
          <form style={{margin:"20px"}} >
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input name="username" 
                    onChange={(e)=>this.QGetTextFromField(e)}
                    type="text" 
                    className="form-control" 
                    id="exampleInputEmail1"/>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input name="password" 
                      onChange={(e)=>this.QGetTextFromField(e)}
                      type="password"  
                      className="form-control" 
                      id="exampleInputPassword1"/>
            </div>
          </form>
          <button style={{margin:"10px"}} 
                  onClick={()=>this.QPostLogin()}
                  className="btn btn-primary bt">Sign up</button>
        </div>
    )
}
}
LoginView.propTypes = {
  QUserFromChild: PropTypes.func.isRequired,
}

export default LoginView