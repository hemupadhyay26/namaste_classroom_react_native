import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { btn } from "../commons/button";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = ({ navigation }) => {
  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
      <Text
        style={btn}
        onPress={() => {
          removeData();
        }}
      >
        logout
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center content horizontally
    alignItems: "center", // Center content vertically (optional)
  },
});

export default Welcome;
