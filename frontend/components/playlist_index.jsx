var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistIndexItem = require('./playlist_index_item');
var PlaylistForm = require('./playlist_form');

var PlaylistIndex = React.createClass({
  getInitialState: function () {
    return { };
  },
  componentDidMount: function () {
  },
  resetIndex: function () {
  },
  render: function() {
    var id = this.props.user && this.props.user.id;
    var playlists = this.props.user && this.props.user.playlists;
    var playlistItems = playlists && playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id} playlist={playlist} />;
    });
    return (
      <div className="playlists-index">
        <h1 className="playlists-header">Playlists:</h1>
        <ul>
          {playlistItems}
        </ul>
        <PlaylistForm id={id} />
      </div>
    );
  }

});

module.exports = PlaylistIndex;
