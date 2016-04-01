var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var TrackIndexItem = React.createClass({
  render: function() {
    var title = this.props.track && this.props.track.title;
    var artist = this.props.track && this.props.track.artist;
    return (
      <li className="track">
        <h1>{title}</h1>
        <p>{artist}</p>
      </li>
    );
  }
});

module.exports = TrackIndexItem;
