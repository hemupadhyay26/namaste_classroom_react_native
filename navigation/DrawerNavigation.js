import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { container } from "../src/commons/button";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    // <DrawerNavigation>
    //     <Drawer.Screen name="welcome" component={Welcome}/>
    // </DrawerNavigation>
     <View style={container}>
        <Text>Drawer</Text>
    </View> 
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
