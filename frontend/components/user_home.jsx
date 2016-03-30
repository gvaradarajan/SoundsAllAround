var React = require('react');
var PropTypes = React.PropTypes;
var UserStore = require('../stores/user_store');
var ApiUtil = require('../util/api_util');
var PlaylistIndex = require('./playlist_index');

var UserHome = React.createClass({
  getInitialState: function () {
    return { user: undefined };
  },
  componentDidMount: function () {
    UserStore.addListener(this._onChange);
    ApiUtil.fetchSingleUser(this.props.id);
  },
  _onChange: function () {
    this.setState ({ user: UserStore.find(this.props.id) });
  },
  render: function() {
    var name = this.state.user ? this.state.user.username : "";
    var playlists = this.state.user ? this.state.user.playlists : null;
    return (
      <div>
        <h1 className="header">Welcome {name}!</h1>
        <PlaylistIndex playlists={playlists} />
      </div>
    );
  }

});

module.exports = UserHome;
