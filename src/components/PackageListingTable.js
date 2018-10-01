const ReactDataGrid = require('react-data-grid');
const React = require('react');
const { Toolbar, Data: { Selectors } } = require('react-data-grid-addons');
const axios = require('axios');

class PackageListingTable extends React.Component {
  state = {
    fetchedAPI: false,
    coins: {},
    rows: {},
    filters: {},
  }
  componentDidMount = () => {
    axios
      .get("https://www.data.telangana.gov.in/api/3/action/current_package_list_with_resources")
      .then(result => {
        //console.log(result);
        let resultsDataArray = result.data.result[0];
        //console.log(resultsDataArray);
        let rows = [];
        for (var key in resultsDataArray) {
          let item = resultsDataArray[key];
          console.log(item);
          let tagsDisplay = item.tags.reduce((acc, current) => {
            return acc + current.name + ", "
          }, "");
          let resourcesDisplay = "";
          if (item.resources){
            resourcesDisplay = item.resources.reduce((acc, current) => {
            return acc + current.url + ", "
          }, "");
        }
          rows.push({
            title: item.title,
            author: item.author,
            notes: item.notes,
            tags: tagsDisplay,
            resources: resourcesDisplay,
          });
        }
        this.setState({
          fetchedAPI: true,
          helpText: result.data.help,
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
        key: 'title',
        name: 'Title',
        filterable: true
      },
      {
        key: 'author',
        name: 'Author',
        filterable: true
      },
      {
        key: 'notes',
        name: 'Notes',
        filterable: true
      },
      {
        key: 'tags',
        name: 'Tags',
        filterable: true
      },
      {
        key: 'resources',
        name: 'Resources',
        filterable: true
      },
    ];
    let output = (<div> Fetching the results from Open Data Website</div>);
    if (this.state.fetchedAPI) {
      output = (
        <div>
          <div className="page-header">
            <h1>Package Listing</h1>
            <p>{this.state.helpText}</p>
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

export default PackageListingTable;