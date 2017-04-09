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
  * @param {arr}    columns - array of column data from Blueprint table
  * @param {obj}    columnFixedWidths - column widths (keys = index, values = integer "px" widths)
  * @param {int}    tableWidth - table's offsetWidth
  * @returns {arr|null} array of new widths, or null
  */
  handleCalculateColumnWidths(columns, columnFixedWidths = [], tableWidth) {
    if (columns === undefined || tableWidth === undefined) return null;
    const columnWidths = [];

    let totalFixedWidth = 0;
    const fixedWidthArray = Object.values(columnFixedWidths);
    // add total amount of fixed width to subtract from usable space
    for (let i = 0; i < fixedWidthArray.length; i += 1) {
      totalFixedWidth += fixedWidthArray[i];
    }

    // get useable lengths, minus any fixed table width data (columnFixedWidths)
    const totalUseableLength = totalFixedWidth ? tableWidth - totalFixedWidth : tableWidth;
    const tableWidthDivided = totalUseableLength / (columns.length - fixedWidthArray.length);

    // set widths
    for (let i = 0; i < columns.length; i += 1) {
      if (totalFixedWidth && columnFixedWidths[i]) {
        columnWidths.push(columnFixedWidths[i]);
      } else {
        columnWidths.push(tableWidthDivided);
      }
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
          changeColumnWidths={(columns, columnWidths, tableWidth) => (
            this.handleCalculateColumnWidths(columns, columnWidths, tableWidth)
          )}
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
