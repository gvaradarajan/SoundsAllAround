var React = require('react');
var PropTypes = React.PropTypes;

var TrackForm = React.createClass({

  render: function() {
    return (
      <section>
        <h1 className="track-form-header">Add New Playlist</h1>
        <form className="track-form cred-form">
          <label className="track-title label" htmlFor="title">
            Title:
          </label>
          <input onChange={this.updateTitle} className="track-title field"
            type="text" name="track[title]" value={this.state.title} />
          <input className="submit-button"
            type="submit" value="Create Track" onClick={this.handleSubmit}/>
        </form>
      </section>
    );
  }

});

module.exports = TrackForm;
