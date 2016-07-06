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
    var amps = this.props.track && this.props.track.amplitudes;
    this.drawWaveform();
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
    var audio = document.getElementById("track-audio" + this.props.track.id);
    audio.removeEventListener("ended", this.receiveEndOfAudio);
  },
  drawWaveform: function () {
    var amps = this.props.track.amplitudes;
    if (amps && this.props.orientation == "landscape") {
      var canvas = document.getElementById('canvas-'+this.props.track.id);
      var ctx = canvas.getContext('2d');
      var width = 500;
      var height = 100;
      ctx.clearRect(0,0,width,height);
      var barWidth = width / 140 - 2;
      for (var k = 0; k < amps.length; k++) {
        ctx.fillStyle = "#3F3D3B";
        ctx.fillRect(1 + k * width / 140,
                     (height / 2) - (amps[k] / 150),
                     barWidth,
                     (amps[k] / 150) * 2);
      }
    }
  },
  stopTrack: function () {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    if (this.props.track.id !== PlayStore.currentlyPlayingId() && !audio.paused) {
      if (this.props.orientation === "portrait") {
        var trackItemChildren = document.getElementById('' + this.props.track.id).children;
        $(trackItemChildren[1]).toggleClass("playing");
        audio.pause();
      }
      else {
        var play = document.getElementById("play-" + this.props.track.id);
        $(play).removeClass('playing');
        audio.pause();
      }
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
  receiveEndOfAudio: function (e) {
    var tick = document.getElementById("small-rect " + this.props.track.id);
    var play = document.getElementById("play-" + this.props.track.id);
    $(play).removeClass('playing');
    var amps = this.props.track.amplitudes;
    if (amps) {
      clearInterval(this.canvasPlayToken);
      this.drawWaveform();
    }
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
          onClick={this.canvasPlay}>
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
    var id = this.props.track.id;
    if (this.props.orientation === "landscape") {
      els = (
        <canvas id={"canvas-" + id} className="index-canvas" width="500" height="100"
                onClick={this.seek} />
      );
    }
    return els;
  },
  canvasPlay: function (e) {
    if (e.currentTarget.classList[0] === 'play-button-container') {
      $(e.currentTarget).toggleClass("playing");
    }
    var audio = document.getElementById("track-audio" + this.props.track.id);
    if (!audio.paused) {
      audio.pause();
      return;
    }
    else {
      audio.play();
      ApiUtil.newTrackPlaying(this.props.track.id);
    }
    var canvas = document.getElementById('canvas-'+this.props.track.id);
    var ctx = canvas.getContext('2d');
    var width = 500;
    var height = 100;
    var barWidth = width / 140 - 2;
    var totalTime = audio.duration * 1000;
    var timePerBar = totalTime / 140;
    var framesPerBar = timePerBar / 20;
    var widthPerFrame = barWidth / framesPerBar;
    this.currBar = 0;
    this.counter = 0;
    var amps = this.props.track.amplitudes;
    var renderWF = function () {
      if (audio.paused) {
        return;
      }
      var elapsed = audio.currentTime * 1000;
      if (this.currBar !== Math.floor(elapsed / timePerBar)) {
        this.currBar = Math.floor(elapsed / timePerBar);
        this.counter = Math.floor((elapsed - (this.currBar * timePerBar)) / 20);
      }
      if (this.currBar > amps.length) {
        clearInterval(this.canvasPlayToken);
        return;
      }
      ctx.clearRect(0,0,width,height);
      for (var j = 0; j < this.currBar; j++) {
        ctx.fillStyle = "#F46A0D";
        ctx.fillRect(1 + j * width / 140,
          (height / 2) - (amps[j] / 150),
          barWidth,
          (amps[j] / 150) * 2);
      }
      ctx.fillStyle = "#F46A0D";
      ctx.fillRect(1 + this.currBar * width / 140,
        (height / 2) - (amps[this.currBar] / 150),
        this.counter * widthPerFrame,
        (amps[this.currBar] / 150) * 2);
      ctx.fillStyle = "#3F3D3B";
      ctx.fillRect(1 + this.currBar * width / 140 + this.counter * widthPerFrame,
        (height / 2) - (amps[this.currBar] / 150),
        barWidth - this.counter * widthPerFrame,
        (amps[this.currBar] / 150) * 2);
      for (var k = this.currBar + 1; k < amps.length; k++) {
        ctx.fillStyle = "#3F3D3B";
        ctx.fillRect(1 + k * width / 140,
          (height / 2) - (amps[k] / 150),
          barWidth,
          (amps[k] / 150) * 2);
      }
      this.counter++;
      if (this.counter >= Math.floor(framesPerBar)) {
        this.currBar++;
        this.counter = 0;
      }
    };
    this.canvasPlayToken = setInterval(renderWF.bind(this), 20);
  },
  seek: function (e) {
    var container = e.currentTarget.getBoundingClientRect();
    var leftDis = e.clientX - container.left;
    var ratio = (leftDis - 1) / 500;
    var audio = document.getElementById("track-audio" + this.props.track.id);
    audio.currentTime = audio.duration * ratio;
  },
  render: function() {
    var orient = this.props.orientation;
    var track = this.props.track;
    var title = track && track.title;
    var amps = orient == "landscape" ? (track && track.amplitudes) : [];
    var artist = track && track.artist;
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
                   preload="metadata"
                   onEnded={this.receiveEndOfAudio}></audio>
                 {this.producePlayer()}
          </div>
        </div>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
