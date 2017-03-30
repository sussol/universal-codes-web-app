import React, { PureComponent } from 'react';
import { SussolReactTable } from 'sussol-react-table';

import { debounce } from '../utils';

export class ResultsTable extends PureComponent {
  componentDidMount() {
    // run init column widths on mount
    this.props.changeColumnWidths(this.props.columns, this.tableWrap);
    // store a reference so we can kill the proper listener later on
    this.columnSizeDebouncer = debounce(() => (
      this.props.changeColumnWidths(this.props.columns, this.tableWrap)
    ), 250);
    // start listening on window resize to change column size
    window.addEventListener('resize', this.columnSizeDebouncer);
  }

  componentWillUnmount() {
    // kill event resize on this.columnSizeDebouncer listener
    window.removeEventListener('resize', this.columnSizeDebouncer);
  }

  userCopiedData(row, col) {
    // get data we want to send on to "getCellClipboardData"
    const data = document.querySelector(`.bp-table-cell-col-${col}.bp-table-cell-row-${row}`);
    return data.textContent;
  }

  render() {
    return (
      <div className="results-table" ref={tableWrap => (this.tableWrap = tableWrap)}>
        <h2>{this.props.numberOfResults} results for {this.props.searchTerm}</h2>
        <SussolReactTable
          columns={this.props.columns}
          columnWidths={this.props.columnWidths}
          defaultRowHeight={48}
          getCellClipboardData={this.userCopiedData}
          isRowHeaderShown={false}
          ref={table => (this.table = table)}
          tableData={this.props.data}
        />
      </div>
    );
  }
}

ResultsTable.propTypes = {
  ...SussolReactTable.propTypes,
  changeColumnWidths: React.PropTypes.func,
};
