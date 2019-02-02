import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Axios from 'axios'

export default class Map extends React.Component {

  state = {
    locations: [],
      render: false,
      coordinates: this.props.dataLoad[0],
  }

  componentWillMount = () => {
    let coords = [];
    this.props.data.forEach( ele => {
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ele.address}&key=AIzaSyBLMYOXndOguRrYOUjyina0D9n8khIQHqs`).then( resp => {
        coords.push(resp.data.results[0].geometry.location)
      })
    })
    this.setState({
      locations: coords,
        render: true
    })
  }

  createMarkers() {
    if(this.state.render === false){
      this.createMarkers();
    }
    return this.state.locations.map( (item ,index) => {
      return <Marker
         position={{lat: item.lat, lng: item.lng}}
         key={index}
       />
    })
  }

  render() {
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: this.state.coordinates.lat, lng: this.state.coordinates.lng }}
        // defaultCenter={{ lat: 32.073993, lng: 34.775419 }}
        // defaultCenter={{ lat: 31.594927, lng: 34.790051 }} for darom
      >
        {this.createMarkers()}
      </GoogleMap>
    ));
    return <div>
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCE2ctDtjaKCIpBFh4uNGgLM-iSh91atfQ&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
      // GoogleMap.addEventListener(Marker,'click',function() {
      //     GoogleMap.setZoom(12);
      //     GoogleMap.setCenter(Marker.getPosition());
      // });
  }
}
