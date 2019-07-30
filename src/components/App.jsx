import React, { Component } from 'react';
import LeafletMap from '../containers/LeafletMap';
import FormContainer from '../containers/FormContainer';

class App extends Component {
  componentDidMount() {
    // this.getLocations();
    console.log('test le props', this.props);
  }

  // getLocations() {
  //   const { fetchAllLocations } = this.props;
  //   fetchAllLocations();
  // }

  render() {
    const { locations } = this.props;
    return (
      <div className="App">
        <FormContainer />
        <LeafletMap locations={locations} />
      </div>
    );
  }
}

export default App;
