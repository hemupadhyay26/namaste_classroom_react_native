import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { btn, floating_add_btn } from "../commons/button";
import momentTimezone from "moment-timezone";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FloatingAction } from "react-native-floating-action";
import { AntDesign, Ionicons, Entypo } from "@expo/vector-icons";

import CalendarPicker from "react-native-calendar-picker";
import Floating_btn from "../commons/Floating_btn";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import moment from "moment-timezone";
import { useFocusEffect } from "@react-navigation/native";

const Welcome = ({ navigation }) => {
  

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  // const onDateChange = (date, type) => {
  //   setSelectedStartDate(date);
  // };
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const mybookings = async () => {
    let userId = "";
    await AsyncStorage.getItem("token").then((value) => {
      userId = value;
    });
    axios
      .get(`${API_BASE_URL}/mybookings`, {
        headers: {
          Authorization: "Bearer " + userId,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(response.data);
        setBookings(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false); 
      });
  };
  useEffect(() => {
    mybookings();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      mybookings();
    }, [])
  );

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

  const today = moment().startOf("day");

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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ED1C24"
            style={styles.loadingIndicator}
          />
        ) : (
          <React.Fragment>
            {bookings.length === 0 ? (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No classes booked for today
              </Text>
            ) : (
              bookings.map((booking, index) => (
                <View key={booking._id}>
                  {booking.bookings
                    .filter(
                      (booking) =>
                        momentTimezone
                          .tz(booking.bookingStart, "Asia/Kolkata")
                          .isSame(today, "day") // Filter bookings for today's date
                    )
                    .map((filteredBooking) => (
                      <View style={styles.card} key={filteredBooking._id}>
                        <View style={styles.cardHeader}>
                          <Text style={styles.cardTitle}>{booking.name}</Text>
                        </View>
                        <View style={styles.cardContent}>
                          {/* Display details for bookings on today's date */}
                          <Text>{filteredBooking.purpose}</Text>
                          <Text>Block: {booking.block}</Text>
                          <Text>
                            On:{" "}
                            {momentTimezone
                              .tz(filteredBooking.bookingStart, "Asia/Kolkata")
                              .format("DD-MM-YY")}
                          </Text>
                          <Text style={styles.cardText}>
                            {momentTimezone
                              .tz(filteredBooking.bookingStart, "Asia/Kolkata")
                              .format("h.mma")}{" "}
                            -{" "}
                            {momentTimezone
                              .tz(filteredBooking.bookingEnd, "Asia/Kolkata")
                              .format("h.mma")}
                          </Text>
                          {/* Other booking details */}
                        </View>
                      </View>
                    ))}
                </View>
              ))
            )}
          </React.Fragment>
        )}
      </ScrollView>
      <View style={{ bottom: 40 }}>
        <Floating_btn navigation={navigation} />
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
