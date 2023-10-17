import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { btn, floating_add_btn } from "../commons/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingAction } from "react-native-floating-action";

import CalendarPicker from "react-native-calendar-picker";

const Welcome = ({ navigation }) => {
  const actions = [
    {
      text: "Add",
      icon: require("../../assets/ic_accessibility_white.png"),
      name: "booking",
      position: 2,
    },
    {
      text: "Language",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_language",
      position: 1,
    },
    {
      text: "Location",
      // icon: require("./images/ic_room_white.png"),
      name: "bt_room",
      position: 3,
    },
    {
      text: "Video",
      // icon: require("./images/ic_videocam_white.png"),
      name: "bt_videocam",
      position: 4,
    },
  ];

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  // const onDateChange = (date, type) => {
  //   setSelectedStartDate(date);
  // };
  const onDateChange = (date, type) => {
    // console.log(date,type);
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };
  const startDate = selectedStartDate ? selectedStartDate.toString() : "";
  const endDate = selectedEndDate ? selectedEndDate.toString() : "";

  // Get the current date
  const currentDate = new Date();

  // Define options for formatting the date
  const options = { weekday: "long", day: "numeric" };

  // Format the date as "Tuesday 8"
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 40 }}>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          allowBackwardRangeSelect={true}
          todayBackgroundColor="#c90119"
          selectedDayColor="#ed1c24"
          selectedDayTextColor="#FFFFFF"
          nextTitle=">"
          previousTitle="<"
        />
      </View>
      <Text
        style={{
          marginHorizontal: 20,
          borderBottomWidth: 0.5,
          paddingBottom: 5,
        }}
      >
        Today is &nbsp;
        <Text
          style={{
            color: "#ED1C24",
          }}
        >
          {formattedDate}
        </Text>
      </Text>
      <ScrollView style={{ marginHorizontal: 20 }}>
        {/* <Text>SELECTED DATE:{startDate}</Text>
        <Text>SELECTED END DATE:{endDate}</Text> */}

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Booked</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>9:00 - 10:00</Text>
            <Text style={styles.cardText}>Main Seminar Hall</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Booked</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>9:00 - 10:00</Text>
            <Text style={styles.cardText}>Main Seminar Hall</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Booked</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>9:00 - 10:00</Text>
            <Text style={styles.cardText}>Main Seminar Hall</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Booked</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>9:00 - 10:00</Text>
            <Text style={styles.cardText}>Main Seminar Hall</Text>
          </View>
        </View>
      </ScrollView>
      <View style={{bottom:40}}>
        <FloatingAction
          actions={actions}
          color="#ed1c24"
          listenKeyboard={true}
          overrideWithAction={true}
          dismissKeyboardOnPress={true}
          onPressItem={(name) => {
            navigation.navigate(`${name}`);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  card: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginVertical: 20,
  },
  cardHeader: {
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    padding: 10,
  },
  cardText: {
    fontSize: 16,
  },
});

export default Welcome;
