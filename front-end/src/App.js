// import libraries
import {Component} from "react";

// import configurations
import {HOME, ABOUT,NOVICE, ADDNEW, SIGNUP, LOGIN, NOVICA } from "./Utils/Constants";

// import local components
import HomeView from "./CustomComponents/HomeView";
import AboutView from "./CustomComponents/AboutView";
import NoviceView from "./CustomComponents/NoviceView";
import AddNovicaView from "./CustomComponents/AddNovicaView";
import SignupView from "./CustomComponents/SignupView";
import LoginView from "./CustomComponents/LoginView";
import SingleNovicaView from "./CustomComponents/SingleNovicaView";


/**
 * The main application component.
 *
 * This component serves as the entry point for the application and manages the state
 * related to the current page and other properties.
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: HOME,
      novica:1,
    };
  }

  QGetView = (obj) => {
    const page = obj.currentPage;
    switch (page) {
      case ABOUT:
        return <AboutView />;
      case NOVICE:
        return <NoviceView QIDFromChild={this.QSetView}/>;
      case ADDNEW:
        return <AddNovicaView />;
      case SIGNUP:
        return <SignupView />;
      case LOGIN:
        return <LoginView QUserFromChild={this.QSetUser}/>;
      case NOVICA:
        return <SingleNovicaView  data={obj.Novica}  QIDFromChild={this.QSetView}/>;
      default:
        return <HomeView />;
    }
  };

  QSetView = (obj) => {
    this.setState({ 
      currentPage: obj.page,
      Novica:obj.id || 0
    });
  };

  QSetUser=(obj)=>{
    // TODO: Adapt this function to your use case.
    this.setState({
      userStatus:{logged:true,user:[obj]}
    })
   }
   

  render() {
    return (
      <div id="APP" className="container">
        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a onClick={() => this.QSetView({ page: HOME })}
                 className="navbar-brand"
                 href="#" >
                Home
              </a>
              <button className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse"
                   id="navbarSupportedContent" >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a onClick={() => this.QSetView({ page: ABOUT })}
                       className="nav-link "
                       href="#" >
                      About
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => this.QSetView({ page: NOVICE })}
                       className="nav-link "
                       href="#">
                      News
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => this.QSetView({ page: ADDNEW })}
                       className="nav-link" >
                      Add news
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => this.QSetView({ page: SIGNUP })}
                       className="nav-link "
                       href="#" >
                      Sign up
                    </a>
                  </li>

                  <li className="nav-item">
                    <a onClick={() => this.QSetView({ page: LOGIN })}
                       className="nav-link "
                       href="#" >
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="viewer" 
             className="row container">
          {this.QGetView(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
