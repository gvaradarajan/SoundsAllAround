var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistStore = require('../stores/playlist_store');
var TrackIndexItem = require('./track_index_item');
var ApiUtil = require('../util/api_util');

var Playlist = React.createClass({
  getInitialState: function () {
    return { playlist: PlaylistStore.find(this.props.params.id) };
  },
  _onChange: function () {
    this.setState({ playlist: PlaylistStore.find(this.props.params.id) });
  },
  componentDidMount: function () {
    PlaylistStore.addListener(this._onChange);
    ApiUtil.fetchSinglePlaylist(this.props.params.id);
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ playlist: Playlist.find(newProps.params.id) });
  },
  render: function() {
    var title = this.state.playlist && this.state.playlist.title;
    var creator = this.state.playlist && this.state.playlist.creator;
    var description = this.state.playlist && this.state.playlist.description;
    var trackItems = this.state.playlist && this.state.playlist.tracks.map(
      function (track) {
        return <li><TrackIndexItem key={track.id} track={track}/></li>;
      }
    );
    return (
      <div>
        <h1>{title}</h1>
        <h2>{creator}</h2>
        <p>{description}</p>
        <ul>
          {trackItems}
        </ul>
      </div>
    );
  }

});

module.exports = Playlist;
