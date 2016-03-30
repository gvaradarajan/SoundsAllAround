var React = require('react');
var PropTypes = React.PropTypes;

var PlaylistIndexItem = React.createClass({

  render: function() {
    var title = this.props.playlist && this.props.playlist.title;
    var des = this.props.playlist && this.props.playlist.description;
    return (
      <li>{title}: {des}</li>
    );
  }

});

module.exports = PlaylistIndexItem;
