import {Component} from "react";

/**
 * The AboutView component displays information about the application or a specific section.
 *
 * @class AboutView
 * @extends {React.Component}
 */
class AboutView extends Component{
    render(){
        return(
            <div className="card" 
                style={{margin:"10px"}}>
                <div className="card-body">
                    <h5 className="card-title">About us</h5>
                    <p className="card-text">Do you really want to know about us? </p>
                </div>
            </div>
        )
    }
}

export default AboutView