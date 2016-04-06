var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
var ApiUtil = require('../util/api_util');

var Track = React.createClass({
  getInitialState: function () {
    return { track: TrackStore.find(this.props.params.id) };
  },
  _onChange: function () {
    this.setState({ track: TrackStore.find(this.props.params.id) });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ track: TrackStore.find(newProps.params.id) });
  },
  componentDidMount: function () {
    TrackStore.addListener(this._onChange);
    ApiUtil.fetchSingleTrack(this.props.params.id);
  },
  render: function() {
    var track = this.state.track;
    var title = track && track.title;
    var artist = track && track.artist;
    var playlistItems = track && track.playlists && track.playlists.map(function (playlist) {
      return <li key={playlist.id}>{playlist.title}</li>;
    });
    return (
      <div>
        <h1>{title}</h1>
        <h2>{artist}</h2>
        <p></p>
        <ul>
          {playlistItems}
        </ul>
      </div>
    );
  }

});

module.exports = Track;
