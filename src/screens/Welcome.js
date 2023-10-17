import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { container } from "../commons/button";
import img from "../../assets/logo.png";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          navigation.navigate("main");
        } else {
          navigation.navigate("login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={container}>
      <Image source={img} style={{ width: 450, height: 450 }} />
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
