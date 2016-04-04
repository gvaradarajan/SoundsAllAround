var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
var TrackIndexItem = require('./track_index_item');
var ApiUtil = require('../util/api_util');

var SearchTracksForm = React.createClass({
  getInitialState: function () {
    return { searchResults: [], chosenTrack: null, field: "" };
  },
  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onSearch);
    ApiUtil.fetchAllTracks();
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
  },
  _onSearch: function () {
    this.setState({ searchResults: TrackStore.searchResults() });
  },
  updateField: function (e) {
    if (e.currentTarget.value.length > 2) {
      ApiUtil.getSearchResults({ search: { query: e.currentTarget.value } });
    }
    this.setState({ field: e.currentTarget.value });
  },
  chooseTrack: function (e) {
    var track = TrackStore.find(e.currentTarget.id);
    this.setState({chosenTrack: track});
  },
  render: function () {
    var searchArr = this.state.searchResults;
    var searchResultItems = searchArr && searchArr.map(function (track) {
      return (
        <li key={track.id} id={track.id} onClick={this.props.chooseTrack}>
          {track.title}: {track.artist}
        </li>
      );
    }.bind(this));
    return (
        <section className="cred-form">
          <h1 className="header">Add a track</h1>
          <label className="search label" >
            Search By Title or Artist:
          </label>
          <input onChange={this.updateField} className="search field"
            type="text" name="search[query]" value={this.state.field} />
          <ul>
            {searchResultItems}
          </ul>
        </section>
    );
  }

});

module.exports = SearchTracksForm;
