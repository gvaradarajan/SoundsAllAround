var React = require('react');
var PropTypes = React.PropTypes;

var PlaylistForm = React.createClass({
  
  render: function() {
    return (
      <form>
        <div>
          <input></input>
        </div>
        <div>
          <textarea></textarea>
        </div>
        <button>Create Playlist</button>
      </form>
    );
  }

});

module.exports = PlaylistForm;
