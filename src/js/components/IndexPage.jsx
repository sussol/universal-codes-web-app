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
  handleSearch(data) {
    return this.setState({ showResults: true, resultData: data });
  }

  render(props) {
    return (
      <div>
        <SearchBar
          // doSearch={(data) => this.handleSearch(data)}
        />
        {/* render results table */}
        { /*this.state.showResults && <ResultsTable {...props} data={this.props.resultData} />*/ }
      </div>
    );
  }
}
