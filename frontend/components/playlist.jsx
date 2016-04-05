var React = require('react');
var PropTypes = React.PropTypes;
var PlaylistStore = require('../stores/playlist_store');
var TrackIndexItem = require('./track_index_item');
var EditField = require('./edit_field');
var ApiUtil = require('../util/api_util');

var Playlist = React.createClass({
  getInitialState: function () {
    return { playlist: PlaylistStore.find(this.props.params.id),
             titleEditState: false,
             descEditState: false };
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
    var title = this.state.playlist && this.state.playlist.title;
    var creator = this.state.playlist && this.state.playlist.creator;
    var description = this.state.playlist && this.state.playlist.description;
    var trackItems = this.state.playlist && this.state.playlist.tracks.map(
      function (track) {
        return <TrackIndexItem key={track.id} track={track}/>;
      }
    );

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
      </article>
    );
  }

});

module.exports = Playlist;
