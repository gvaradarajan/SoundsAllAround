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
  toggleState: function () {
    this.setState({ signedIn: CurrentUserStore.isLoggedIn()});
  },
  render: function() {
    var welcomeMessage = "";
    var signoutOrSignIn = "";
    if (this.state.signedIn) {
      welcomeMessage = (
        <li>Welcome {CurrentUserStore.currentUser.username}!</li>
      );
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
    return (
      <ul>
        {welcomeMessage}
        {signoutOrSignIn}
      </ul>
    );
  }

});

module.exports = NavBar;
