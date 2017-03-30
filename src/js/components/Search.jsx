import React, { PureComponent } from 'react';

import { ResultsTable } from './ResultsTable.jsx';
import { SearchBar } from './SearchBar.jsx';

export class Search extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [{
        key: 'name',
        title: 'Name',
      }, {
        key: 'code',
        title: 'Code',
      }],
      columnWidths: [400, 135],
      showResults: false,
    };
  }

  // respond to search input
  handleSearchChange(data, searchTerm) {
    if (!data || !data.length) {
      // provide the table blank array for ".length"
      this.setState({ showResults: false, resultData: [] });
      // exit
      return;
    }
    this.setState({ showResults: true, resultData: data, searchTerm });
  }

  /**
  * handleCalculateColumnWidths
  *  - provides naïve, but sane, column widths
  *  - currently, simply divides columns into equal widths
  *
  * @param {columns}    columns - object of column data from Blueprint table
  * @param {obj}        table - referenced table DOM element
  * @returns {arr|null} array of new widths, or null
  */
  handleCalculateColumnWidths(columns, table) {
    if (columns === undefined || table === undefined) return null;
    // init array
    const columnWidths = [0, 0];
    const tableWrapWidthDivided = table.offsetWidth / columns.length;
    for (let i = 0; i < columnWidths.length; i += 1) {
      columnWidths[i] = tableWrapWidthDivided;
    }
    this.setState({ columnWidths });
    return columnWidths;
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
          changeColumnWidths={(columns, table) => this.handleCalculateColumnWidths(columns, table)}
          columnWidths={this.state.columnWidths}
          columns={this.state.columns}
          data={this.state.resultData}
          numberOfResults={this.state.resultData.length}
          searchTerm={this.state.searchTerm}
        />}
      </div>
    );
  }
}
