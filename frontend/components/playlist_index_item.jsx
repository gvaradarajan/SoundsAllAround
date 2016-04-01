var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var PlaylistIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleDelete: function(e) {
    e.preventDefault();

    var router = this.context.router;
    var playlistId = this.props.playlist.id;
    ApiUtil.deletePlaylist(playlistId, function(id) {
      router.push("/users/" + id);
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
        <input className="submit-button"
          type="submit" value="Delete Playlist" onClick={this.handleDelete} />
      </li>
    );
  }

});

module.exports = PlaylistIndexItem;
