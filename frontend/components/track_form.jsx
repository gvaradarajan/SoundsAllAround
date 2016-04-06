var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var UserStore = require('../stores/user_store');

var TrackForm = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { title: "",
             artist_id: this.props.id,
             audioUrl: "",
             audioFile: null,
             audioFileName: "" };
  },
  componentDidMount: function () {
    this.listenerToken = UserStore.addListener(this.resetForm);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  updateTitle: function (e){
    this.setState({ title: e.currentTarget.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var router = this.context.router;
    // var data = { track: this.state };
    var data = new FormData();
    data.append("track[title]", this.state.title);
    data.append("track[artist_id]", this.state.artist_id);
    data.append("track[audio]", this.state.audioFile);
    ApiUtil.createTrack(data, function (id) {
      router.push("/users/" + id + "/tracks");
    });
  },
  resetForm: function () {
    this.setState({ title: "",
                    artist_id: this.props.id,
                    audioUrl: "",
                    audioFile: null,
                    audioFileName: "" });
  },
  updateAudioFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function () {
      this.setState({ audioFileUrl: reader.result,
                      audioFile: file,
                      audioFileName: file.name });
    }.bind(this);
    reader.readAsDataURL(file);
  },
  render: function() {
    return (
      <section>
        <form className="track-form cred-form">

          <h1 className="track-form-header">Add New Track</h1>

          <label className="track-title label" htmlFor="title">
            Title:
          </label>
          <input onChange={this.updateTitle} className="track-title field"
            type="text" name="track[title]" value={this.state.title} />

          <input type="file" onChange={this.updateAudioFile}/>

          <input className="submit-button"
            type="submit" value="Create Track" onClick={this.handleSubmit}/>
        </form>
      </section>
    );
  }

});

module.exports = TrackForm;
