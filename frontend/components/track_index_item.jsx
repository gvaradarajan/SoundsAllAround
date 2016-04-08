var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var TrackIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount: function () {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    audio.addEventListener("ended", this.removeControls);
  },
  changePlayState: function (e) {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    audio.setAttribute("controls", "");
    // console.log(audio.duration);
    if (audio.paused) {
      audio.play();
    }
    else {
      audio.pause();
    }
  },
  removeControls: function (e) {
    e.currentTarget.removeAttribute("controls");
  },
  linkToTrackShow: function () {
    var router = this.context.router;
    router.push("/tracks/" + this.props.track.id);
  },
  linkToArtistShow: function () {
    var router = this.context.router;
    router.push("/users/" + this.props.track.artist_id);
  },
  receiveEndOfAudio: function (e) {
    var tick = document.getElementById("small-rect " + this.props.track.id);
    tick.style['transition-duration'] = '0s';
    $(tick).removeClass('ended');
  },
  sendTicker: function (){
    var audio = document.getElementById("track-audio" + this.props.track.id);
    var tick = document.getElementById("small-rect " + this.props.track.id);
    tick.style['transition-duration'] = Math.floor(audio.duration).toString() + "s";
    this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
    if (audio.paused) {
      // $('.small-rect').addClass('move');
      audio.play();
      $(tick).toggleClass('ended');
    }
    else {
      // var left = window.getComputedStyle($('.small-rect')[0]).getPropertyValue('left');
      // var left = $('.small-rect')[0].css('left');
      // $('.small-rect').removeClass('move');
      // $('.small-rect').css('left', left);
      audio.pause();
    }
  },
  render: function() {
    var track = this.props.track;
    var title = track && track.title;
    var artist = track && track.artist;
    return (
      <li className={"track-" + this.props.orientation + " group"} >
        <img src={track ? track.image : ""} onClick={this.changePlayState}></img>
        <div className="track-nopic">
          <div className="play-button-container" onClick={this.sendTicker}>
            <img className="play-button"></img>
          </div>
          <div className="track-info">
            <h2><a onClick={this.linkToArtistShow}>{artist}</a></h2>
            <h1><a onClick={this.linkToTrackShow}>{title}</a></h1>
            <audio ref="audio_tag"
                   id={"track-audio" + track.id}
                   src={track.audio} ended={this.removeControls}
                   volume="1"></audio>
            <div className="big-rect" onClick={this.sendTicker}>
             <div className="small-rect move" id={"small-rect " + this.props.track.id} >
             </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
