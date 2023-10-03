import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        await AsyncStorage.getItem("token").then((value) => {
          setUserId(value);
        });
        
        // console.log("16");
        console.log(userId);
        const response = await fetch(`http://192.168.29.67:4000/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${userId}`,
          },
        });

        if (response.error) {
          const errorData = await response.json();
          setErrmsg(errorData.error);
        } else {
          const data = await response.json();
          console.log(data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }

    fetchData();
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
