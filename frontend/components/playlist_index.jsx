var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistIndexItem = require('./playlist_index_item');
var PlaylistForm = require('./playlist_form');
var UserPlaylistStore = require('../stores/user_playlist_store');

var PlaylistIndex = React.createClass({
  getInitialState: function () {
    return { playlists: this.props.user && this.props.user.playlists };
  },
  componentDidMount: function () {
    UserPlaylistStore.addListener(this.resetIndex);
  },
  resetIndex: function () {
    this.setState({ playlists: UserPlaylistStore.all() });
  },
  render: function() {
    var playlists = this.state.playlists;
    var playlistItems = playlists && playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <div className="playlists-index">
        <h1 className="playlists-header">Playlists:</h1>
        <ul>
          {playlistItems}
        </ul>
      </div>
    );
  }

});

module.exports = PlaylistIndex;
