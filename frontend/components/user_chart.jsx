var React = require('react');
var PropTypes = React.PropTypes;

var AllPlaylists = require('./all_playlists');
var AllTracks = require('./all_tracks');

var UserChart = React.createClass({

  render: function() {
    return (
      <div className="chart">
        <AllPlaylists />
        <h1 className="page-header">Top Tracks:</h1>
        <AllTracks />
      </div>
    );
  }

});

module.exports = UserChart;
