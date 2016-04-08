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
      return <li key={playlist.id}>{playlist.title}</li>;
    });
    var el = this.state.track && this.state.track.audio && (<audio id="audio" ref="audio_tag" src={this.state.track.audio} />);
    return (
      <div>
        <h1>{title}</h1>
        <h2>{artist}</h2>
        {el}
        <ul>
          {playlistItems}
        </ul>
        <div className="big-rect" onClick={this.sendTicker}>
          <div className="small-rect move" id="small-rect">
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Track;
