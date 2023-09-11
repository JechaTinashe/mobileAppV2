import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";
import { HeroImage } from "../assets";

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 relative">
        {/*First section */}

        <View className="flex-row px-6 mt-8 items-center space-x-2">
            <View className="w-16 h-16 bg-black rounded-full items-center justify-center">
                <Text className="text-[#f9193e] text-2xl font-bold">Res4U</Text>
            </View>

            <Text className="text-[#2A2B4B] text-3xl font-semibold">Residences</Text>
        </View>

        {/*Second section*/}
         <View className="px-6 mt-8 space-y-3">
            <Text className="text-[#3C6072] text-[42px]"> </Text>
            <Text className="text-[#f9193e] text-[38px] font-bold">
                Find Your Stay
            </Text>

            <Text className="text-[#3C6072] text-base"> 
            Designed to enhance the living experience of residents. It serves as a comprehensive platform that
            facilitates communication, information sharing, and convenience for all.

            </Text>
         </View>

        {/*Circle section*/}
        <View className="w-[400px] h-[400px] bg-[#293558] rounded-full absolute bottom-16 right-56"></View>
        <View className="w-[400px] h-[400px] bg-[#f9193e] rounded-full absolute bottom-1 left-56"></View>

        {/*Image section*/}
        <View className="flex-1 relative items-center justify-center">
            <Animatable.Image 
            animation="fadeIn"
            easing="ease-in-out"
            source={HeroImage} 
            className="w-full h-full object-cover mt-20"/>
        

             <TouchableOpacity 
             onPress={() => navigation.navigate("Discover")}
             className="absolute bottom-20 w-24 h-24 border-l-2 border-r-2 border-t-4 border[#293558] rounded-full items-center justify-center">
                <Animatable.View 
                    animation={"pulse"} 
                    easing="ease-in-out" 
                    iterationCount={"infinite"}
                    className="w-20 h-20 items-center justify-center rounded-full bg-[#f9193e]">
                    <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
                </Animatable.View>            
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default HomeScreen