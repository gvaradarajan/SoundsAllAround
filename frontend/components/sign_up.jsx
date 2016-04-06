var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var SignUpForm = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { username: "", email: "", password: "", imageUrl: "", imageFile: "" };
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;
    // var credentials = { user: this.state };
    var credentials = new FormData();
    credentials.append("user[username]", this.state.username);
    credentials.append("user[email]", this.state.email);
    credentials.append("user[password]", this.state.password);
    credentials.append("user[image]", this.state.imageFile);

    ApiUtil.createNewUser(credentials, function(id) {
      router.push("/users/" + id);
    });
  },
  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },
  updateUsername: function(e) {
    this.setState({ username: e.currentTarget.value });
  },
  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },
  updateImage: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function () {
      this.setState({ imageUrl: reader.result, imageFile: file });
    }.bind(this);
    reader.readAsDataURL(file);
  },
  render: function() {
    return (
      <section>
        <h1 className="sign-up page-header">Sign Up</h1>

        <form className="sign-up cred-form ">
          <label className="username label" htmlFor="username">
            Username
          </label>
          <input onChange={this.updateUsername} className="username field"
            type="text" name="user[username]" value={this.state.username} />

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

          <input type="file" onChange={this.updateImage}/>

          <img className="profile-pic" src={this.state.imageUrl} />

          <input className="submit-button"
            type="submit" value="Sign Up" onClick={this.handleSubmit}/>
        </form>
      </section>
    );
  }

});

module.exports = SignUpForm;
