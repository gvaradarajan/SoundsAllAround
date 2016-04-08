var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
var ApiUtil = require('../util/api_util');

var Track = React.createClass({
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
    this.listenerToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchSingleTrack(this.props.params.id, function () {

    });
  },
  componentWillUnmount: function () {
    var audio = document.getElementById('audio');
    //audio.removeEventListener(this.audioListenerToken);
    this.listenerToken.remove();
  },
  linkToPlaylist: function (playlist_id) {
    this.context.router.push("/playlists/" + playlist_id);
  },
  receiveEndOfAudio: function (e) {
    $('.small-rect')[0].style['transition-duration'] = '0s';
    $('.small-rect').removeClass('ended');
  },
  sendTicker: function (){
    var audio = document.getElementById('audio');
    $('.move')[0].style['transition-duration'] = Math.floor(audio.duration).toString() + "s";
    this.audioListenerToken = audio.addEventListener("ended", this.receiveEndOfAudio);
    if (audio.paused) {
      // $('.small-rect').addClass('move');
      audio.play();
      $('.small-rect').toggleClass('ended');
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
    var el = track && track.audio && (<audio id="audio" ref="audio_tag" src={track.audio} />);
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
        {el}
        <h1 className="page-header">Playlists That Include This Track: </h1>
        <ul className="track-playlists group">
          {playlistItems}
        </ul>
      </div>
    );
  }

});

module.exports = Track;
