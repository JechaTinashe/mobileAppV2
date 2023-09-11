import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator,RefreshControl,FlatList,StyleSheet, Linking } from 'react-native'
import React, { useLayoutEffect, useState, useEffect  } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Residence, Attractions, Chats } from '../assets';
import MenuContainer from '../components/MenuContainer';
import { FontAwesome } from '@expo/vector-icons';
import {collection, getDocs,doc,setDoc,orderBy, limit,query,startAfter } from 'firebase/firestore/lite';
import { db } from '../FirebaseConfig/Firebase';


const Discover = () => {
    const navigation = useNavigation();

    const [Loading,setLoading] = useState(false);
    const [isReloading,SetReloading] = useState(false);
    const RequestsRef = collection(db, 'Tbl_Residences');
    const [Requets,SetRequests] = useState([]);
    const [LastDoc,SetLastDoc] = useState(null);
  
    useEffect(() => {
      GetRequests();
    },[]);

    const GetRequests = async () =>{
      setLoading(true);
      const Snapshot = await getDocs(query(RequestsRef,orderBy("Pricing", "desc"),limit(5)));
  
      if(!Snapshot.empty){
        let NewRequests = [];
  
        SetLastDoc(Snapshot.docs[Snapshot.docs.length - 1]);
  
        for(let i = 0; i< Snapshot.docs.length;i++ ){
          NewRequests.push(Snapshot.docs[i].data());
        }
  
        SetRequests(NewRequests);
  
      }
      else{
        SetLastDoc(null);
      }
  
      setLoading(false);
  
    };
  
    const GetMoreRequests = async () => {
      setLoading(true);
      if(LastDoc){
        let Snapshot = await getDocs(query(RequestsRef,orderBy("Pricing", "desc"),startAfter(LastDoc.data().CreatedOn),limit(5)));
        if(!Snapshot.empty){
          
          SetLastDoc(Snapshot.docs[Snapshot.docs.length - 1]);
    
          for(let i = 0; i< Snapshot.docs.length;i++ ){
            Requets.push(Snapshot.docs[i].data());
          }
    
        }
        else{
          SetLastDoc(null);
        }
  
      }
      setLoading(false);
    }
  
    const onRefresh = () => {
      GetRequests()
      SetReloading(false);
    };
  
    const [type, setType] = useState("chats")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });

    },[]);
  
    return (
      <SafeAreaView  style={{ flex: 1, backgroundColor: 'white' }}>
        
        <View className="flex-row items-center justify-between px-8">
      <View>
            <Text className="text-[40px] text-[#f9193e] font-bold">Res 4 U</Text>
            <Text className="text-[23px] text-[#527283]">Discover Your student accommodation</Text>
        </View>

        <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
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
                    onPress={() => navigation.navigate('ChatPage')}>
                    <FontAwesome name="comments" size={30} color="#f9193e" />
                    <Text style={styles.circleButtonText}>Chat</Text>
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
          data={Requets}
          numColumns={2} // Display two columns
          refreshControl={<RefreshControl refreshing={isReloading} onRefresh={onRefresh} />}
          onEndReached={GetMoreRequests}
          onEndReachedThreshold={0.01}
          scrollEventThrottle={150}
          keyExtractor={(item) => item.id} // Use a unique key for each item
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <TouchableOpacity style={styles.itemTouchable}
              onPress={() => navigation.navigate('Res', { item })} 
              >
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
    )
    
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
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
  itemContainer: {
    flex: 0.5, // Display two columns
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal:10,
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
});

export default Discover