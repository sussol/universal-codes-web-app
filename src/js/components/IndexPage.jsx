import React, { PureComponent } from 'react';

import { ResultsTable } from './ResultsTable.jsx';
import { SearchBar } from './SearchBar.jsx';

export class IndexPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { showResults: false };
  }

  // @todo remove forced condition
  // respond to search input
  handleSubmit() {
    return this.setState({ showResults: true });
  }

  render(props) {
    return (
      <div>
        <SearchBar handleSubmit={() => this.handleSubmit()} />
        {/* render results table */}
        { this.state.showResults && <ResultsTable {...props} /> }
      </div>
    );
  }
}
