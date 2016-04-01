var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var PlaylistForm = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { title: "", description: "", user_id: this.props.id };
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;
    var playlist = { playlist: this.state };
    ApiUtil.createAPlaylist(playlist, function(id) {
      router.push("/users/" + id);
    });
  },
  updateTitle: function(e) {
    this.setState({ title: e.currentTarget.value });
  },
  updateDescription: function(e) {
    this.setState({ description: e.currentTarget.value });
  },
  render: function() {
    return (
      <section>
        <h1 className="playlist-form-header">Add New Playlist</h1>
        <form className="playlist-form cred-form">
          <label className="playlist-title label" htmlFor="title">
            Title:
          </label>
          <input onChange={this.updateTitle} className="playlist-title field"
            type="text" name="playlist[title]" value={this.state.title} />
          <label className="playlist-description label" htmlFor="description">
            Description:
          </label>
          <textarea onChange={this.updateDescription} className="playlist-description field"
            type="text" name="playlist[description]" value={this.state.description} />
          <input className="submit-button"
            type="submit" value="Create Playlist" onClick={this.handleSubmit}/>
        </form>
      </section>
    );
  }

});

module.exports = PlaylistForm;
