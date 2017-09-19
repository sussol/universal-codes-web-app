import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SussolReactTable } from 'sussol-react-table';

import { debounce } from '../utils';

const userCopiedData = (row, col) => {
  // get data we want to send on to "getCellClipboardData"
  const data = document.querySelector(`.bp-table-cell-col-${col}.bp-table-cell-row-${row}`);
  return data.textContent;
};

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

  render() {
    return (
      <div className="results-wrap">
        <h2>{this.props.numberOfResults} results for {this.props.searchTerm}</h2>
        <div
          className="results-table"
          ref={(tableWrap) => { this.tableWrap = tableWrap; }}
          style={{ maxHeight: this.props.height, height: this.props.height }}
        >
          <SussolReactTable
            columns={this.props.columns}
            columnWidths={this.props.columnWidths}
            defaultRowHeight={48}
            getCellClipboardData={userCopiedData}
            isRowHeaderShown={false}
            tableData={this.props.data}
            ref={(table) => { this.table = table; }}
          />
        </div>
      </div>
    );
  }
}

ResultsTable.defaultProps = {
  changeColumnWidths: () => {},
};

ResultsTable.propTypes = {
  ...SussolReactTable.propTypes,
  changeColumnWidths: PropTypes.func,
};
