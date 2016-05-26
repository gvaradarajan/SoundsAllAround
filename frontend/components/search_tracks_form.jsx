var React = require('react');
var PropTypes = React.PropTypes;
var TrackStore = require('../stores/track_store');
var TrackIndexItem = require('./track_index_item');
var ApiUtil = require('../util/api_util');
var UserStore = require('../stores/user_store');

var SearchTracksForm = React.createClass({
  getInitialState: function () {
    return { searchResults: [], field: "" };
  },
  componentDidMount: function () {
    this.listenerToken = TrackStore.addListener(this._onSearch);
    this.searchResetToken = UserStore.addListener(this.resetForm);
    ApiUtil.fetchAllTracks();
  },
  componentWillUnmount: function () {
    this.listenerToken.remove();
    this.searchResetToken.remove();
    ApiUtil.clearSearchResults();
  },
  _onSearch: function () {
    this.setState({ searchResults: TrackStore.searchResults() });
  },
  resetForm: function () {
    this.setState({ searchResults: [], field: "" })
  },
  updateField: function (e) {
    if (e.currentTarget.value.length > 2) {
      ApiUtil.getSearchResults({ search: { query: e.currentTarget.value } });
    }
    else {
      ApiUtil.clearSearchResults();
    }
    this.setState({ field: e.currentTarget.value });
  },
  chooseTrack: function (e) {
    this.props.chooseTrack(e);
    this.setState({field: "", searchResults: []});
  },
  render: function () {
    var searchArr = this.state.searchResults;
    var searchResultItems = searchArr && searchArr.map(function (track) {
      return (
        <li key={track.id} id={track.id} onClick={this.chooseTrack}
          className="search-result-item">
          {track.title}: {track.artist}
        </li>
      );
    }.bind(this));
    return (
        <section className="track-search">
          <label className="search label" >
            Search For A Track By Title or Artist:
          </label>
          <input onChange={this.updateField} className="field"
            type="text" name="search[query]" value={this.state.field} />
          <ul className="search-result-list">
            {searchResultItems}
          </ul>
        </section>
    );
  }

});

module.exports = SearchTracksForm;
