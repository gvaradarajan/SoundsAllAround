var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');

module.exports = {
  receiveSearchResults: function (results) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.SEARCH_RESULTS_RECEIVED,
      results: results
    });
  }
};
