var React = require('react');
var PropTypes = React.PropTypes;
var UserStore = require('../stores/user_store');
var ApiUtil = require('../util/api_util');
var UserNav = require('./user_navbar');

var UserHome = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(this.props.params.id) };
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
        <h1 className="user-profile page-header">Welcome {name}!</h1>
        <UserNav user={this.state.user}/>
        {this.props.children}
      </div>
    );
  }

});
// <PlaylistIndex user={this.state.user} />

module.exports = UserHome;
