var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
var PlaylistIndexItem = require('./playlist_index_item');
var ApiUtil = require('../util/api_util');

var Track = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { track: TrackStore.find(this.props.params.id) };
  },
  _onChange: function () {
    this.setState({ track: TrackStore.find(this.props.params.id) });
  },
  componentWillReceiveProps: function (newProps) {
    this.setState({ track: TrackStore.find(newProps.params.id) });
  },
  componentDidMount: function () {
    var audio = document.getElementById('audio');
    this.listenerToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchSingleTrack(this.props.params.id, this.drawWaveform);
  },
  componentWillUnmount: function () {
    var audio = document.getElementById('audio');
    this.listenerToken.remove();
  },
  canvasPlay: function (e) {
    if (e.currentTarget.classList[0] === 'play-button-container') {
      $(e.currentTarget).toggleClass("playing");
    }
    var audio = document.getElementById("track-audio " + this.props.params.id);
    if (!audio.paused) {
      audio.pause();
      return;
    }
    else {
      audio.play();
    }
    var canvas = document.getElementById('canvas-' + this.props.params.id);
    var ctx = canvas.getContext('2d');
    var width = 700;
    var height = 100;
    var barWidth = width / 140 - 2;
    var totalTime = audio.duration * 1000;
    var timePerBar = totalTime / 140;
    var framesPerBar = timePerBar / 20;
    var widthPerFrame = barWidth / framesPerBar;
    this.currBar = 0;
    this.counter = 0;
    var amps = this.state.track.amplitudes;
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
      ctx.fillStyle = "#ccc";
      ctx.fillRect(1 + this.currBar * width / 140 + this.counter * widthPerFrame,
        (height / 2) - (amps[this.currBar] / 150),
        barWidth - this.counter * widthPerFrame,
        (amps[this.currBar] / 150) * 2);
      for (var k = this.currBar + 1; k < amps.length; k++) {
        ctx.fillStyle = "#ccc";
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
  drawWaveform: function () {
    var amps = this.state.track.amplitudes;
    if (amps) {
      var canvas = document.getElementById('canvas-'+this.props.params.id);
      var ctx = canvas.getContext('2d');
      var width = 700;
      var height = 100;
      ctx.clearRect(0,0,width,height);
      var barWidth = width / 140 - 2;
      for (var k = 0; k < amps.length; k++) {
        ctx.fillStyle = "#ccc";
        ctx.fillRect(1 + k * width / 140,
                     (height / 2) - (amps[k] / 150),
                     barWidth,
                     (amps[k] / 150) * 2);
      }
    }
  },
  generatePlayButton: function () {
    var button = "";
    var id = this.props.params.id;
    return (
      <div id={'play-'+id} className="play-button-container"
        onClick={this.canvasPlay}>
      </div>
    );
  },
  linkToPlaylist: function (playlist_id) {
    this.context.router.push("/playlists/" + playlist_id);
  },
  receiveEndOfAudio: function (e) {
    var tick = document.getElementById("small-rect " + this.props.params.id);
    $('.play-button-container').removeClass('playing');
    var amps = this.state.track.amplitudes;
    if (amps) {
      clearInterval(this.canvasPlayToken);
      this.drawWaveform();
    }
  },
  seek: function (e) {
    var container = e.currentTarget.getBoundingClientRect();
    var leftDis = e.clientX - container.left;
    var ratio = (leftDis - 1) / 700;
    var audio = document.getElementById("track-audio " + this.props.params.id);
    audio.currentTime = audio.duration * ratio;
  },
  render: function() {
    var track = this.state.track;
    var id = track && track.id;
    var title = track && track.title;
    var artist = track && track.artist;
    var playlistItems = track && track.playlists && track.playlists.map(function (playlist) {
      return <PlaylistIndexItem key={playlist.id}
              playlist={playlist}
              onClick={this.linkToPlaylist.bind(this, playlist.id)} />;
    }.bind(this));
    var audio = track && track.audio;
    return (
      <div className="track-show content">
        <header className="track-banner banner">
          <h1 className="track-heading">{title}</h1>
          <h1 className="artist-heading">{artist}</h1>
          {this.generatePlayButton()}
          <canvas id={"canvas-" + id} className="show-canvas" width="700" height="100"
                  onClick={this.seek} />
          <div className="track-image-container">
            <img src={track ? track.image : ""} />
          </div>
        </header>
        <audio id={"track-audio " + id} ref="audio_tag" src={audio} onEnded={this.receiveEndOfAudio}/>
        <h1 className="page-header">Playlists That Include This Track: </h1>
        <ul className="track-playlists group">
          {playlistItems}
        </ul>
      </div>
    );
  }

});

module.exports = Track;
