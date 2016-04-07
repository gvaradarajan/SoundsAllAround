var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var TrackIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  changePlayState: function (e) {
    if (e.currentTarget.children[3].paused) {
      // e.currentTarget.children[3].setAttribute("controls", "controls");
      console.log(e.currentTarget.children[3].buffered.start());
      console.log(e.currentTarget.children[3].buffered.end());
      e.currentTarget.children[3].play();
    }
    else {
      e.currentTarget.children[3].pause();
    }
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
      <li className="track" onClick={this.changePlayState}>
        <img></img>
        <h1><a onClick={this.linkToTrackShow}>{title}</a></h1>
        <p><a onClick={this.linkToArtistShow}>{artist}</a></p>
        <audio ref="audio_tag" src={this.props.track.audio}></audio>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
