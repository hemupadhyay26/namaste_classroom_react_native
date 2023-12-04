import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  Image,
  Animated,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { API_BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";

const BookClassroom = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { data } = route.params;

  const [bookingData, setBookingData] = useState({
    // user: "", // User ID (you may get this from user authentication)
    bookingStart: "2023-10-18T18:00:00.000Z", // Date and time for booking start
    bookingEnd: "2023-10-18T21:00:00.000Z", // Date and time for booking end
    recurring: [], // An array for recurring bookings
    businessUnit: "", // Business unit (string)
    purpose: "", // Purpose of the booking (string)
    // roomId: `${data._id}`, // Room ID (you may select from available rooms)
  });
  const [selected, setSelected] = useState("");

  const purposes = [
    { key: "1", value: "Class" },
    { key: "2", value: "Special Event" },
    { key: "3", value: "Meeting" },
  ];
  const businessUnits = [
    { key: "1", value: "B1" },
    { key: "2", value: "B2" },
    { key: "3", value: "B3" },
  ];
  const recurring = [
    { key: "1", value: "Daily" },
    { key: "2", value: "Weekly" },
    { key: "3", value: "Monthly" },
  ];
  const endTime = [
    { key: "1", value: "9:00 am" },
    { key: "2", value: "9:30 am" },
    { key: "3", value: "10:00 am" },
    { key: "4", value: "10:30 am" },
    { key: "5", value: "11:00 am" },
    { key: "6", value: "11:30 am" },
    { key: "7", value: "12:00 pm" },
    { key: "8", value: "12:30 pm" },
    { key: "9", value: "1:00 pm" },
    { key: "10", value: "1:30 pm" },
    { key: "11", value: "2:00 pm" },
    { key: "12", value: "2:30 pm" },
    { key: "13", value: "3:00 pm" },
    { key: "14", value: "3:30 pm" },
    { key: "15", value: "4:00 pm" },
    { key: "16", value: "4:30 pm" },
    { key: "17", value: "5:00 pm" },
  ];
  const startTime = [
    { key: "1", value: "9:00 am" },
    { key: "2", value: "9:30 am" },
    { key: "3", value: "10:00 am" },
    { key: "4", value: "10:30 am" },
    { key: "5", value: "11:00 am" },
    { key: "6", value: "11:30 am" },
    { key: "7", value: "12:00 pm" },
    { key: "8", value: "12:30 pm" },
    { key: "9", value: "1:00 pm" },
    { key: "10", value: "1:30 pm" },
    { key: "11", value: "2:00 pm" },
    { key: "12", value: "2:30 pm" },
    { key: "13", value: "3:00 pm" },
    { key: "14", value: "3:30 pm" },
    { key: "15", value: "4:00 pm" },
    { key: "16", value: "4:30 pm" },
    { key: "17", value: "5:00 pm" },
  ];

  // You can add more options as needed

  const handleBooking = async () => {
    // Handle the booking data here (e.g., send it to your backend API).
    console.log("Booking Data:", bookingData);
    try {
      let userId = "";
      await AsyncStorage.getItem("token").then((value) => {
        userId = value;
      });
      axios
        .put(`${API_BASE_URL}/rooms/${data._id}`, bookingData, {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${userId}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error" + error);
        });
    } catch (error) {
      console.log("error" + error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Booking Form</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Room Name: {data.name}</Text>
        <Text style={styles.label}>
          <Ionicons name="person" size={20} color="black" />: {data.capacity}
        </Text>
        <Text style={styles.label}>Floor: {data.floor}</Text>
        <View style={styles.formContainer}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={startTime}
            save="value"
            placeholder="Select the start time"
            label="Starting time"
            boxStyles={{ marginBottom: 10 }}
          />
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={endTime}
            save="value"
            placeholder="Select the end time"
            label="Ending time"
            boxStyles={{ marginBottom: 10 }}
          />
          <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={recurring}
            save="value"
            placeholder="Select the recurring"
            label="Recurring"
          />
          <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={businessUnits}
            save="value"
            placeholder="Select the business unit"
            label="Business unit"
          />
          <MultipleSelectList
            setSelected={(val) => setSelected(val)}
            data={purposes}
            save="value"
            placeholder="Select the purpose"
            label="Purpose"
          />
          {/* <TextInput
            style={styles.input}
            placeholder={bookingData.roomId}
            onChangeText={(text) =>
              setBookingData({ ...bookingData, roomId: text })
            }
          /> */}
        </View>
        <TouchableOpacity onPress={handleBooking}>
          <Button title="Book Room"  color={"#ed1c24"}  onPress={() => setModalVisible(true)} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ margin: 20 }}>
                You have successfully add the booking!!!!
              </Text>
              <Button
                title="Close"
                color={"#f2c94c"}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
    marginVertical: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  formGroup: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#ed1c24",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    // width:10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BookClassroom;
