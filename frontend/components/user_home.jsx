var React = require('react');
var PropTypes = React.PropTypes;
var UserStore = require('../stores/user_store');
var ApiUtil = require('../util/api_util');
var UserNav = require('./user_navbar');

var UserHome = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(this.props.params.id), uploadModalIsOpen: false };
  },
  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleUser(newProps.params.id);
  },
  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
    ApiUtil.fetchSingleUser(this.props.params.id);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onChange: function () {
    this.setState ({ user: UserStore.find(this.props.params.id) });
  },
  render: function() {
    var name = this.state.user ? this.state.user.username : "";
    return (
      <div className="user-profile">
        <header className="user-banner banner">
          <h1 className="user-header page-header">{name}</h1>
          <button className="upload-profile-pic">Upload Photo</button>
          <img className="profile-pic home-profile-pic" src={this.state.user ? this.state.user.image : ""} />
        </header>
        <UserNav user={this.state.user}/>
        {this.props.children}
      </div>
    );
  }

});
// <PlaylistIndex user={this.state.user} />

module.exports = UserHome;
