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
    // audio.addEventListener('metadataloaded', function (e) {
    //   var bar = $('.main-track-small-rect')[0];
    //   var time = e.currentTarget.duration;
    //   bar.style['transition-duration'] = Math.floor(time).toString() + "s";
    // });
    this.listenerToken = TrackStore.addListener(this._onChange);
    ApiUtil.fetchSingleTrack(this.props.params.id, function () {
    });
  },
  componentWillUnmount: function () {
    var audio = document.getElementById('audio');
    this.listenerToken.remove();
  },
  generatePlayButton: function () {
    var button = "";
    var id = this.props.params.id;
    return (
      <div id={'play-'+id} className="play-button-container"
        onClick={this.sendTicker}>
      </div>
    );
  },
  linkToPlaylist: function (playlist_id) {
    this.context.router.push("/playlists/" + playlist_id);
  },
  receiveEndOfAudio: function (e) {
    var tick = document.getElementById("small-rect " + this.props.params.id);
    $('.play-button-container').removeClass('playing');
    tick.style['transition-duration'] = '0s';
    $(tick).removeClass('big-ended');
  },
  sendTicker: function (e) {
    if (e.currentTarget.classList[0] === 'play-button-container') {
      $(e.currentTarget).toggleClass("playing");
    }
    var audio = document.getElementById("track-audio " + this.props.params.id);
    var tick = document.getElementById("small-rect " + this.props.params.id);
    $(tick).addClass('move');
    var pos = parseInt($(tick).css('left').slice(0,-2));
    var duration = Math.floor(audio.duration)
    var timeRemaining = duration - Math.floor((pos / 520) * duration);
    tick.style['transition-duration'] = timeRemaining.toString() + "s";
    if (audio.paused) {
      audio.play();
      $(tick).addClass('big-ended');
    }
    else {
      $(tick).removeClass('move')
      $(tick).toggleClass('big-ended');
      audio.pause();
    }
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
          <div className="main-track-big-rect">
            <div className="main-track-small-rect" id={"small-rect " + id}>
            </div>
          </div>
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
