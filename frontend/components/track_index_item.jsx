var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var TrackIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount: function () {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    // audio.addEventListener("ended", this.removeControls);
  },
  changePlayState: function (e) {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    // audio.setAttribute("controls", "");
    // console.log(audio.duration);
    if (audio.paused) {
      audio.play();
    }
    else {
      audio.pause();
    }
  },
  // removeControls: function (e) {
  //   e.currentTarget.removeAttribute("controls");
  // },
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
  generatePlayButton: function () {
    var button = "";
    if (this.props.orientation === "landscape") {
      button = (
        <div className="play-button-container" onClick={this.sendTicker}>
          <img className="play-button"></img>
        </div>
      );
    }
    return button;
  },
  generateDeleteButton: function () {
    var button = "";
  },
  producePlayer: function () {
    var els = "";
    if (this.props.orientation === "landscape") {
      els = (
        <div className="big-rect" onClick={this.sendTicker}>
         <div className="small-rect" id={"small-rect " + this.props.track.id} >
         </div>
       </div>
      );
    }
    return els;
  },
  sendTicker: function (){
    var audio = document.getElementById("track-audio" + this.props.track.id);
    var tick = document.getElementById("small-rect " + this.props.track.id);
    $(tick).addClass('move');
    var pos = parseInt($(tick).css('left').slice(0,-2));
    var duration = Math.floor(audio.duration)
    var timeRemaining = duration - Math.floor((pos / 300) * duration);
    tick.style['transition-duration'] = timeRemaining.toString() + "s";
    this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
    if (audio.paused) {
      audio.play();
      $(tick).addClass('ended');
    }
    else {
      // var leftUncomp = $(tick)[0].style.left
      // debugger
      // var left = window.getComputedStyle(leftUncomp);
      $(tick).removeClass('move')
      $(tick).toggleClass('ended');
      audio.pause();
    }
  },
  render: function() {
    var track = this.props.track;
    var title = track && track.title;
    var artist = track && track.artist;
    // if (track.title === "5th Symphony") {
    //   debugger
    // }
    return (
      <li className={"track-" + this.props.orientation + " group"} >
        <img src={track ? track.image : ""} onClick={this.changePlayState}></img>
        <div className="track-nopic">
          {this.generatePlayButton()}
          <div className="track-info">
            <h2><a onClick={this.linkToArtistShow}>{artist}</a></h2>
            <h1><a onClick={this.linkToTrackShow}>{title}</a></h1>
            <audio ref="audio_tag"
                   id={"track-audio" + track.id}
                   src={track.audio}
                   preload="metadata"></audio>
                 {this.producePlayer()}
          </div>
        </div>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
