import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";

const Floating_btn = ({navigation}) => {
  const actions = [
    {
      text: "Add",
      icon: <AntDesign name="plus" size={24} color="#fff" />,
      name: "booking",
      position: 1,
    },
    {
      text: "profile",
      icon: <Ionicons name="person-circle" size={24} color="#fff" />,
      name: "profile",
      position: 2,
    },
    {
      text: "My Booking",
      icon: <Entypo name="list" size={24} color="#fff" />,
      name: "mybooking",
      position: 3,
    },
    // {
    //   text: "Location",
    //   icon: require("./images/ic_room_white.png"),
    //   name: "bt_room",
    //   position: 3,
    // },
    // {
    //   text: "Video",
    //   icon: require("./images/ic_videocam_white.png"),
    //   name: "bt_videocam",
    //   position: 4,
    // },
  ];
  return (
    <View style={{ bottom: 40 }}>
      <FloatingAction
        actions={actions}
        color="#ed1c24"
        listenKeyboard={true}
        // overrideWithAction={true}
        // dismissKeyboardOnPress={true}
        onPressItem={(name) => {
          navigation.navigate(`${name}`);
        }}
      />
    </View>
  );
};

export default Floating_btn;

const styles = StyleSheet.create({});
