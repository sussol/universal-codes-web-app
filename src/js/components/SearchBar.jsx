import React, { PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { SEARCH_URL } from '../settings';

/**
* Debounce active update of table data
*
* @param  {func}   func - heavy function to stall
* @param  {int}    wait - interval to call func
* @param  {bool}   immediate - run now
* @return {func}
*/
function _debounce(func, wait, immediate) {
  // init
  let timeout;
  // return closure so timeouts survive
  // only to cancel them
  return function debouncer(...args) {
    const context = this;
    function later() {
      // reset timeout
      timeout = null;
      // run func
      if (!immediate) func.apply(context, args);
    }
    const callNow = immediate && !timeout;
    // clear previous timer from closure
    // and start over
    clearTimeout(timeout);
    // start new wait tick
    timeout = setTimeout(later, wait);
    // call func now
    if (callNow) func.apply(context, args);
  };
}

/**
* _sameSearchTerm returns whether or not a new and old search terms
* are similar.
*
* @param {str}   value - new search value
* @param {str}   old - previous search value, from local state
* @return {bool}
*/
const _sameSearchTerm = (value, old) => value.trim() === old.trim();

export class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    // on start focus the input to hint for a user to search
    this.textField.focus();
  }

  buildApiUrl(state = this.state) {
    const baseSearchUrl = `${SEARCH_URL}${state.value.toLowerCase()}`;
    const startsWith = state.startsWithSearch;
    if (startsWith === false || startsWith === undefined) {
      return `${baseSearchUrl}&fuzzy=true`;
    }
    return `${baseSearchUrl}&exact=false`;
  }

  handleSearch(e, value) {
    const oldValue = this.state.value;
    // save on API calls
    if (value === '' || _sameSearchTerm(value, oldValue)) {
      return false;
    }

    // store new term for comparison
    this.setState({ value });

    // call API for search term
    return fetch(this.buildApiUrl())
      .then((res) => res.json())
      .then((json) => this.props.onSearchChange(json, value));
  }

  render() {
    return (
      <div className="search-wrap-flex">
        {/* search field */}
        <TextField
          className="search-bar"
          floatingLabelStyle={{ color: 'rgb(242, 101, 50)' }}
          floatingLabelText="Search by generic name or code"
          // accommodate slower typists
          onChange={_debounce(this.handleSearch.bind(this), 500)}
          ref={(input) => (this.textField = input)}
          underlineFocusStyle={{
            borderBottomColor: 'rgba(242, 101, 50, 0.55)',
            borderTopColor: 'rgba(242, 101, 50, 0.55)',
            borderLeftColor: 'rgba(242, 101, 50, 0.55)',
            borderRightColor: 'rgba(242, 101, 50, 0.55)',
          }}
          underlineStyle={{
            borderBottomColor: '#DDD',
          }}
        />
        {/* search icon */}
        <SearchIcon
          alt="search"
          className="icon-search"
          color={'#CCC'}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};
