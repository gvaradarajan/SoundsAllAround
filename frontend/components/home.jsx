var React = require('react');
var PropTypes = React.PropTypes;
var AllTracks = require('./all_tracks');

var Home = React.createClass({

  render: function() {
    return (
      <section className="content">
        <header className="banner">
        </header>
        <h1 className="index-track-header">Hear the latest hits!</h1>
        <AllTracks />
      </section>
    );
  }

});

module.exports = Home;
