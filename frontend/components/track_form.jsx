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
             audioFile: "",
             audioFileName: "",
             imageUrl: "",
             imageFile: "",
             imageFileName: "" };
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
    data.append("track[image]", this.state.imageFile);
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
  updateImageFile: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function () {
      this.setState({ imageFileUrl: reader.result,
                      imageFile: file,
                      imageFileName: file.name });
    }.bind(this);
    reader.readAsDataURL(file);
  },
  render: function() {
    return (
      <section>
        <h1 className="track-form-header page-header">Add New Track</h1>
        <form className="track-form cred-form">
          <label className="track-title label" htmlFor="title">
            Title:
          </label>
          <input onChange={this.updateTitle} className="track-title field"
            type="text" name="track[title]" value={this.state.title} />

          <label className="track-audio label" htmlFor="title">
            Audio File:
          </label>
          <input type="file" onChange={this.updateAudioFile}/>

          <label className="track-image label" htmlFor="title">
            Album Picture:
          </label>
          <input type="file" onChange={this.updateImageFile}/>

          <label className="preview label" htmlFor="title">
            Preview:
          </label>

          <img className="profile-pic" src={this.state.imageFileUrl} />

          <input className="submit-button"
            type="submit" value="Create Track" onClick={this.handleSubmit}/>
        </form>
      </section>
    );
  }

});

module.exports = TrackForm;
