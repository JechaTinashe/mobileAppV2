import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Import icon from Expo vector-icons
import * as Location from 'expo-location';

const  Attractions = () =>  {
  const [mapRegion, setMapRegion] = useState({
    latitude: -26.18333333,
    longitude: 27.99266389,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [mapType, setMapType] = useState('standard'); // 'standard' is for road map view

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied.');
    }
    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    console.log(location.coords.latitude, location.coords.longitude);
  };

  const toggleMapType = () => {
    if (mapType === 'standard') {
      setMapType('satellite');
    } else {
      setMapType('standard');
    }
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        mapType={mapType} // Use the mapType state here
      >
        <Marker coordinate={mapRegion} title='Marker' />
      </MapView>
      <TouchableOpacity style={styles.button} onPress={toggleMapType}>
        <MaterialIcons name={mapType === 'standard' ? 'satellite' : 'map'} size={24} color='white' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
});
export default Attractions