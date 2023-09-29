import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Welcome from "./src/screens/Welcome";
import Login from "./src/screens/Login";
import Signup from "./src/screens/Signup";
import Verification from "./src/screens/Verification";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  // const [isLoggedIn,setIsLoggedIn] = useState(AsyncStorage.getItem('token'))
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login"
          component={Login}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
        />

        <Stack.Screen
          name="verify"
          component={Verification}
        />
        <Stack.Screen
          name="welcome"
          component={Welcome}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
