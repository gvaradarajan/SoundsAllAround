var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');

var UploadForm = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function() {
    return {
      imageFile: null,
      imageUrl: ""
    };
  },
  handleChange: function (e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];
    reader.onloadend = function () {
      this.setState({ imageUrl: reader.result, imageFile: file });
    }.bind(this);
    reader.readAsDataURL(file);
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var router = this.context.router;
    var newImageData = new FormData();
    newImageData.append("user[image]", this.state.imageFile);
    ApiUtil.updateUser(this.props.id, newImageData, function (id) {
      router.push("/users/" + id);
      this.props.fxn();
    }.bind(this));
  },
  render: function() {
    return (
      <form>
        <h1>Select a File To Upload</h1>
        <input type="file" onChange={this.handleChange}></input>
        <label className="selected-track label">
          Preview:
        </label>
        <img className="profile-pic" src={this.state.imageUrl} />
        <input className="submit-button"
          type="submit" value="Update Picture" onClick={this.handleSubmit}/>
      </form>
    );
  }

});

module.exports = UploadForm;
