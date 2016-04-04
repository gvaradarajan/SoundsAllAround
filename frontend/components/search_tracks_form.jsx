var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
var ApiUtil = require('../util/api_util');

var SearchTracksForm = React.createClass({
  getInitialState: function () {
    return { searchResults: [], chosenTrack: null, field: "" };
  },
  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onSearch);
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onSearch: function () {
    this.setState({ searchResults: TrackStore.searchResults() });
  },
  updateField: function (e) {
    ApiUtil.getSearchResults({ search: { query: e.currentTarget.value } });
    this.setState({ field: e.currentTarget.value });
  },
  render: function () {
    var searchArr = this.state.searchResults;
    var searchResultItems = searchArr && searchArr.map(function (track) {
      return <li>{track.title}: {track.artist}</li>;
    });
    return (
      <section>
        <form className="cred-form">
          <h1 className="header">Add a track</h1>
          <label className="search label" >
            Search By Title or Artist:
            <input onChange={this.updateField} className="search field"
              type="text" name="search[query]" value={this.state.field} />
            <ul>
              {searchResultItems}
            </ul>
          </label>
        </form>
      </section>
    );
  }

});

module.exports = SearchTracksForm;
