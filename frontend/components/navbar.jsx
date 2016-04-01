var React = require('react');
var PropTypes = React.PropTypes;
var CurrentUserStore = require('../stores/current_user_store');
var ApiUtil = require('../util/api_util');

var NavBar = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { signedIn: CurrentUserStore.isLoggedIn() };
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
  makeSignInOrSignOut: function () {
    var signoutOrSignIn = "";
    if (this.state.signedIn) {
      signoutOrSignIn = (
        <li>
          <a onClick={this.beginSignOut}>Sign Out</a>
        </li>
      );
    }
    else {
      signoutOrSignIn = (
        <li>
          <a onClick={this.linkToSignIn}>Sign In</a>
        </li>
      );
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
            {this.makeSignInOrSignOut()}
          </ul>
        </nav>
      </header>
    );
  }

});

module.exports = NavBar;
