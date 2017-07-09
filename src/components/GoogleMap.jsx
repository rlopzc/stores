import React from 'react';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const mexicoCity = {
  lat: 19.4326,
  lng: -99.133209
};


const GettingStartedExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={10}
    defaultCenter={mexicoCity}
  >
    {props.markers.map((marker, index) => (
      <Marker
        key={index}
        {...marker}
        onClick={() => props.onMarkerClick(index)}
      />
    ))}
  </GoogleMap>
));

const GoogleMaps = ({ markers = [], onMarkerClick = () => {} }) => (
  <GettingStartedExampleGoogleMap
    containerElement={
      <div className="height-100" />
    }
    mapElement={
      <div className="height-100" />
    }
    markers={markers}
    onMarkerClick={onMarkerClick}
  />
);


export default GoogleMaps;
