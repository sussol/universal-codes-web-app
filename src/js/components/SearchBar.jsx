import React, { PureComponent } from 'react';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
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
    this.state = { value: '', startsWithSearch: false };
  }

  componentDidMount() {
    // on start focus the input to hint for a user to search
    this.textField.focus();
  }

  componentDidUpdate(previousProps, previousState) {
    // re-run search?
    if (previousState.startsWithSearch !== this.state.startsWithSearch) {
      this.handleSearch(null, this.state.value, true);
    }
  }

  buildApiUrl(state = this.state) {
    const baseSearchUrl = `${SEARCH_URL}${state.value.toLowerCase()}`;
    const startsWith = state.startsWithSearch;
    if (startsWith === false || startsWith === undefined) {
      return `${baseSearchUrl}&fuzzy=true`;
    }
    return `${baseSearchUrl}&exact=false`;
  }

  /**
  * handleSearch will call the API to search with the user-entered term
  *
  * @param {obj}    e - javascript Event() object
  * @param {str}    value - user-entered search term
  * @param {bool}   force - should the search be programmatically forced?
  * @return {obj}   Promise - resulting Promise of fetch call
  */
  handleSearch(e, value, force) {
    const oldValue = this.state.value;
    // * if 'force' param is 'true', this is bypassed
    // * save on API calls
    if (force !== true && _sameSearchTerm(value, oldValue)) {
      return false;
    }

    // * if user clears box, clear search
    // * save on API calls
    if (value === '') {
      this.props.onSearchClear();
      // set new state of value
      this.setState({ value });
      return false;
    }

    // percent-encode search term
    const encodeValue = encodeURIComponent(value.toLowerCase());
    // store new term for comparison
    this.setState({ value: encodeValue });

    // start spinner wheel
    this.setState({ fetchingResults: true });
    // call API for results
    return fetch(this.buildApiUrl())
      .then((res) => res.json())
      // give results back to parent component
      .then((json) => this.props.onSearchChange(json, value))
      .then(() => this.setState({ fetchingResults: false }));
  }

  /**
  * onChangeUserSearchSetting toggles "exact" on/off when 'Exact search' is acted upon
  *
  * @param {bool}    isChecked - is the input selected or not; default is 'false'
  * @returns {obj}   new state of object
  */
  onChangeUserSearchSetting(isChecked) {
    // toggle old state
    return this.setState({ startsWithSearch: isChecked });
  }

  render() {
    return (
      <div>
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
          {/* progress indicator */}
          {this.state.fetchingResults &&
            <CircularProgress
              color="rgb(248, 170, 142)"
              size={16}
              style={{ width: 0, left: '-24px' }}
              thickness={2}
            />
          }
          {/* search icon */}
          <SearchIcon
            alt="search"
            className="icon-search"
            color={'#CCC'}
          />
        </div>

        {/* exact search */}
        <Checkbox
          iconStyle={{ fill: this.state.startsWithSearch ?
            'rgba(242,101,50,1)' :
            'rgba(248,170,142,1)',
          }}
          className="search__option"
          label="Name or code begins with"
          labelStyle={{ color: '#777', marginLeft: '-12px' }}
          onCheck={(e, isChecked) => this.onChangeUserSearchSetting(isChecked)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};
