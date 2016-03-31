var React = require('react');
var PropTypes = React.PropTypes;

var PlaylistIndexItem = React.createClass({

  render: function() {
    var title = this.props.playlist && this.props.playlist.title;
    var des = this.props.playlist && this.props.playlist.description;
    var artist = this.props.playlist && this.props.playlist.artist;
    return (
      <li>
        <h1>{title}: {des}</h1>
        <p>{artist}</p>
      </li>
    );
  }

});

module.exports = PlaylistIndexItem;
