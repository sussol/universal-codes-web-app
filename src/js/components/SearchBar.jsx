import React, { PureComponent } from 'react';
import Checkbox from 'material-ui/Checkbox';
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
    this.state = { value: '', userExactSetting: false, userFuzzySetting: true };
  }

  componentDidMount() {
    // on start focus the input to hint for a user to search
    this.textField.focus();
  }

  componentDidUpdate(previousProps, previousState) {
    // re-run search?
    if (previousState.userFuzzySetting !== this.state.userFuzzySetting) {
      this.handleSearch(null, this.state.value, true);
    }
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

    // store new term for comparison
    this.setState({ value });

    // * if user clears box, clear search
    // * save on API calls
    if (value === '') return this.props.onSearchClear();

    const encodeValue = encodeURIComponent(value.toLowerCase());
    // set URL
    const exactSettingParameter = `&exact=${String(this.state.userExactSetting)}`;
    const fuzzySettingParameter = `&fuzzy=${String(this.state.userFuzzySetting)}`;
    const url = `${SEARCH_URL}${encodeValue}${exactSettingParameter}${fuzzySettingParameter}`;
    // call API for results
    return fetch(url)
      .then((res) => res.json())
      // give results back to parent component
      .then((json) => this.props.onSearchChange(json, value));
  }

  /**
  * onChangeUserSearchSetting toggles "exact" and "fuzzy" on/off when 'Exact search' is checked
  *
  * @param {bool}    isChecked - is the input selected or not
  * @returns {obj}   new state of object
  */
  onChangeUserSearchSetting(isChecked) {
    // toggle old state
    return this.setState({ userExactSetting: isChecked, userFuzzySetting: !isChecked });
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
          {/* search icon */}
          <SearchIcon
            alt="search"
            className="icon-search"
            color={'#CCC'}
          />
        </div>

        {/* exact search */}
        <Checkbox
          iconStyle={{ fill: this.state.userFuzzySetting ?
            'rgba(248,170,142,1)' :
            'rgba(242,101,50,1)',
          }}
          className="search__option"
          label="Exact search"
          labelStyle={{ color: '#777' }}
          onCheck={(e, isChecked) => this.onChangeUserSearchSetting(isChecked)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};
