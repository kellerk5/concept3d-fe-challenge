/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import {
  Map,
  Polygon,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import AllMarkers from './AllMarkers';

class LeafletMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapCenter: [39.750809, -104.996810],
      polygon: [],
    };
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setPolygon = this.setPolygon.bind(this);
    this.addPolygonValue = this.addPolygonValue.bind(this);
  }

  setMapCenter(data) {
    this.setState({
      mapCenter: [data.lat, data.lng],
    });
  }

  setPolygon(location) {
    // prevent firing on load by requiring arg
    if (location) {
      const { polygon } = this.state;
      // if polygon array is empty, go ahead and add
      if (polygon.length === 0) {
        this.addPolygonValue(polygon, location);
      } else {
        // if polygon array has values, filter for the passed arg
        polygon.forEach((item, index) => {
          if (item[0] === location[0]) {
            polygon.splice(index, 1);
            this.setState({ polygon });
          } else {
            // if location is not present, add to state array
            this.addPolygonValue(polygon, location);
          }
        });
      }
    }
  }

  addPolygonValue(polygon, location) {
    // avoiding duplicate code
    const joinedValue = polygon.concat([location]);
    this.setState({ polygon: joinedValue });
  }

  render() {
    const { mapCenter, polygon } = this.state;
    return (
      <div className="map-container">
        <Map
          className="map"
          zoomControl={false}
          center={mapCenter}
          zoom={4}
          maxBounds={[[85, 100], [-85, -280]]}
        >
          {polygon.length > 1 && <Polygon positions={polygon} />}
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            maxZoom={10}
            minZoom={2}
          />
          <ZoomControl
            position="bottomright"
          />
          <AllMarkers setMapCenter={this.setMapCenter} setPolygon={this.setPolygon} />
        </Map>
      </div>
    );
  }
}

export default LeafletMap;
