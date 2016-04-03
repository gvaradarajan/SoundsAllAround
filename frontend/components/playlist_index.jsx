var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistIndexItem = require('./playlist_index_item');
var PlaylistForm = require('./playlist_form');
var UserStore = require('../stores/user_store');
var ApiUtil = require('../util/api_util');
var CurrentUserStore = require('../stores/current_user_store');

var PlaylistIndex = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(parseInt(this.props.params.id)) };
  },
  componentWillReceiveProps: function () {
    this._onChange();
  },
  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
    //ApiUtil.fetchSingleUser(parseInt(this.props.params.id));
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onChange: function () {
    this.setState ({ user: UserStore.find(parseInt(this.props.params.id)) });
  },
  createFormForCurrentUser: function () {
    var form = "";
    var currentUserId = (
      !CurrentUserStore.currentUser() ? NaN : CurrentUserStore.currentUser().id
    );
    var thisUserId = !this.state.user ? NaN : this.state.user.id;
    if (currentUserId === thisUserId) {
      form = <PlaylistForm id={thisUserId} />;
    }
    return form;
  },
  render: function() {
    var id = this.state.user && this.state.user.id;
    var playlists = this.state.user && this.state.user.playlists;
    var playlistItems = playlists && playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <div className="playlists-index">
        <h1 className="playlists-header">Playlists:</h1>
        <ul>
          {playlistItems}
        </ul>
        {this.createFormForCurrentUser()}
      </div>
    );
  }

});

module.exports = PlaylistIndex;
