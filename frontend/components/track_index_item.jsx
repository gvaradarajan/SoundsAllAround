var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var TrackIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  changePlayState: function (e) {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    // if (e.currentTarget.children[3].paused) {
    //   e.currentTarget.children[3].play();
    // }
    // else {
    //   e.currentTarget.children[3].pause();
    // }
    if (audio.paused) {
      audio.play();
    }
    else {
      audio.pause();
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
    var track = this.props.track;
    var title = track && track.title;
    var artist = track && track.artist;
    return (
      <li className="track" onClick={this.changePlayState}>
        <img></img>
        <h1><a onClick={this.linkToTrackShow}>{title}</a></h1>
        <h2><a onClick={this.linkToArtistShow}>{artist}</a></h2>
        <audio ref="audio_tag" id={"track-audio" + track.id} src={track.audio}></audio>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
