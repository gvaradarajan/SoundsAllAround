var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var TrackStore = require('../stores/track_store');
var TrackIndexItem = require('./track_index_item');

var Tracks = React.createClass({
  getInitialState: function () {
    return { tracks: TrackStore.all() };
  },
  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchAllTracks();
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onChange: function () {
    this.setState({tracks: TrackStore.all()});
  },
  render: function() {
    var tracks = this.state.tracks;
    var trackItems = tracks && tracks.map(function (track) {
      return <TrackIndexItem key={track.id} track={track} />;
    });
    return (
      <ul className="all-tracks group">
        {trackItems}
      </ul>
    );
  }
});

module.exports = Tracks;
