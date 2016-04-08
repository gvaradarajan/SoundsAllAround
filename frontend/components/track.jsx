var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
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
    // audio.addEventListener('metadataloaded', function (e) {
    //   var bar = $('.main-track-small-rect')[0];
    //   var time = e.currentTarget.duration;
    //   bar.style['transition-duration'] = Math.floor(time).toString() + "s";
    // });
    this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
    this.listenerToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchSingleTrack(this.props.params.id, function () {
    });
  },
  componentWillUnmount: function () {
    var audio = document.getElementById('audio');
    audio.removeEventListener("ended");
    this.listenerToken.remove();
  },
  linkToPlaylist: function (playlist_id) {
    this.context.router.push("/playlists/" + playlist_id);
  },
  receiveEndOfAudio: function (e) {
    $('.main-track-small-rect')[0].style.transitionDuration = '0s';
    $('.main-track-small-rect').removeClass('ended');
  },
  sendTicker: function (){
    var audio = document.getElementById('audio');
    $('.main-track-small-rect')[0].style['transition-duration'] = Math.floor(audio.duration).toString() + "s";
    this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
    if (audio.paused) {
      // $('.main-track-small-rect').addClass('move');
      audio.play();
      $('.main-track-small-rect').toggleClass('main-ended');
      // debugger
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
    var track = this.state.track;
    var title = track && track.title;
    var artist = track && track.artist;
    var playlistItems = track && track.playlists && track.playlists.map(function (playlist) {
      return <li key={playlist.id}
              onClick={this.linkToPlaylist.bind(this, playlist.id)}>{playlist.title}</li>;
    }.bind(this));
    var audio = track && track.audio;
    return (
      <div className="track-show content">
        <header className="track-banner banner">
          <h1 className="track-heading">{title}</h1>
          <h1 className="artist-heading">{artist}</h1>
          <div className="main-track-big-rect" onClick={this.sendTicker}>
            <div className="main-track-small-rect move" id="small-rect">
            </div>
          </div>
          <div className="track-image-container">
            <img src={track ? track.image : ""} />
          </div>
        </header>
        <audio id="audio" ref="audio_tag" src={audio} />
        <h1 className="page-header">Playlists That Include This Track: </h1>
        <ul className="track-playlists group">
          {playlistItems}
        </ul>
      </div>
    );
  }

});

module.exports = Track;
