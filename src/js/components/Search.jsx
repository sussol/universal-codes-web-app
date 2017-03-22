import React, { PureComponent } from 'react';

import { ResultsTable } from './ResultsTable.jsx';
import { SearchBar } from './SearchBar.jsx';

export class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showResults: false };
  }

  // @todo remove forced condition
  // respond to search input
  handleSearchChange(data, searchTerm) {
    if (!data.length) return this.setState({ showResults: false });
    return this.setState({ showResults: true, resultData: data, searchTerm });
  }

  render(props) {
    return (
      <div style={{ position: 'relative' }}>
        <SearchBar
          className="search-bar"
          onSearchChange={(data, searchTerm) => (
            this.handleSearchChange(data, searchTerm)
          )}
        />
        {/* render results table */}
        {this.state.showResults && <ResultsTable
          {...props}
          data={this.state.resultData}
          searchTerm={this.state.searchTerm}
        />}
      </div>
    );
  }
}
