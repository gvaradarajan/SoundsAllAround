var React = require('react');
var PropTypes = React.PropTypes;
var AllTracks = require('./all_tracks');

var Home = React.createClass({

  render: function() {
    return (
      <section>
        <header className="banner">
        </header>
        <AllTracks />
      </section>
    );
  }

});

module.exports = Home;
