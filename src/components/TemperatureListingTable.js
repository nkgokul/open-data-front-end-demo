const ReactDataGrid = require('react-data-grid');
const React = require('react');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
const axios = require('axios');

class TemperatureListingTable extends React.Component {
  state = {
    fetchedCoins: false,
    coins: {},
    rows: {},
    filters: {},
  }
  componentDidMount = () => {
    axios
      .get("https://www.data.telangana.gov.in/api/action/datastore/search.json?resource_id=cc9950ce-89aa-455b-847b-d87756db8f91&limit=5")
      .then(result => {
        console.log(result);
        let resultsDataArray = result.data.result.records;
        console.log(resultsDataArray);
        let rows = [];
        for (var key in resultsDataArray) {
          let item = resultsDataArray[key];
          console.log(item);
          //Mandal: "33.8", District: "Adilabad", Jun-13: "29.5", Jul-13: "29", Aug-13: "33.1", …}
          rows.push({
            mandal: item.Mandal,
            district: item.District,
            'jun-13': item["Jun-13"],
            'jul-13': item["Jul-13"],
            'aug-13': item["Aug-13"],
            'sep-13': item["Sep-13"],
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
        name: "Mandal",
        key: "mandal",
        filterable: true,
      },
      {
        name: "District",
        key: "district",
        filterable: true,
      },
      {
        name: "June 13",
        key: "jun-13",
        filterable: true,
      },
      {
        name: "July 13",
        key: "jul-13",
        filterable: true,
      },
      {
        name: "August 13",
        key: "aug-13",
        filterable: true,
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

export default TemperatureListingTable;