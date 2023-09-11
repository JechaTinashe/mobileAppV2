import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const SelectedRes = ({ route }) => {
  const { item } = route.params;

  const location = item.Location;

  // Extract latitude and longitude from the decoded URL
  const decodedLocation = decodeURIComponent(location);
  const latLngMatches = decodedLocation.match(/!3d(-?\d+\.\d+)!2d(-?\d+\.\d+)/);
  const latitude = latLngMatches ? latLngMatches[1] : 0;
  const longitude = latLngMatches ? latLngMatches[2] : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: item.img }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.Res_Name}</Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Area:</Text> {item.Area}
        </Text>

        <Text style={styles.location}>
          <Text style={styles.detailLabel}>Location:</Text> {item.Location}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Pricing:</Text>R {item.Pricing}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Rooms:</Text> {item.Rooms}
        </Text>
        <Text style={styles.detail}>
        <Text style={styles.description}>{item.Description}</Text>
        </Text>
        
       
        <TouchableOpacity style={styles.visitButton} onPress={() => Linking.openURL(item.Link)}>
          <Text style={styles.buttonText}>Visit Website</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0122, // Adjust the delta for a suitable zoom level
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{ latitude, longitude }}
          title={item.Res_Name}
          description={item.Location}
        />
      </MapView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },

  map: {
    width: '100%',
    height: 200, // Adjust the height as needed
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    marginTop: -20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detail: {
    fontSize: 18,
    marginBottom: 8,
    color: '#555',
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    fontStyle: 'italic',
    color: '#666',
  },
  location: {
    fontSize: 18,
    marginBottom: 20,
    color: '#444',
  },
  visitButton: {
    backgroundColor: '#ff6347',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectedRes;
