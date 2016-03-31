var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistStore = require('../stores/playlist_store');
var PlaylistIndexItem = require('./playlist_index_item');
var ApiUtil = require('../util/api_util');

var AllPlaylists = React.createClass({
  getInitialState: function () {
    return { playlists: PlaylistStore.all() };
  },
  componentDidMount: function () {
    PlaylistStore.addListener(this._onChange);
    ApiUtil.fetchAllPlaylists();
  },
  _onChange: function () {
    this.setState({playlists: PlaylistStore.all()});
  },
  render: function() {
    var playlists = this.state.playlists;
    var playlistItems = playlists && playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <ul>
        {playlistItems}
      </ul>
    );
  }

});

module.exports = AllPlaylists;
