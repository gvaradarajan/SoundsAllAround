var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var TrackIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  linkToTrackShow: function () {
    var router = this.context.router;
    router.push("/tracks/" + this.props.track.id);
  },
  linkToArtistShow: function () {
    var router = this.context.router;
    router.push("/users/" + this.props.track.artist_id);
  },
  render: function() {
    var title = this.props.track && this.props.track.title;
    var artist = this.props.track && this.props.track.artist;
    return (
      <li className="track">
        <img></img>
        <h1><a onClick={this.linkToTrackShow}>{title}</a></h1>
        <p><a onClick={this.linkToArtistShow}>{artist}</a></p>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
