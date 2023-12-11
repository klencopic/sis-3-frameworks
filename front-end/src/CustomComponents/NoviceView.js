import {Component} from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import {API_URL} from "../Utils/Configuration";
import { NOVICA } from "../Utils/Constants";

/**
 * The NoviceView component displays a list of novices fetched from a remote API.
 *
 * @class NoviceView
 * @extends {React.Component}
 */
class NoviceView extends Component{   
    constructor(props)
    {
        super(props);
        this.state={
            novice:[]
        }
    }
    
    /**
   * Callback function to pass selected novice details to the parent component.
   *
   * @param {Object} obj - The selected novice object.
   */
    QSetViewInParent=(obj)=>{
        this.props.QIDFromChild(obj)
    }

    /**
   * Lifecycle method invoked after the component has been added to the DOM.
   * Fetches novice data from a remote API and updates the component state.
   */
    componentDidMount()
    {
        axios.get( API_URL + '/novice')
        .then(response=>{
            // TODO: We asume  that the response data is an array of novice objects
            // and that will allways return a  successfull response; you should handle the error case as well
            console.log(response.data)
            this.setState({
            novice:response.data
            })
        })
        .catch(error=>{
            // handle error
            console.log(error);
        })
    }

      /**
   * Renders the NoviceView component.
   *
   * @returns {JSX.Element} The rendered JSX element containing the list of novices.
   */
    render(){
        // TODO: We are rendering every single item from the database; maybe we should limit the number of items or use pagination.
        const items=this.state.novice
        return(
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{margin:"10px"}}>
              {items.length > 0 ?
                items.map((item)=>{
                    return(
                        <div className="col" key={item.id}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{item.title}</h5>
                                    <p className="card-text">{item.slug}</p>
                                </div>
                                <button onClick={()=>this.QSetViewInParent({page: NOVICA, id: item.id})} 
                                        style={{margin:"10px"}}  className="btn btn-primary bt">Read more</button>
                            </div>
                        </div>
                        )
                    })
             :"Loading..."}

            </div>
        )
    }
}

/**
 * PropTypes for the NoviceView component.
 * @property {Function} QIDFromChild - Callback function to pass selected novice details to the parent component.
 */
NoviceView.propTypes = {
    QIDFromChild: PropTypes.func.isRequired
}
  
export default NoviceView