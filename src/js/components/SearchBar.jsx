import React, { PureComponent } from 'react';
import Checkbox from 'material-ui/Checkbox';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { SEARCH_URL } from '../settings';
import { debounce } from '../utils';

/**
* _sameSearchTerm returns whether or not a new and old search terms
* are similar.
*
* @param {str}   searchTerm - new search searchTerm
* @param {str}   old - previous search searchTerm, from local state
* @return {bool}
*/
const _sameSearchTerm = (searchTerm, old) => searchTerm.trim() === old.trim();

export class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '', startsWithSearch: true };
  }

  componentDidMount() {
    // on start focus the input to hint for a user to search
    this.textField.focus();
  }

  componentDidUpdate(previousProps, previousState) {
    // re-run search?
    if (previousState.startsWithSearch !== this.state.startsWithSearch) {
      this.handleSearch(null, this.state.searchTerm, true);
    }
  }

  buildApiUrl(state = this.state) {
    const baseSearchUrl = `${SEARCH_URL}${state.searchTerm.toLowerCase()}`;
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
  * @param {str}    searchTerm - user-entered search term
  * @param {bool}   force - should the search be programmatically forced?
  * @return {obj}   Promise - resulting Promise of fetch call
  */
  handleSearch(e, searchTerm, force) {
    const oldSearchTerm = this.state.searchTerm;
    // * if 'force' param is 'true', this is bypassed
    // * save on API calls
    if (force !== true && _sameSearchTerm(searchTerm, oldSearchTerm)) {
      return false;
    }

    // * if user clears box, clear search
    // * save on API calls
    if (searchTerm === '') {
      this.props.onSearchClear();
      // set new state of searchTerm
      this.setState({ searchTerm });
      return false;
    }

    // percent-encode search term
    const encodeSearchTerm = encodeURIComponent(searchTerm.toLowerCase());
    // store new term for comparison
    this.setState({ searchTerm: encodeSearchTerm });

    // start spinner wheel
    this.setState({ fetchingResults: true });
    // call API for results
    return fetch(this.buildApiUrl())
      .then((res) => res.json())
      // give results back to parent component
      .then((json) => this.props.onSearchChange(json, searchTerm))
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
            onChange={debounce(this.handleSearch.bind(this), 500)}
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
          defaultChecked
          className="search__option"
          iconStyle={{ fill: this.state.startsWithSearch ?
            'rgba(242,101,50,1)' :
            'rgba(248,170,142,1)',
          }}
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
