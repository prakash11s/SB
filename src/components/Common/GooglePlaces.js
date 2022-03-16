import React, { useState, useEffect } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Geocode from "react-geocode";
import { useTranslation } from "react-i18next";

import { GOOGLE_PLACES_API_KEY } from "../../utility/constants";

Geocode.setApiKey(GOOGLE_PLACES_API_KEY);
Geocode.enableDebug();

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=geometry,drawing,places`;

const GooglePlaces = ({toggleLocationModal, selectedAddress, setSelectedAddress}) => {
    const { t } = useTranslation();
    const [state, setState] = useState({
        address: '',
        zoom: 15,
        height: 400,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        }
    });

    const onInit = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setState(prevState => {
                    return {
                        ...prevState,
                        mapPosition: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        markerPosition: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        }
                    } 
                });
            })
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    }

    useEffect(() => {
        if(selectedAddress.address && selectedAddress.latitude && selectedAddress.longitude){
            setState(prevState => { return {
                ...prevState,
                    address: (selectedAddress.address) ? selectedAddress.address : '',
                    markerPosition: {
                        lat: selectedAddress.latitude,
                        lng: selectedAddress.longitude
                    },
                    mapPosition: {
                        lat: selectedAddress.latitude,
                        lng: selectedAddress.longitude
                    }
                
            }});
        }else{
            onInit();
        }
    }, []);
    
    const onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();
        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address;
                    setState(prevState => { return {
                        ...prevState,
                            address: (address) ? address : '',
                            markerPosition: {
                                lat: newLat,
                                lng: newLng
                            },
                            mapPosition: {
                                lat: newLat,
                                lng: newLng
                            }
                        
                    }});
                    setSelectedAddress({
                        address:address,
                        latitude:newLat,
                        longitude:newLng
                    });
            },
            error => {
                console.error(error);
            }
        );
    };

    const onPlaceSelected = (place, userAddress) => {
        
        const address = userAddress,
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        setState(prevState => { return {
            ...prevState,
            address: (address) ? address : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        }});
        setSelectedAddress({
            address:address,
            latitude:latValue,
            longitude:lngValue
        });
    };

    const findPlaces = (e) => {
        var input = e.target;
        var autocomplete = new window.google.maps.places.Autocomplete(input);        
        autocomplete.addListener("place_changed", function () {            
          let place = autocomplete.getPlace();
          if (!place.geometry) {
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
          onPlaceSelected(place, e.target.value);
        //   var lat = place.geometry.location.lat();
        //   var lng = place.geometry.location.lng();
        //   const locations = { latitude: lat, longitude: lng };
        });
      }

    const AsyncMap = withScriptjs(
        withGoogleMap(
            props => (
                <GoogleMap
                    defaultZoom={state.zoom}
                    defaultCenter={{ lat: state.mapPosition.lat, lng: state.mapPosition.lng }}
                >
                    <Marker
                        google={props.google}
                        name={'Dolores park'}
                        draggable={true}
                        onDragEnd={onMarkerDragEnd}
                        position={{ lat: state.markerPosition.lat, lng: state.markerPosition.lng }}
                    />
                    <InfoWindow
                        position={{ lat: (state.markerPosition.lat + 0.0018), lng: state.markerPosition.lng }}
                    >
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{state.address}</span>
                        </div>
                    </InfoWindow>
                    <Marker />
                    {/* <Autocomplete
                        style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '2rem'
                        }}
                        placeholder={state.address}
                        onPlaceSelected={onPlaceSelected}
                        types={['(regions)']}
                    /> */}
                    <div className="front-profile">
                      <input
                        className="custom-form-control form-control-lg location-search-input"
                        autoComplete="off"
                        placeholder={state.address}
                        onKeyUp={findPlaces}
                      />
                       <span className="form-icon" onClick={toggleLocationModal}>
                        <img
                          src={`assets/img/ic_address_secondary.png`}
                          alt="FB"
                        />
                      </span>
                    </div>
                </GoogleMap>
            )
        )
    );

    return (
        <>
        <div className="location-map-change" style={{ margin: '0 auto', maxWidth: 1100, minHeight: 410 }}>                
                <AsyncMap
                    googleMapURL={googleMapURL}
                    loadingElement={
                        <div style={{ height: `100%` }} />
                    }
                    containerElement={
                        <div style={{ height: state.height }} />
                    }
                    mapElement={
                        <div style={{ height: `90%` }} />
                    }
                />
                <span onClick={toggleLocationModal} className="location-change">
                {t("CONTINUE")}
              </span>
            </div>
            
        </>
    )
}
export default GooglePlaces;