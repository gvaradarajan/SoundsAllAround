var React = require('react');
var Modal = require('react-modal');
var PropTypes = React.PropTypes;

var CurrentUserStore = require('../stores/current_user_store');

var ApiUtil = require('../util/api_util');

var Login = require('./login');

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
    return { signedIn: CurrentUserStore.isLoggedIn(), modalIsOpen: false };
  },
  componentWillMount: function () {
    Modal.setAppElement(document.body);
  },
  componentDidMount: function () {
    CurrentUserStore.addListener(this.toggleState);
  },
  beginSignOut: function () {
    ApiUtil.logout(function () {
      this.linkToSignIn();
    }.bind(this));
  },
  linkToSignIn: function () {
    var router = this.context.router;
    router.push("/login");
  },
  openModal: function () {
    this.setState({modalIsOpen: true});
  },
  closeModal: function () {
    this.setState({modalIsOpen: false});
  },
  createSessionModal: function () {
    return (
      <Modal isOpen={this.state.modalIsOpen}
             onRequestClose={this.closeModal}
             style={modalStyleOptions}
             closeTimeoutMS={150}>
        <Login />
      </Modal>
    );
  },
  createSessionButton : function () {
    var signoutOrSignIn = "";
    if (!this.state.signedIn) {
      signoutOrSignIn = (
        <li>
          <a onClick={this.openModal}>Sign In</a>
          {this.createSessionModal()}
        </li>
      );
    }
    else {
      signoutOrSignIn = <li><a onClick={this.beginSignOut}>Sign Out</a></li>;
    }
    return signoutOrSignIn;
  },
  toggleState: function () {
    this.setState({ signedIn: CurrentUserStore.isLoggedIn()});
  },
  render: function() {
    var welcomeMessage = "";

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
            <a href="#">SoundsAllAround</a>
          </h1>
          <ul className="nav-bar group">
            {welcomeMessage}
            {this.createSessionButton()}
          </ul>
        </nav>
      </header>
    );
  }

});

module.exports = NavBar;
