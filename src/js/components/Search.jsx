import React, { PureComponent } from 'react';

import { ResultsTable } from './ResultsTable.jsx';
import { SearchBar } from './SearchBar.jsx';
import { ColumnFixedWidths } from '../settings';

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
      showResults: false,
    };
  }

  componentDidMount() {
    // disable html, body scroll
    const htmlBody = document.querySelector('html, body');
    htmlBody.classList.add('no-scroll');
  }

  componentWillUnmount() {
    // enable html, body scroll
    const htmlBody = document.querySelector('html, body');
    htmlBody.classList.remove('no-scroll');
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
  * @param {int}    tableWidth - table's offsetWidth
  * @param {obj}    columnFixedWidths - column widths (keys = index, values = integer "px" widths)
  * @returns {arr|null} array of new widths, or null
  */
  handleCalculateColumnWidths(columns, tableWidth, columnFixedWidths = {}) {
    if (columns === undefined || tableWidth === undefined) return null;
    const columnWidths = [];

    const fixedWidthArray = Object.values(columnFixedWidths);
    // add total amount of fixed width to subtract from usable space
    const totalFixedWidth = fixedWidthArray.reduce((sum, width) => {
      let sumClone = sum;
      return (sumClone += width);
    }, 0);

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
      <div className="search-area">
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
          changeColumnWidths={(columns, tableWidth, columnFixedWidths) => (
            this.handleCalculateColumnWidths(columns, tableWidth, columnFixedWidths)
          )}
          columnWidthSettings={ColumnFixedWidths}
          columnWidths={this.state.columnWidths}
          columns={this.state.columns}
          data={this.state.resultData}
          getTableHeight={(tableRef) => {
            const height = (document.documentElement.clientHeight - tableRef.offsetTop) - 100;
            this.setState({ tableHeight: height });
          }}
          height={this.state.tableHeight}
          numberOfResults={this.state.resultData.length}
          searchTerm={this.state.searchTerm}
        />}
      </div>
    );
  }
}
