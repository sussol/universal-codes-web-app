import React, { PureComponent } from 'react';
import Snackbar from 'material-ui/Snackbar';

import { SearchBar } from './SearchBar';
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
      loadedComponent: false,
      resultsTableComponent: null,
      showResults: false,
    };

    this.resultsTableComponent = null;
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
      this.setState({ showResults: false, resultData: [], searchTerm });
      // exit
      return;
    }
    this.setState({ showResults: true, resultData: data, searchTerm });
    this.renderLazyTable();
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
      const newWidth = sum + width;
      return newWidth;
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

  /**
  * renderLazyTable
  *
  * Create a table component chunk and lazy load it into state.
  * Blueprint.js table and its core are large files. Need to keep
  * load times to a minimum.
  * After all, users may not even search.
  *
  */
  renderLazyTable() {
    return import('./ResultsTable').then((table) => {
      this.resultsTableComponent = table.ResultsTable;
      this.setState({ loadedComponent: true });
    });
  }

  render(props) {
    const ResultsTable = this.resultsTableComponent;

    return (
      <div className="search-area">
        <SearchBar
          className="search-bar"
          onSearchChange={(data, searchTerm) => (
            this.handleSearchChange(data, searchTerm)
          )}
          onSearchClear={() => this.handleSearchChange(null, '')}
        />
        {/* render results table */}
        {
          this.state.showResults && ResultsTable !== null &&
          <ResultsTable
            {...props}
            changeColumnWidths={(columns, tableWidth, columnFixedWidths) => (
              this.handleCalculateColumnWidths(columns, tableWidth, columnFixedWidths)
            )}
            columnWidthSettings={ColumnFixedWidths}
            columnWidths={this.state.columnWidths}
            columns={this.state.columns}
            data={this.state.resultData}
            getTableHeight={(tableRef) => {
              // covers cases of:
              //   - mobile screens in portrait
              //   - everything else that's _not_ mobile in landscape
              let height = (document.documentElement.clientHeight - tableRef.offsetTop) - 100;

              // mobile screens in landscape only
              const landscapeString = 'screen and (orientation: landscape) and (max-width: 820px)';
              if (window.matchMedia(landscapeString).matches) {
                height = tableRef.offsetTop;
              }

              // set the height
              this.setState({ tableHeight: height });
            }}
            height={this.state.tableHeight}
            numberOfResults={this.state.resultData.length}
            searchTerm={this.state.searchTerm}
          />
        }

        {/* "no results" notification */}
        <Snackbar
          open={
            (this.state.resultData
            && this.state.resultData.length === 0
            && this.state.searchTerm !== '')
            || false
          }
          message={`No results found for ${this.state.searchTerm}`}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}
