var React = require('react');
var PropTypes = React.PropTypes;

var EditField = React.createClass({
  getInitialState: function () {
    return { field: this.props.field };
  },
  handleChange: function (e) {
    this.setState({ field: e.currentTarget.value });
  },
  handleSubmit: function (e) {
    this.props.handleSubmit(this.state.field, e);
  },
  render: function() {
    return (
        <form className="edit-field">
          <input className="edit field" value={this.state.field}
            onChange={this.handleChange} />
          <input className="submit-button"
            type="submit" value="Save" onClick={this.handleSubmit}/>
        </form>
    );
  }

});

module.exports = EditField;
