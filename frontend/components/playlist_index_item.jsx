var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var CurrentUserStore = require('../stores/current_user_store');

var PlaylistIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  createDeleteForCurrentUser: function () {
    var button = "";
    var currentUserId = (
      !CurrentUserStore.currentUser() ? NaN : CurrentUserStore.currentUser().id
    );
    var thisUserId = !this.props.playlist ? NaN : this.props.playlist.user_id;
    if (currentUserId === thisUserId) {
      button = <input className="submit-button"
        type="submit" value="Delete Playlist" onClick={this.handleDelete} />;
    }
    return button;
  },
  handleDelete: function(e) {
    e.preventDefault();

    var router = this.context.router;
    var playlistId = this.props.playlist.id;
    ApiUtil.deletePlaylist(playlistId, function(id) {
      router.push("/users/" + id + "/playlists");
    });
  },
  render: function() {
    var title = this.props.playlist && this.props.playlist.title;
    var des = this.props.playlist && this.props.playlist.description;
    var creator = this.props.playlist && this.props.playlist.creator;
    return (
      <li className="playlist">
        <h1>{title}: {des}</h1>
        <p>{creator}</p>
        {this.createDeleteForCurrentUser()}
      </li>
    );
  }

});

module.exports = PlaylistIndexItem;
