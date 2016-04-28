var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistStore = require('../stores/playlist_store');
var CurrentUserStore = require('../stores/current_user_store');
var TrackIndexItem = require('./track_index_item');
var EditField = require('./edit_field');
var ApiUtil = require('../util/api_util');
var PlaylistAddTrack = require('./playlist_add_track');

var Playlist = React.createClass({
  getInitialState: function () {
    return { playlist: PlaylistStore.find(this.props.params.id),
             titleEditState: false,
             descEditState: false };
  },

  _belongsToCurrentUser: function () {
    if (CurrentUserStore.isLoggedIn() && this.state.playlist) {
      return CurrentUserStore.currentUser().id === this.state.playlist.user_id;
    }
    return false;
  },

  _onChange: function () {
    this.setState({ playlist: PlaylistStore.find(this.props.params.id),
                    titleEditState: false,
                    descEditState: false });
  },

  componentDidMount: function () {
    this.listenerToken = PlaylistStore.addListener(this._onChange);
    ApiUtil.fetchSinglePlaylist(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.listenerToken.remove();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({ playlist: PlaylistStore.find(newProps.params.id) });
  },

  createEditTitle: function () {
    if (this._belongsToCurrentUser()) {
      if (this.state.titleEditState) {
        return <EditField field={this.state.playlist.title}
          handleSubmit={this.handleSubmit.bind(null, "title")} />;
      }
      else {
        return <a className="edit-title"
                  onClick={this.toggleTitleEditState}>Edit Title</a>;
        }
    }
    return "";
  },

  createEditDesc: function () {
    if (this._belongsToCurrentUser()) {
      if (this.state.descEditState) {
        return <div className="desc"><EditField field={this.state.playlist.description}
          handleSubmit={this.handleSubmit.bind(this, "description")} /></div>;
      }
      else {
        return <a className="edit-desc"
                  onClick={this.toggleDescEditState}>Edit Description</a>;
        }
    }
    return "";
  },

  createRemoveTrackButton: function (track) {
    var button = "";
    var currentUserId = (
      !CurrentUserStore.currentUser() ? NaN : CurrentUserStore.currentUser().id
    );
    var thisUserId = !this.state.playlist ? NaN : this.state.playlist.user_id;
    if (currentUserId === thisUserId) {
      button = <input className="submit-button"
        type="submit" value="Remove From Playlist"
        onClick={this.handleTrackRemoval.bind(this, track.id)} />;
    }
    return button;
  },

  createTrackForm: function () {
    if (this._belongsToCurrentUser()) {
      var id = this.state.playlist && this.state.playlist.id;
      return <PlaylistAddTrack id={id}/>
    }
    return "";
  },

  handleTrackRemoval: function (trackId, e) {
    var removalParams = { playlist_id: this.state.playlist.id,
                          track_id: trackId };
    ApiUtil.removeTrackFromPlaylist(removalParams);
  },

  handleSubmit: function (fieldName, value, e) {
    e.preventDefault();
    var params = { playlist: { creation_params: {} } };
    params.playlist.creation_params[fieldName] = value;
    ApiUtil.updatePlaylist(this.state.playlist.id, params);
  },

  toggleTitleEditState: function () {
    this.setState({ titleEditState: true });
  },

  toggleDescEditState: function () {
    this.setState({ descEditState: true });
  },

  render: function() {
    var playlist = this.state.playlist;
    var title = playlist && playlist.title;
    var creator = playlist && playlist.creator;
    var description = playlist && playlist.description;
    var trackItems = playlist && playlist.tracks && playlist.tracks.map(
      function (track) {
        return (
          <TrackIndexItem key={track.id} track={track} orientation={"landscape"}/>
        );
      }.bind(this)
    );
    var id = this.state.playlist && this.state.playlist.id;

    return (
      <article className="playlist-show content">
        <header className="playlist-banner banner">
          <h1 className="playlist-heading">{title}</h1>
          {this.createEditTitle()}
          <h1 className="creator-heading">{creator}</h1>
        </header>
        <h1 className="page-header">Summary: </h1>
        <p className="description">{description}</p>
        {this.createEditDesc()}
        <h1 className="page-header">Tracks: </h1>
        <ul className="group">
          {trackItems}
        </ul>
        {this.createTrackForm()}
      </article>
    );
  }

});

module.exports = Playlist;
