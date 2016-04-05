var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var UserStore = require('../stores/user_store');
var TrackStore = require('../stores/track_store');
var TrackIndexItem = require('./track_index_item');
var SearchTracksForm = require('./search_tracks_form');

var PlaylistForm = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { title: "",
             description: "",
             chosenTrack: null,
             user_id: this.props.id,
             track_error: ""};
  },
  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this.resetForm);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.chosenTrack) {
      var router = this.context.router;
      var p_params = {title: this.state.title,
        description: this.state.description,
        user_id: this.state.user_id};
      var data = { playlist: { creation_params: p_params,
        track_id: this.state.chosenTrack.id } };
      ApiUtil.createAPlaylist(data, function(id) {
        router.push("/users/" + id + "/playlists");
      });
    }
    else {
      this.setState({track_error: "Playlists need tracks"});
    }
  },
  chooseTrack: function (e) {
    var track = TrackStore.find(e.currentTarget.id);
    this.setState({chosenTrack: track});
  },
  updateTitle: function(e) {
    this.setState({ title: e.currentTarget.value });
  },
  updateDescription: function(e) {
    this.setState({ description: e.currentTarget.value });
  },
  resetForm: function () {
    this.setState({ title: "", description: "", user_id: this.props.id });
  },
  render: function() {
    var selectedTrack = this.state.chosenTrack;
    var selectedTrackItem = selectedTrack && <TrackIndexItem track={selectedTrack} />;
    return (
      <section>
        <h1 className="playlist-form-header">Add New Playlist</h1>
        <form className="playlist-form cred-form">

          <label className="playlist-title label" htmlFor="title">
            Title:
          </label>
          <input onChange={this.updateTitle} className="playlist-title field"
            type="text" name="playlist[title]" value={this.state.title} />
          <label className="playlist-description label" htmlFor="description">
            Description:
          </label>
          <textarea onChange={this.updateDescription} className="playlist-description field"
            type="text" name="playlist[description]" value={this.state.description} />
          <SearchTracksForm chooseTrack={this.chooseTrack} />
          <label className="selected-track label">
            Selected Track:
          </label>
          {selectedTrackItem}
          <input className="submit-button"
            type="submit" value="Create Playlist" onClick={this.handleSubmit}/>
          {this.state.track_error}
        </form>
      </section>
    );
  }

});

module.exports = PlaylistForm;
