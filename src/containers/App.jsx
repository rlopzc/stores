import React, { Component } from 'react';
import _ from 'lodash';
import GoogleMap from '../components/GoogleMap';
import FavoriteStores from '../components/FavoriteStores';
import Header from '../components/Header';
import storesJSON from '../store_directory.json';

const geocodeApiKey = 'AIzaSyA-TH_2eQEINOWpy3C7Rw3OxFj4-G5EkGw';
const geocodeAPI = `https://maps.googleapis.com/maps/api/geocode/json?key=${geocodeApiKey}&address=`;


class App extends Component {
  state = {
    markers: [],
    favorites: [],
  }

  componentDidMount() {
    this.fetchAddresses();
  }

  updateMarkers = (markers, index, withLabel = false) => {
    return markers.map((marker, markerIndex) => {
      if (markerIndex !== index) {
        return marker;
      }

      if (withLabel) {
        marker.label = 'F';
      } else {
        delete marker.label;
      }

      return marker;
    });
  }

  fetchAddresses = () => {
    storesJSON.forEach(location => {
      fetch(geocodeAPI + encodeURI(location.Address))
        .then(response => {
          if (response.ok) {
            return response.json();
          }
        })
        .then(data => {
          // Used because of the API request
          if (_.isEmpty(data.results)) {
            console.log('API limit exceeded, address:', location.Address)
            return;
          }

          const latLng = data.results[0].geometry.location;

          const marker = {
            position: latLng,
            name: location.Name,
            address: location.Address,
          };

          this.setState({ markers: [...this.state.markers, marker]});
        })
        .catch(error => {});
    });
  }


  handleMarkerClick = (index) => {
    const { favorites, markers } = this.state;

    if (_.find(favorites, markers[index])){
      const updatedFavorites = favorites.filter(marker => marker !== markers[index]);
      const updatedMarkers = this.updateMarkers(markers, index);

      this.setState({
        markers: updatedMarkers,
        favorites: updatedFavorites,
      });
      return;
    }

    const updatedMarkers = this.updateMarkers(markers, index, true);
    this.setState({
      markers: updatedMarkers,
      favorites: [...favorites, updatedMarkers[index]]
    });
  }

  render() {
    return (
      <div className="height-100">
        <Header />

        <div className="container height-100">
          <div className="height-100 col-xs-12 col-sm-8 mb2">
            <GoogleMap
              markers={this.state.markers}
              onMarkerClick={this.handleMarkerClick}
            />
          </div>

          <div className="height-100 col-xs-12 col-sm-4">
            <FavoriteStores stores={this.state.favorites}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
