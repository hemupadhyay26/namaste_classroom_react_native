import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import DrawerNavigation from "../../navigation/DrawerNavigation";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Floating_btn from "../commons/Floating_btn";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import momentTimezone from "moment-timezone";

const MyBookings = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
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
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
    mybookings();
  }, []);

  // const startTime = momentTimezone
  // .tz(bookings.bookingStart, "Asia/Kolkata")
  // .format("h.mma");
  // const endTime = momentTimezone
  //   .tz(bookingData.bookingEnd, "Asia/Kolkata")
  //   .format("h.mma");
  return (
    // <DrawerNavigation/>
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{ marginVertical: 40 }}>
        {bookings.map((booking) => (
          <View style={styles.card} key={booking._id}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{booking.name}</Text>
            </View>
            <View style={styles.cardContent} key={booking._id}>
              {booking.bookings.map((booking) => (
                <View key={booking._id}>
                  <Text style={styles.cardText}>
                    {momentTimezone
                      .tz(booking.bookingStart, "Asia/Kolkata")
                      .format("h.mma")}{" "}
                    -{" "}
                    {momentTimezone
                      .tz(booking.bookingEnd, "Asia/Kolkata")
                      .format("h.mma")}
                  </Text>
                  <Text style={styles.cardText}>Duration: {booking.duration}mins</Text>
                  <Text style={styles.cardText}>{booking.businessUnit}</Text>
                  <Text style={styles.cardText}>Event: {booking.purpose}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View>
        <Floating_btn navigation={navigation} />
      </View>
    </View>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "space-between",
  },

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
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 10,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
});
