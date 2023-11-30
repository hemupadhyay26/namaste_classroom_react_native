import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Welcome from "../src/screens/Welcome";
import Login from "../src/screens/Login";
import Signup from "../src/screens/Signup";
import Verification from "../src/screens/Verification";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Profile from "../src/screens/Profile";
import BookClasses from "../src/screens/BookClasses";
import MyBookings from "../src/screens/MyBookings";
import Home from "../src/screens/Home";
import BookClassroom from "../src/screens/BookClassroom";

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  // const Drawer = createDrawerNavigator();
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 50,
      backgroundColor: "#fff",
    },
  };
 
  function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialIcons
                    name="home"
                    size={24}
                    color={focused ? "#ed1c24" : "#111"}
                  />
                  <Text style={{ fontSize: 12, color: "#ed1c24" }}>Home</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="booking"
          component={BookClasses}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="add-circle"
                    size={24}
                    color={focused ? "#ed1c24" : "#111"}
                  />

                  <Text style={{ fontSize: 12, color: "#ed1c24" }}>
                    Add Class
                  </Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Ionicons
                    name="person-circle"
                    size={24}
                    color={focused ? "#ed1c24" : "#111"}
                  />

                  <Text style={{ fontSize: 12, color: "#ed1c24" }}>
                    Profile
                  </Text>
                </View>
              );
            },
          }}
        />
        {/* <Tab.Screen name="login" component={Login} />
        <Tab.Screen name="signup" component={Signup} /> */}
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="welcome" component={Welcome} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />

        <Stack.Screen name="verify" component={Verification} />
        <Stack.Screen name="main" component={BottomTabs} />
        <Stack.Screen name="bookclassroom" component={BookClassroom} />
        {/* <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="booking" component={BookClasses} />
        <Stack.Screen name="profile" component={Profile} />*/}
        <Stack.Screen name="mybooking" component={MyBookings} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
