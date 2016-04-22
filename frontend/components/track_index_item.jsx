var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var PlayStore = require('../stores/play_store');

var TrackIndexItem = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  componentDidMount: function () {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    this.listenerToken = PlayStore.addListener(this.stopTrack);
    // audio.addEventListener("ended", this.removeControls);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
    audio.removeEventListener("ended", this.receiveEndOfAudio);
  },
  stopTrack: function () {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    if (this.props.track.id !== PlayStore.currentlyPlayingId && !audio.paused) {
      if (this.props.orientation === "portrait") {
        $($("#" + this.props.track.id).children()[1]).toggleClass("playing");
        audio.pause();
      }
      else {
        var audio = document.getElementById("track-audio" + this.props.track.id);
        var tick = document.getElementById("small-rect " + this.props.track.id);
        $(tick).addClass('move');
        var pos = parseInt($(tick).css('left').slice(0,-2));
        var duration = Math.floor(audio.duration)
        var timeRemaining = duration - Math.floor((pos / 300) * duration);
        tick.style['transition-duration'] = timeRemaining.toString() + "s";
        this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
        $(tick).removeClass('move');
        $(tick).toggleClass('ended');
        // debugger
        $('#play-'+ this.props.track.id).removeClass('playing');
        audio.pause();
      }
    }
  },
  changePlayState: function (e) {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    // audio.setAttribute("controls", "");
    // console.log(audio.duration);
    var orient = this.props.orientation;
    $($("#" + this.props.track.id).children()[1]).toggleClass("playing");
    // $('.play-button-container').toggleClass("playing");
    if (audio.paused) {
      ApiUtil.newTrackPlaying(this.props.track.id);
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
    var id = this.props.track.id;
    if (this.props.orientation === "portrait") {
      button = (
        <div id={'play-'+id} className="play-button-container"
          onClick={this.changePlayState}>
        </div>
      );
    }
    else {
      button = (
        <div id={'play-'+id} className="play-button-container"
          onClick={this.sendTicker}>
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
  sendTicker: function (e){
    $(e.currentTarget).toggleClass("playing");
    var audio = document.getElementById("track-audio" + this.props.track.id);
    var tick = document.getElementById("small-rect " + this.props.track.id);
    $(tick).addClass('move');
    var pos = parseInt($(tick).css('left').slice(0,-2));
    var duration = Math.floor(audio.duration)
    var timeRemaining = duration - Math.floor((pos / 300) * duration);
    tick.style['transition-duration'] = timeRemaining.toString() + "s";
    this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
    if (audio.paused) {
      ApiUtil.newTrackPlaying(this.props.track.id);
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
    var orient = this.props.orientation;
    var track = this.props.track;
    var title = track && track.title;
    var artist = track && track.artist;
    // if (track.title === "5th Symphony") {
    //   debugger
    // }
    return (
      <li className={"track-" + orient + " group"} id={track.id}>
        <img className="track-img" src={track ? track.image : ""}
              onClick={this.changePlayState} />
        {orient === "portrait" ? this.generatePlayButton() : ""}
        <div className="track-nopic">
          {orient === "landscape" ? this.generatePlayButton() : ""}
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
