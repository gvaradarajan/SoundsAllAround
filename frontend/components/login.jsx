var React = require('react');
var Modal = require('react-modal');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var Login = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { email: "", password: "", modalIsOpen: false };
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;
    var credentials = { user: { email: this.state.email,
                                password: this.state.password } };
    ApiUtil.login(credentials, function(id) {
      router.push("/users/" + id);
    });
  },
  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },
  signInAsGuest: function (e) {
    e.preventDefault();

    var router = this.context.router;
    var credentials = { user: { email: "guest@whatever.nope",
                                password: "iamtheguest" } };
    ApiUtil.login(credentials, function(id) {
      router.push("/users/" + id);
    });
  },
  render: function() {
    return (
      <section>
        <h1 className="sign-in page-header">Sign In</h1>
        <form className="sign-in cred-form">
          <label className="email label" htmlFor="email">
            Email
          </label>
          <input onChange={this.updateEmail} className="email field"
            type="text" name="user[email]" value={this.state.email} />

          <label className="password label" htmlFor="password">
            Password
          </label>
          <input onChange={this.updatePassword} className="password field"
            type="password" name="user[password]" value={this.state.password} />

          <input className="submit-button"
            type="submit" value="Sign In" onClick={this.handleSubmit}/>
        </form>

        <button className="submit-button" onClick={this.signInAsGuest}>Guest</button>
      </section>
    );
  }

});

module.exports = Login;
