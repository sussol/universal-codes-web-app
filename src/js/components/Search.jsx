import React, { PureComponent } from 'react';

import { ResultsTable } from './ResultsTable.jsx';
import { SearchBar } from './SearchBar.jsx';

export class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showResults: false };
  }

  // respond to search input
  handleSearchChange(data, searchTerm) {
    if (!data || !data.length) this.setState({ showResults: false });
    this.setState({ showResults: true, resultData: data, searchTerm });
  }

  render(props) {
    return (
      <div style={{ position: 'relative' }}>
        <SearchBar
          className="search-bar"
          onSearchChange={(data, searchTerm) => (
            this.handleSearchChange(data, searchTerm)
          )}
          onSearchClear={() => this.handleSearchChange(null)}
        />
        {/* render results table */}
        {this.state.showResults && <ResultsTable
          {...props}
          data={this.state.resultData}
          numberOfResults={this.state.resultData.length}
          searchTerm={this.state.searchTerm}
        />}
      </div>
    );
  }
}
