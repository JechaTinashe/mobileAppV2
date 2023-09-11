import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import  SelectedRes from "./screens/SelectedRes";
import Map from "./screens/Attractions";
import Game from "./screens/FallingObjectsGame";



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Discover" component={Discover} />
          <Stack.Screen name="Res" component={SelectedRes} />
            <Stack.Screen name="InternalNav" component={InternalNav} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
};

function InternalNav() {
  return(
          <Stack.Navigator>            
               <Stack.Screen name="Attractions" component={Map} />
               <Stack.Screen name="Game" component={Game} />
          </Stack.Navigator>
  );
};