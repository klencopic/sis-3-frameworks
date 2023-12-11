import {Component} from "react";

/**
 * The HomeView component displays a welcome message on the home page.
 *
 * @class HomeView
 * @extends {React.Component}
 */
class HomeView extends Component{
    render(){
        return(
            <div className="card" style={{margin:"10px"}}>
                <div className="card-body">
                    <h5 className="card-title">Welcome!!!</h5>
                    <p className="card-text">You are in the home page</p>
                </div>
            </div>
        )
    }
}

export default HomeView