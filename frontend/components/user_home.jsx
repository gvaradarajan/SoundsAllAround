var React = require('react');
var PropTypes = React.PropTypes;
var UserStore = require('../stores/user_store');
var UserPlaylistStore = require('../stores/user_playlist_store');
var ApiUtil = require('../util/api_util');
var PlaylistIndex = require('./playlist_index');

var UserHome = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(this.props.params.id) };
  },
  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleUser(newProps.params.id);
  },
  componentDidMount: function () {
    UserStore.addListener(this._onChange);
    ApiUtil.fetchSingleUser(this.props.params.id);
  },
  _onChange: function () {
    this.setState ({ user: UserStore.find(this.props.params.id) });
  },
  render: function() {
    var name = this.state.user ? this.state.user.username : "";
    return (
      <div>
        <h1 className="header">Welcome {name}!</h1>
        <PlaylistIndex user={this.state.user} />
      </div>
    );
  }

});

module.exports = UserHome;
