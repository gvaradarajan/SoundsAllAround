var React = require('react');
var Modal = require('react-modal');
var PropTypes = React.PropTypes;

var CurrentUserStore = require('../stores/current_user_store');

var ApiUtil = require('../util/api_util');

var Login = require('./login');
var SignUp = require('./sign_up');

var modalStyleOptions = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(255, 255, 255, 0.75)'
  },
  content : {
    position                   : 'absolute',
    width                      : '600px',
    height                     : '600px',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    margin                     : 'auto'
  }
};

var NavBar = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { signedIn: CurrentUserStore.isLoggedIn(),
             signInModalOpen: false,
             signUpModalOpen: false,};
  },
  componentWillMount: function () {
    Modal.setAppElement(document.body);
  },
  componentDidMount: function () {
    CurrentUserStore.addListener(this.toggleState);
  },
  beginSignOut: function () {
    ApiUtil.logout(function () {
      this.linkToHome();
    }.bind(this));
  },
  linkToHome: function () {
    var router = this.context.router;
    router.push("/");
  },
  openModal: function (string) {
    if (string === "Login") {
      this.setState({signInModalOpen: true});
    }
    else {
      this.setState({signUpModalOpen: true});
    }
  },
  closeModal: function (string) {
    this.setState({signInModalOpen: false, signUpModalOpen: false});
  },
  createSessionModal: function (string) {
    var check = this.state;
    var openState = string === "Login" ? check.signInModalOpen : check.signUpModalOpen;
    var component = string === "Login" ? <Login /> : <SignUp />;
    return (
      <Modal isOpen={openState}
             onRequestClose={this.closeModal.bind(this, string)}
             style={modalStyleOptions}
             closeTimeoutMS={150}>
        {component}
      </Modal>
    );
  },
  createSessionButton: function () {
    var signoutOrSignIn = "";
    if (!this.state.signedIn) {
      signoutOrSignIn = (
        <li>
          <a onClick={this.openModal.bind(this,"Login")}>Sign In</a>
          {this.createSessionModal("Login")}
        </li>
      );
    }
    else {
      signoutOrSignIn = <li><a onClick={this.beginSignOut}>Sign Out</a></li>;
    }
    return signoutOrSignIn;
  },
  createNewSessionButton: function () {
    var button = "";
    if (!this.state.signedIn) {
      button = (
        <li>
          <a onClick={this.openModal.bind(this,"SignUp")}>Sign Up</a>
          {this.createSessionModal("SignUp")}
        </li>
      );
    }
    return button;
  },
  toggleState: function () {
    this.setState({ signedIn: CurrentUserStore.isLoggedIn(), modalIsOpen: false });
  },
  render: function() {
    var welcomeMessage = "";
    var loginComp = <Login />;
    var signUpComp = <SignUp />;
    if (this.state.signedIn) {
      welcomeMessage = (
        <li><a>Welcome {CurrentUserStore.currentUser().username}!</a></li>
      );
    }
    else {

    }
    return (
      <header className="header group">
        <nav className="header-nav group">
          <h1 className="header-logo">
            <a href="/">SoundsAllAround</a>
          </h1>
          <ul className="nav-bar group">
            {welcomeMessage}
            {this.createNewSessionButton()}
            {this.createSessionButton()}
          </ul>
        </nav>
      </header>
    );
  }

});

module.exports = NavBar;
