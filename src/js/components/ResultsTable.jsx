import React, { PureComponent } from 'react';
import { SussolReactTable } from 'sussol-react-table';

const columns = [
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'code',
    title: 'Code',
  },
];

export class ResultsTable extends PureComponent {
  userCopiedData(row, col) {
    // get data we want to send on to "getCellClipboardData"
    const data = document.querySelector(`.bp-table-cell-col-${col}.bp-table-cell-row-${row}`);
    return data.textContent;
  }

  render() {
    return (
      <div className="results-table">
        <h2>{this.props.numberOfResults} results for {this.props.searchTerm}</h2>
        <SussolReactTable
          columns={columns}
          columnWidths={[400, 135]}
          defaultRowHeight={48}
          getCellClipboardData={this.userCopiedData}
          isRowHeaderShown={false}
          tableData={this.props.data}
        />
      </div>
    );
  }
}
