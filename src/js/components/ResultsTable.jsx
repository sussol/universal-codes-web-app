import React, { PureComponent } from 'react';
import { SussolReactTable } from 'sussol-react-table';

import { debounce } from '../utils';

export class ResultsTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { height: 0 };
  }

  componentDidMount() {
    // get column widths we want to be fixed width
    const columnWidthData = this.props.columnWidthSettings;
    // run init column widths on mount
    this.props.changeColumnWidths(this.props.columns, this.tableWrap.offsetWidth, columnWidthData);
    // store a reference so we can kill the proper listener later on
    this.columnSizeDebouncer = debounce(() => (
      this.props.changeColumnWidths(this.props.columns, this.tableWrap.offsetWidth, columnWidthData)
    ), 250);
    // start listening on window resize to change column size
    window.addEventListener('resize', this.columnSizeDebouncer);

    // set table height
    this.props.getTableHeight(this.tableWrap);
    // store a reference so we can kill the proper listener later on
    this.tableHeightDebouncer = debounce(() => (
      this.props.getTableHeight(this.tableWrap)
    ), 250);
    // start listening on window resize to change table height
    window.addEventListener('resize', this.tableHeightDebouncer);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ height: nextProps.height });
  }

  componentWillUnmount() {
    // kill event resize on this.columnSizeDebouncer listener
    window.removeEventListener('resize', this.columnSizeDebouncer);
    // kill event resize on this.tableHeightDebouncer listener
    window.removeEventListener('resize', this.tableHeightDebouncer);
  }

  userCopiedData(row, col) {
    // get data we want to send on to "getCellClipboardData"
    const data = document.querySelector(`.bp-table-cell-col-${col}.bp-table-cell-row-${row}`);
    return data.textContent;
  }

  render() {
    return (
      <div className="results-wrap">
        <h2>{this.props.numberOfResults} results for {this.props.searchTerm}</h2>
        <div
          className="results-table"
          ref={tableWrap => (this.tableWrap = tableWrap)}
          style={{ maxHeight: this.state.height, height: this.state.height }}
        >
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
      </div>
    );
  }
}

ResultsTable.propTypes = {
  ...SussolReactTable.propTypes,
  changeColumnWidths: React.PropTypes.func,
};
