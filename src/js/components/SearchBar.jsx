import React, { PureComponent } from 'react';
import Autocomplete from 'react-autocomplete';
import { ResultsTable } from './ResultsTable.jsx';

const styles = {
  highlightedItem: {
    backgroundColor: '#F26532',
    color: '#FFF',
    padding: '6px',
    boxShadow: '0 1px 1px #AAA',
  },
  item: {
    backgroundColor: '#FFF',
    color: '#444',
    padding: '6px',
    boxShadow: '0 1px 1px #AAA',
    borderBottom: '1px solid #EEE',
  },
  wrapper: {
    display: 'block',
    width: '100%',
  },
};

// @delete-me
const fakeData = [{
  name: 'Amoxicillin',
  code: 'amox123',
}, {
  name: 'Cephalexin',
  code: 'ceph123',
}, {
  name: 'Ciprofloxacin',
  code: 'cipr123',
}, {
  name: 'Hydrocodone',
  code: 'hydr123',
}, {
  name: 'Potassium',
  code: 'pota123',
}, {
  name: 'Ranitidine',
  code: 'rani123',
}, {
  name: 'Tetracycline',
  code: 'tetr123',
}, {
  name: 'Vicodin',
  code: 'vico123',
}];

/**
* Match user input value (state) to existing data items
*  - callback for 'shouldItemRender'
*
* @param {object}   item
* @param {str}      value
* @return {bool}
*/
const _matchItemToTerm = (item, value) => (
  item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
  item.code.toLowerCase().indexOf(value.toLowerCase()) !== -1
);

const _matchResultItem = (fetchedData) => (i) => fetchedData.filter((d) => d.code === i.key);

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

export class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { value: '', menuOpen: false };
  }

  handleSearch() {
    return Promise.resolve(fakeData);
  }

  render() {
    return (
      <div>
        {/* search field */}
        <Autocomplete
          getItemValue={(item) => item.name}
          items={fakeData}
          inputProps={{
            id: 'drug-code-autocomplete',
            placeholder: 'Search by generic drug name or universal code',
          }}
          onChange={(event, value) => {
            this.setState({
              menuOpen: true,
              value,
            });

            const fetchedData = this.handleSearch();

            setTimeout(() => {
              fetchedData.then((data) => {
                this.setState({
                  data,
                });
              });
            }, 1000);
          }}
          open={this.state.menuOpen}
          onMenuVisibilityChange={(isOpen) => this.setState({ menuOpen: isOpen })}
          renderItem={(item, isHighlighted) => (
            <div
              style={isHighlighted ? styles.highlightedItem : styles.item}
              key={item.code}
            >
              {item.name}
            </div>
          )}
          // delegate up the tree to IndexPage
          renderMenu={(items) => {
            const data = this.state.data && this.state.data.length;
            let tableItems

            if (data) {
              // curry with data
              const matchItems = _matchResultItem(this.state.data);
              // shaping our data for table
              tableItems = items.map(matchItems);
  console.log(tableItems);
              return (
                <ResultsTable
                  columns={columns}
                  tableData={tableItems}
                />
              );
            }
            return (<div>{items}</div>)
          }}
          shouldItemRender={_matchItemToTerm}
          value={this.state.value}
          wrapperStyle={styles.wrapper}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  params: React.PropTypes.object,
};
