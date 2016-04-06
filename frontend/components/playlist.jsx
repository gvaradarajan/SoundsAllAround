var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistStore = require('../stores/playlist_store');
var CurrentUserStore = require('../stores/user_store');
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
    return CurrentUserStore.currentUser().id === this.state.playlist.user_id;
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
    if (this.state.titleEditState) {
      return <EditField field={this.state.playlist.title}
                handleSubmit={this.handleSubmit.bind(null, "title")} />;
    }
    else {
      return <a onClick={this.toggleTitleEditState}>Edit Title</a>;
    }
  },

  createEditDesc: function () {
    if (this.state.descEditState) {
      return <EditField field={this.state.playlist.description}
                handleSubmit={this.handleSubmit.bind(this, "description")} />;
    }
    else {
      return <a onClick={this.toggleDescEditState}>Edit Description</a>;
    }
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
    var trackItems = playlist && playlist.tracks.map(
      function (track) {
        return (
          <TrackIndexItem key={track.id} track={track}/>
        );
      }.bind(this)
    );
    var id = this.state.playlist && this.state.playlist.id;

    return (
      <article className="playlist content">
        <header></header>
        <h1 className="playlists-header">{title}</h1>
        <h2>{creator}</h2>
        {this.createEditTitle()}
        <p>{description}</p>
        {this.createEditDesc()}
        <ul>
          {trackItems}
        </ul>
        <PlaylistAddTrack id={id}/>
      </article>
    );
  }

});

module.exports = Playlist;
