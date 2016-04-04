var React = require('react');
var PropTypes = React.PropTypes;
var TrackIndexItem = require('./track_index_item');
var TrackForm = require('./track_form');
var UserStore = require('../stores/user_store');
var ApiUtil = require('../util/api_util');
var CurrentUserStore = require('../stores/current_user_store');

var TrackIndex = React.createClass({
  getInitialState: function () {
    return { user: UserStore.find(this.props.params.id) };
  },
  componentWillReceiveProps: function () {
    this._onChange();
  },
  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this._onChange);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onChange: function () {
    this.setState ({ user: UserStore.find(parseInt(this.props.params.id)) });
  },
  createFormForCurrentUser: function () {
    var form = "";
    var currentUserId = (
      !CurrentUserStore.currentUser() ? NaN : CurrentUserStore.currentUser().id
    );
    var thisUserId = !this.state.user ? NaN : this.state.user.id;
    if (currentUserId === thisUserId) {
      form = <TrackForm id={thisUserId} />;
    }
    return form;
  },
  render: function() {
    var id = this.state.user && this.state.user.id;
    var tracks = this.state.user && this.state.user.tracks;
    var trackItems = tracks && tracks.map(function (track) {
      return <TrackIndexItem key={track.id} track={track} />;
    });
    return (
      <div className="tracks-index">
        <h1 className="tracks-header">Tracks:</h1>
        <ul className="all-tracks group">
          {trackItems}
        </ul>
        {this.createFormForCurrentUser()}
      </div>
    );
  }

});

module.exports = TrackIndex;
