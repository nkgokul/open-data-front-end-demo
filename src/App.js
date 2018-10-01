import React, { Component } from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import ResourceListingTable from "./components/ResourceListingTable"
import PackageListingTable from "./components/PackageListingTable"
import TemperatureListingTable from "./components/TemperatureListingTable"

class App extends Component {
  componentDidMount() { }
  render() {
    return (
      <div className="App">
        <Router>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <Link className="navbar-brand" to="/">
                  OpenData Demo Dashboards
                </Link>
              </div>
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/package-listing">Package Listing</Link>
                </li>
                <li>
                  <Link to="/resources-listing">Resource Listing</Link>
                </li>
                <li>
                  <Link to="/temperatures-view">Temperatures View</Link>
                </li>
              </ul>
            </div>
          </nav>
        </Router>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={PackageListingTable} />

              <Route
                path="/resources-listing"
                component={ResourceListingTable}
              />
              <Route
                path="/package-listing"
                component={PackageListingTable}
              />
              <Route
                path="/temperatures-view"
                component={TemperatureListingTable}
              />
              
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
