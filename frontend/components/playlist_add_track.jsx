var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var TrackStore = require('../stores/track_store');
var PlaylistStore = require('../stores/playlist_store');
var SearchTracksForm = require('./search_tracks_form');
var TrackIndexItem = require('./track_index_item');

var PlaylistAddTrack = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      chosenTrack: null
    };
  },

  componentDidMount: function() {
    this.listenerToken = PlaylistStore.addListener(this.resetForm);
  },
  componentWillUnmount: function() {
    this.listenerToken.remove();
  },

  chooseTrack: function (e) {
    var track = TrackStore.find(e.currentTarget.id);
    this.setState({chosenTrack: track});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.chosenTrack) {
      var params = { playlisttrack: {playlist_id: this.props.id,
                    track_id: this.state.chosenTrack.id}};
      ApiUtil.addTrackToPlaylist(params, function(track) {
        ApiUtil.registerAddedTrack(this.props.id, track);
      }.bind(this));
    }
    else {
      this.setState({track_error: "Playlists need tracks"});
    }
  },

  resetForm: function () {
    this.setState({ chosenTrack: null });
  },

  render: function() {
    var selectedTrack = this.state.chosenTrack;
    var selectedTrackItem = selectedTrack && <TrackIndexItem track={selectedTrack} />;
    return (
      <form className="track-form cred-form">
        <SearchTracksForm chooseTrack={this.chooseTrack} />
        <label className="selected-track label">
          Selected Track:
        </label>
        {selectedTrackItem}
        <input className="submit-button"
          type="submit" value="Add Track" onClick={this.handleSubmit} />
      </form>
    );
  }

});

module.exports = PlaylistAddTrack;
