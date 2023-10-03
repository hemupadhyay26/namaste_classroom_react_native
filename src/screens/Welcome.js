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

const Welcome = ({ navigation, route }) => {
  // console.log(route.params,"17");
  // const [tableHead, setTableHead] = useState([
  //   "Rooms",
  //   "9:00 AM",
  //   "10:00 AM",
  //   "11:00 AM",
  //   "12:00 PM",
  //   "1:00 PM",
  //   "2:00 PM",
  //   "3:00 PM",
  //   "4:00 PM",
  //   "5:00 PM",
  // ]);
  // const [tableData, setTableData] = useState([
  //   ["1", "2", "3", "4"],
  //   ["a", "b", "c", "d"],
  //   ["1", "2", "3", "456\n789"],
  //   ["a", "b", "c", "d"],
  // ]);
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
  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("login");
    } catch (error) {
      console.log(error);
    }
  };
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

  return (
    <ScrollView style={styles.container}>
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
      <ScrollView>
        <Text>SELECTED DATE:{startDate}</Text>
        <Text>SELECTED END DATE:{endDate}</Text>
        
      </ScrollView>
      <FloatingAction
        actions={actions}
        color = "#ed1c24"
        listenKeyboard = {true}
        overrideWithAction ={true}
        dismissKeyboardOnPress={true}
        onPressItem={(name) => {
          // console.log(`selected button: ${name}`);
          navigation.navigate(`${name}`)
        }}
      />

      {/* <View style={floating_add_btn}>
        <TouchableOpacity>
          <Text>Add</Text>
        </TouchableOpacity>
      </View> */}
      {/* <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default Welcome;
