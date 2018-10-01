const ReactDataGrid = require('react-data-grid');
const React = require('react');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
const axios = require('axios');

class ResourceListingTable extends React.Component {
  state = {
    fetchedCoins: false,
    coins: {},
    rows: {},
    filters: {},
  }
  componentDidMount = () => {
    axios
      .get("https://www.data.telangana.gov.in/api/dataset/node.json?fields=title,nid&parameter[type]=resource&parameter[status]=1")
      .then(result => {
        let resultsDataArray = result.data;
        //console.log(resultsDataArray);
        let rows = [];
        for (var key in resultsDataArray) {
          let item = resultsDataArray[key];
          //console.log(item);
          rows.push({
            title: item.title,
            nid: item.nid,
            link: (<a target="_blank" href={item.uri}>{item.title}</a>)
          });
        }
        this.setState({
          fetchedCoins: true,
          coins: result.data.data,
          rows: rows,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let tableColumns = [
      {
        key: 'nid',
        name: 'Node ID',
        width: 80,
        filterable: false
      },
      {
        key: 'title',
        name: 'Title',
        filterable: true
      },
      {
        key: 'link',
        name: 'Link',
        filterable: false
      },
    ];
    let output = (<div> Fetching the results from Open Data Website</div>);
    if (this.state.fetchedCoins) {
      output = (
        <div>
          <div className="page-header">
            <h1>Resource Listing</h1>
            <p>This lists all the Resources that are available in the API</p>
          </div>
          <div>
            <ReactDataGrid
              columns={tableColumns}
              rowGetter={this.rowGetter}
              enableCellSelect={true}
              rowsCount={this.getSize()}
              minHeight={800}
              toolbar={<Toolbar enableFilter={true} filterRowsButtonText="Filter Resources" />}
              onAddFilter={this.handleFilterChange}
              onClearFilters={this.onClearFilters} />
          </div>
        </div>);
    }

    return output;
  }

  getRows = () => {
    return Selectors.getRows(this.state);
  };

  getSize = () => {
    return this.getRows().length;
  };

  rowGetter = (rowIdx) => {
    let rows = this.getRows();
    return rows[rowIdx];
  };

  handleFilterChange = (filter) => {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  };

  onClearFilters = () => {
    this.setState({ filters: {} });
  };
}

const exampleDescription = (
  <p>While ReactDataGrid doesn't not provide the ability to filter directly, it does provide hooks that allow you to provide your own filter function. This is done via the <code>onAddFilter</code> prop. To enable filtering for a given column, set <code>column.filterable = true</code> for that column. Now when the header cell has a new filter value entered for that column, <code>onAddFilter</code> will be triggered passing the filter key and value.</p>);

export default ResourceListingTable;