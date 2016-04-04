var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../util/api_util');
var UserStore = require('../stores/user_store');

var TrackForm = React.createClass({
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getInitialState: function () {
    return { title: "", artist_id: this.props.id };
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
    var data = { track: this.state };
    ApiUtil.createTrack(data, function (id) {
      router.push("/users/" + id + "/tracks");
    });
  },
  resetForm: function () {
    this.setState({ title: "", artist_id: this.props.id });
  },
  render: function() {
    return (
      <section>
        <h1 className="track-form-header">Add New Track</h1>
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
