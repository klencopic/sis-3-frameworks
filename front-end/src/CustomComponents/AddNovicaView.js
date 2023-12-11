import {Component} from "react";
import axios from "axios";
import { API_URL } from "../Utils/Configuration";

/**
 * The AddNovicaView component provides a form for users to add a new novica (news or article).
 *
 * @class AddNovicaView
 * @extends {React.Component}
 */
class AddNovicaView extends Component{
    constructor(props){
        super(props)
        this.state={
          novica:{}
        }
      }
    
    QGetTextFromField=(e)=>{
        /// We should avoid sending request that are incomplete
    this.setState(prevState=>({
        novica:{...prevState.novica,[e.target.name]:e.target.value}
        }))
    }
    
    QPostNovica=()=>{
        axios.post( API_URL + '/novice',{
          title:this.state.novica.title,
          slug:this.state.novica.slug,
          text:this.state.novica.text
        })
        .then(response => {
            // You should handle a bad response as well
          console.log("Sent to server...")
        })
        .catch(err=>{
          // handle error; which is not the same as  a bad response
          console.log(err)
        })
    }
      

    render(){
        console.log(this.state.novica)
        return(
            <div className="card" 
                style={{margin:"10px"}}>
                <h3 style={{margin:"10px"}}>Welcome user</h3>
                <div className="mb-3" 
                    style={{margin:"10px"}}>
                    <label  className="form-label">Title</label>
                    <input type="text"
                        name="title"
                        onChange={(e)=>this.QGetTextFromField(e)}
                        className="form-control"  
                        placeholder="Title..."/>
                </div>
                <div className="mb-3" 
                    style={{margin:"10px"}}>
                    <label  className="form-label">Slug</label>
                    <input type="text" 
                        name="slug"
                        onChange={(e)=>this.QGetTextFromField(e)}
                        className="form-control" 
                        placeholder="Slug..."/>
                </div>
                <div className="mb-3"
                    style={{margin:"10px"}}>
                    <label  className="form-label">
                        Text
                    </label>
                    <textarea className="form-control"
                              onChange={(e)=>this.QGetTextFromField(e)}
                              name="text"
                              rows="3">
                    </textarea>
                </div>
                <button className="btn btn-primary bt"
                        onClick={()=>this.QPostNovica()}
                        style={{margin:"10px"}}>
                    Send
                </button>
            </div>
        )
    }
}

export default AddNovicaView