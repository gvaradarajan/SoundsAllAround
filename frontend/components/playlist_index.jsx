var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistIndexItem = require('./playlist_index_item');

var PlaylistIndex = React.createClass({

  render: function() {
    var playlistItems = this.props.playlists && this.props.playlists.map(function (playlist) {
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
