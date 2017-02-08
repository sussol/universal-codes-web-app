import React, { PureComponent } from 'react';
import { SussolReactTable } from 'sussol-react-table';

const columns = [
  {
    key: 'name',
    title: 'Name',
    sortable: true,
  },
  {
    key: 'code',
    title: 'Code',
    sortable: true,
  },
  {
    key: 'group',
    title: 'Editable Column',
    editable: true,
  },
];

// @todo fetch proper data
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({ code: `code${i}`, name: `name${i}`, group: `group${i % 2}` });
}

export class ResultsTable extends PureComponent {
  render() {
    return (
      <div>
        <h2>Results</h2>
        <SussolReactTable
          columns={columns}
          tableData={data}
        />
      </div>
    );
  }
}
