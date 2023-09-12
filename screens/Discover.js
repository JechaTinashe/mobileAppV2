import React, { useLayoutEffect, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore/lite';
import { Avatar } from '../assets';
import { db } from '../FirebaseConfig/Firebase';

const Discover = () => {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(false);
  const [isReloading, setReloading] = useState(false);
  const requestsRef = collection(db, 'Tbl_Residences');
  const [requests, setRequests] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    setLoading(true);
    const snapshot = await getDocs(query(requestsRef, orderBy('Pricing', 'desc'), limit(5)));

    if (!snapshot.empty) {
      let newRequests = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newRequests.push(snapshot.docs[i].data());
      }

      setRequests(newRequests);
    } else {
      setLastDoc(null);
    }

    setLoading(false);
  };

  const getMoreRequests = async () => {
    setLoading(true);
    if (lastDoc) {
      let snapshot = await getDocs(
        query(requestsRef, orderBy('Pricing', 'desc'), startAfter(lastDoc.data().CreatedOn), limit(5))
      );
      if (!snapshot.empty) {
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        for (let i = 0; i < snapshot.docs.length; i++) {
          requests.push(snapshot.docs[i].data());
        }
      } else {
        setLastDoc(null);
      }
    }
    setLoading(false);
  };

  const onRefresh = () => {
    getRequests();
    setReloading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Res 4 U</Text>
          <Text style={styles.subHeaderText}>Discover Your Student Accommodation</Text>
        </View>

        <View style={styles.avatarContainer}>
          <Image source={Avatar} style={styles.avatar} />
        </View>
      </View>

      <View style={styles.circleButtonsContainer}>
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('InternalNav', { screen: 'Attraction' })}>
          <FontAwesome name="university" size={30} color="#f9193e" />
          <Text style={styles.circleButtonText}>Attractions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => Linking.openURL('www.google.com')}>
          <FontAwesome name="globe" size={30} color="#f9193e" />
          <Text style={styles.circleButtonText}>Res4U Website</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('InternalNav', { screen: 'Game' })}>
          <FontAwesome name="gamepad" size={30} color="#f9193e" />
          <Text style={styles.circleButtonText}>Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.headingContainer}>
        <Text style={styles.headingText}>Residences:</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={requests}
        numColumns={2} // Display two columns
        refreshControl={<RefreshControl refreshing={isReloading} onRefresh={onRefresh} />}
        onEndReached={getMoreRequests}
        onEndReachedThreshold={0.01}
        scrollEventThrottle={150}
        keyExtractor={(item) => item.id} // Use a unique key for each item
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.itemTouchable}
              onPress={() => navigation.navigate('Res', { item })}>
              <Image source={{ uri: item.img }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.Res_Name}</Text>
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemDetailLabel}>Area:</Text>
                <Text style={styles.itemDetail}>{item.Area}</Text>
              </View>
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemDetailLabel}>Pricing:</Text>
                <Text style={styles.itemDetail}>R {item.Pricing}</Text>
              </View>
              <View style={styles.itemDetailsContainer}>
                <Text style={styles.itemDetailLabel}>Rooms:</Text>
                <Text style={styles.itemDetail}>{item.Rooms}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f9193e',
  },
  subHeaderText: {
    fontSize: 23,
    color: '#527283',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: 'gray',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  circleButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
  },
  circleButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonText: {
    marginTop: 5,
    color: '#527283',
    fontSize: 12,
    fontWeight: 'bold',
  },
  headingContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#333',
  },
  flatListContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flex: 0.5, // Display two columns
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  itemTouchable: {
    backgroundColor: '#fff', // White background
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e1e1', // Light gray border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 150,
    height: 150,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333', // Dark gray text
  },
  itemDetailsContainer: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
    marginBottom: 2,
  },
  itemDetailLabel: {
    fontWeight: 'bold',
    marginRight: 4, // Add some spacing between label and value
  },
  itemDetail: {
    fontSize: 14,
    color: '#777',
  },
});

export default Discover;
