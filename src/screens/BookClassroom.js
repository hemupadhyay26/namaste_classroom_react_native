import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import DatePicker, {
  getFormatedDate,
} from "react-native-modern-datepicker";

import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SelectList,
} from "react-native-dropdown-select-list";
import moment from "moment";
import { makeBooking } from "../api/booking";

const BookClassroom = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { data } = route.params;

  const today = new Date();

  const startDate = getFormatedDate(
    today.setDate(today.getDate()),
    "YYYY-MM-DD"
  );

  const [bookingData, setBookingData] = useState({
    bookingStart: "", // Date and time for booking start
    bookingEnd: "", // Date and time for booking end
    recurring: [], // An array for recurring bookings
    recurringEndDate: "",
    businessUnit: "", // Business unit (string)
    purpose: "", // Purpose of the booking (string)
    // bookingStart: "2023-10-18T18:00:00.000Z", // Date and time for booking start
    // bookingEnd: "2023-10-18T21:00:00.000Z", // Date and time for booking end
    // recurring: [], // An array for recurring bookings
    // businessUnit: "", // Business unit (string)
    // purpose: "", // Purpose of the booking (string)
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
    { key: "1", value: "Non recurring" },
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
    { key: "9", value: "13:00 pm" },
    { key: "10", value: "13:30 pm" },
    { key: "11", value: "14:00 pm" },
    { key: "12", value: "14:30 pm" },
    { key: "13", value: "15:00 pm" },
    { key: "14", value: "15:30 pm" },
    { key: "15", value: "16:00 pm" },
    { key: "16", value: "16:30 pm" },
    { key: "17", value: "17:00 pm" },
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
    { key: "9", value: "13:00 pm" },
    { key: "10", value: "13:30 pm" },
    { key: "11", value: "14:00 pm" },
    { key: "12", value: "14:30 pm" },
    { key: "13", value: "15:00 pm" },
    { key: "14", value: "15:30 pm" },
    { key: "15", value: "16:00 pm" },
    { key: "16", value: "16:30 pm" },
    { key: "17", value: "17:00 pm" },
  ];

  // You can add more options as needed
  const formatTime = (time) => {
    let formatedTimeArray = [];
    formatedTimeArray = time.split(":").map((item) => parseInt(item, 10));
    return formatedTimeArray;
  };
  const handleRecurringData = (type, date) => {
    let recurringData = [];
    if (type !== "none") {
      recurringData = [date, type];
      recurringData[0][1] = recurringData[0][1] - 1;
    } else {
      recurringData = [];
    }
    return recurringData;
  };
  const handleEndDate = (dateArray) => {
    let recurringEndDate = [];
    dateArray.forEach((item) => {
      recurringEndDate.push(parseInt(item));
    });
    return recurringEndDate;
  };

  const [congoMessage, setCongoMessage] = useState("");

  const handleBooking = async () => {
    // Handle the booking data here (e.g., send it to your backend API).
    // console.log("Booking Data:", bookingData);
    const dateArray = moment(new Date())
      .format("Y M D")
      .split(" ")
      .map((item) => parseInt(item, 10));
    dateArray[1] = dateArray[1] - 1;
    // console.log("Booking Data:", dateArray);
    let token = "";
    await AsyncStorage.getItem("token").then((value) => {
      token = value;
    });
    const bookingStartTime = bookingData.bookingStart.split(" ")[0];
    const startTime = formatTime(bookingStartTime);

    const startDate = [...dateArray, ...startTime];

    // console.log("start " + startDate);

    const bookingEndTime = bookingData.bookingEnd.split(" ")[0];
    const endTime = formatTime(bookingEndTime);

    const endDate = [...dateArray, ...endTime];

    // console.log("end " + endDate);

    const businessUnit = bookingData.businessUnit;
    let recurringEnd = handleEndDate(bookingData.recurringEndDate.split("-"));
    const recurringType = bookingData.recurring;
    let recurringData = handleRecurringData(recurringType, recurringEnd);
    const purpose = bookingData.purpose;

    // console.log("bussiness " + businessUnit);
    // console.log("recurringEnd " + recurringEnd);
    // console.log("recurring " + recurringType);
    // console.log("recurringData " + recurringData);
    // console.log("purpose " + purpose);
    const roomId = data._id;
    const bookingDataCheck = {
      startDate,
      endDate,
      businessUnit,
      purpose,
      roomId,
    };
    const existingBookings = data.bookings;
    // console.log("existingBookings " + existingBookings);
    // Check if there is a clash and, if not, save the new booking to the database
    try {
      makeBooking(
        {
          token,
          startDate,
          endDate,
          businessUnit,
          purpose,
          roomId,
          recurringData,
        },
        existingBookings
      ).then((updatedRoom) => {
        // If the new booking is successfully saved to the database
        setModalVisible(true),
          setCongoMessage(`${updatedRoom.name} successfully booked.`);
      });
    } catch (err) {
      // If there is a booking clash and the booking could not be saved
      setCongoMessage(
        "Your booking could not be saved. Please ensure it does not clash with an existing booking and that it is a valid time in the future."
      );
      console.log(err);
    }
  };

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");

  function handleOnPress() {
    setOpen(!open);
    // console.log("onPress"+ date);
  }

  const handleChange = (newDate) => {
    // setBookingData((prevBookingData) => ({
    //   ...prevBookingData,
    //   recurringEndDate: newDate,
    // }));
    setDate(newDate);
  };

  const convertDateFormat = (dateString) => {
    return dateString.split("/").join("-");
  };

  const handleSaveDate = () => {
    console.log("Selected date:", date);

    bookingData.recurringEndDate = convertDateFormat(date);

    console.log("recc date", bookingData.recurringEndDate);

    setOpen(false);
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
        <Text style={styles.label}>Block: {data.block}</Text>
        <View style={styles.formContainer}>
          <SelectList
            setSelected={(val) =>
              setBookingData({ ...bookingData, bookingStart: val })
            }
            data={startTime}
            save="value"
            placeholder="Select the start time"
            label="Starting time"
            boxStyles={{ marginBottom: 10 }}
          />
          <SelectList
            setSelected={(val) =>
              setBookingData({ ...bookingData, bookingEnd: val })
            }
            data={endTime}
            save="value"
            placeholder="Select the end time"
            label="Ending time"
            boxStyles={{ marginBottom: 10 }}
          />
          <SelectList
            setSelected={(val) =>
              setBookingData({ ...bookingData, recurring: val })
            }
            data={recurring}
            save="value"
            placeholder="Select the recurring"
            label="Recurring"
            boxStyles={{ marginBottom: 10 }}
          />
          <TouchableOpacity
            onPress={handleOnPress}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              borderRadius: 10,
              padding: 10,
              alignItems: "center",
              marginBottom: 10,
              color: "gray",
            }}
          >
            <Text>{date ? `${date}` : `Enter the reccurence end date`}</Text>
          </TouchableOpacity>

          <Modal animationType="slide" transparent={true} visible={open}>
            <View style={styles.centeredView1}>
              <View style={styles.modalView1}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={date}
                  onSelectedChange={handleChange}
                />

                <TouchableOpacity onPress={handleSaveDate}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnPress}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <SelectList
            setSelected={(val) =>
              setBookingData({ ...bookingData, businessUnit: val })
            }
            data={businessUnits}
            save="value"
            placeholder="Select the business unit"
            label="Business unit"
            boxStyles={{ marginBottom: 10 }}
          />
          <SelectList
            setSelected={(val) =>
              setBookingData({ ...bookingData, purpose: val })
            }
            data={purposes}
            save="value"
            placeholder="Select the purpose"
            label="Purpose"
            boxStyles={{ marginBottom: 10 }}
          />
          {/* <TextInput
            style={styles.input}
            placeholder={bookingData.roomId}
            onChangeText={(text) =>
              setBookingData({ ...bookingData, roomId: text })
            }
          /> */}
        </View>
        <TouchableOpacity>
          <Button
            title="Book Room"
            color={"#ed1c24"}
            onPress={() => {
              handleBooking();
            }}
          />
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
              <Text style={{ margin: 20 }}>{congoMessage}</Text>
              <Button
                title="Close"
                color={"#f2c94c"}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.goBack();
                }}
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

  centeredView1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView1: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
