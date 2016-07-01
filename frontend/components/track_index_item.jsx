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
    var amps = this.props.track.amplitudes;
    if (amps) {
      var canvas = document.getElementById('canvas-'+this.props.track.id);
      var ctx = canvas.getContext('2d');
      var width = 500;
      var height = 100;
      var barWidth = width / 140 - 2;
      for (var k = 0; k < amps.length; k++) {
        ctx.fillStyle = "#3F3D3B";
        ctx.fillRect(1 + k * width / 140,
                     (height / 2) - (amps[k] / 100),
                     barWidth,
                     (amps[k] / 100) * 2);
      }
    }
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
    var audio = document.getElementById("track-audio" + this.props.track.id);
    audio.removeEventListener("ended", this.receiveEndOfAudio);
  },
  stopTrack: function () {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    if (this.props.track.id !== PlayStore.currentlyPlayingId && !audio.paused) {
      if (this.props.orientation === "portrait") {
        var trackItemChildren = document.getElementById('' + this.props.track.id).children;
        $(trackItemChildren[1]).toggleClass("playing");
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
        $(tick).removeClass('move');
        $(tick).toggleClass('ended');
        $('#play-'+ this.props.track.id).removeClass('playing');
        audio.pause();
      }
    }
  },
  changePlayState: function (e) {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    var orient = this.props.orientation;
    var trackItemChildren = document.getElementById('' + this.props.track.id).children;
    $(trackItemChildren[1]).toggleClass("playing");
    if (audio.paused) {
      ApiUtil.newTrackPlaying(this.props.track.id);
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
  receiveEndOfAudio: function (e) {
    var tick = document.getElementById("small-rect " + this.props.track.id);
    $('.play-button-container').removeClass('playing');
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
        <canvas id={"canvas-" + id} width="500" height="100" onClick={this.canvasPlay} />
      );
      // els = (
      //   <div className="big-rect" onClick={function() {return;}}>
      //    <div className="small-rect" id={"small-rect " + this.props.track.id} >
      //    </div>
      //  </div>
      // );
    }
    return els;
  },
  canvasPlay: function (e) {
    if (e.currentTarget.classList[0] === 'play-button-container') {
      $(e.currentTarget).toggleClass("playing");
    }
    var audio = document.getElementById("track-audio" + this.props.track.id);
    var canvas = document.getElementById('canvas-'+this.props.track.id);
    var ctx = canvas.getContext('2d');
    var width = 500;
    var height = 100;
    var barWidth = width / 140 - 2;
    var totalTime = audio.duration * 1000;
    // console.log(totalTime);
    var timePerBar = totalTime / 140;
    var framesPerBar = timePerBar / 20;
    console.log(framesPerBar);
    var widthPerFrame = barWidth / framesPerBar;
    var i = 0;
    var counter = 0;
    var amps = this.props.track.amplitudes;
    var renderWF = function () {
      // console.log(amps.length)
      if (i > amps.length) {
        clearInterval(interval);
        return;
      }
      ctx.clearRect(0,0,width,height);
      for (var j = 0; j < i; j++) {
        ctx.fillStyle = "#F46A0D";
        // debugger;
        ctx.fillRect(1 + j * width / 140,
          (height / 2) - (amps[j] / 100),
          barWidth,
          (amps[j] / 100) * 2);
      }
      ctx.fillStyle = "#F46A0D";
      ctx.fillRect(1 + i * width / 140,
        (height / 2) - (amps[i] / 100),
        counter * widthPerFrame,
        (amps[i] / 100) * 2);
      ctx.fillStyle = "#3F3D3B";
      ctx.fillRect(1 + i * width / 140 + counter * widthPerFrame,
        (height / 2) - (amps[i] / 100),
        barWidth - counter * widthPerFrame,
        (amps[i] / 100) * 2);
      for (var k = i + 1; k < amps.length; k++) {
        ctx.fillStyle = "#3F3D3B";
        ctx.fillRect(1 + k * width / 140,
          (height / 2) - (amps[k] / 100),
          barWidth,
          (amps[k] / 100) * 2);
      }
      counter++;
      if (counter >= Math.floor(framesPerBar)) {
        i++;
        counter = 0;
      }
    };
    var interval = setInterval(renderWF, 20);
    audio.play();
  },
  sendTicker: function (e, bool) {
    // debugger
    bool = bool || false;
    if (e.currentTarget.classList[0] === 'play-button-container') {
      $(e.currentTarget).toggleClass("playing");
    }
    var audio = document.getElementById("track-audio" + this.props.track.id);
    var tick = document.getElementById("small-rect " + this.props.track.id);
    $(tick).addClass('move');
    var pos = parseInt($(tick).css('left').slice(0,-2));
    var duration = Math.floor(audio.duration)
    var timeRemaining = duration - Math.floor((pos / 300) * duration);
    tick.style['transition-duration'] = timeRemaining.toString() + "s";
    if (audio.paused) {
      if (!bool) ApiUtil.newTrackPlaying(this.props.track.id);
      audio.play();
      $(tick).addClass('ended');
    }
    else {
      $(tick).removeClass('move')
      $(tick).toggleClass('ended');
      audio.pause();
    }
  },
  seek: function (e) {
    var audio = document.getElementById("track-audio" + this.props.track.id);
    if (audio.paused) return;
    // audio.pause();
    var tick = document.getElementById("small-rect " + this.props.track.id);
    var bounds = e.currentTarget.getBoundingClientRect();
    var playerLength = bounds.right - bounds.left;
    var newTime = Math.floor(((e.clientX - bounds.left) / playerLength) * audio.duration);
    var newTransDuration = Math.floor(audio.duration - newTime);
    $(tick).toggleClass('ended');
    $(tick).toggleClass('move');
    tick.style['left'] = (e.clientX - bounds.left).toString() + "px";
    tick.style['transition-duration'] = newTransDuration.toString() + "s";
    $(tick).toggleClass('move');
    $(tick).toggleClass('ended');
    tick.style['left'] = '300px';
    audio.currentTime = newTime;
    // this.sendTicker(e, true);
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
