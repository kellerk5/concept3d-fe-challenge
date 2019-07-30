/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import MapMarker from './Marker';

class AllMarkers extends PureComponent {
  componentDidUpdate(prevProps) {
    const { locations, setMapCenter } = this.props;
    // we added a new marker, focus most recent marker
    // anticipates a use case where markers could be removed
    // and therefore we would not want to focus
    if (prevProps.locations.length < locations.length) {
      setMapCenter(locations[locations.length - 1]);
    }
  }

  render() {
    const { locations, setPolygon } = this.props;
    const markerArray = locations.map((marker, i) => {
      return (
        <MapMarker
          key={i}
          location={[+marker.lat, +marker.lng]}
          name={marker.name}
          setPolygon={setPolygon}
        />
      );
    });

    return <div className="paths-container">{markerArray}</div>;
  }
}

export default AllMarkers;
