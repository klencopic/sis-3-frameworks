import {Component} from "react";
import PropTypes from 'prop-types';
import axios from 'axios'

import {API_URL} from "../Utils/Configuration";
import { NOVICE } from "../Utils/Constants";


/**
 * The SingleNovicaView component provides a form for users to sign up.
 *
 * @class SingleNovicaView
 * @extends {React.Component}
 */
class SingleNovicaView extends Component{
    constructor(props){
        super(props);
        this.state={
            novica:{}
        }
    }

    QSetViewInParent=(obj)=>{
        this.props.QIDFromChild(obj)
    }

    componentDidMount(){
        axios.get(API_URL + "/novice/" +this.props.data)
        .then(response =>{
            // TODO: What should we do with the response data if wrong?
            console.log(response.data)
            this.setState({
                novica:response.data
            })
        })
        .catch(error=>{
            // TODO:  handle error
            console.log(error); 
        })
    }


    render(){
        const novica= this.state.novica
        return(
        <div className="card" style={{margin:"10px"}}>
           {novica.length>0 ?
            <div>
                <h5 className="card-header">{novica[0].title}</h5>
                <div className="card-body">
                <h5 className="card-title">{novica[0].slug}</h5>
                <p className="card-text">{novica[0].text}</p>
                <button onClick={()=>this.QSetViewInParent({page: NOVICE})}  className="btn btn-primary">Return news</button>
                </div>
            </div>
           :"Loading..."}
        </div>
        )
    }
}

SingleNovicaView.propTypes = {
    QIDFromChild: PropTypes.func.isRequired,
    data: PropTypes.number.isRequired
}
  
export default SingleNovicaView