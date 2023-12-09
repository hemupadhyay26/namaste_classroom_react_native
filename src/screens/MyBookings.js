import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Floating_btn from "../commons/Floating_btn";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { useFocusEffect } from "@react-navigation/native";

const MyBookings = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
  // const startTime = momentTimezone
  // .tz(bookings.bookingStart, "Asia/Kolkata")
  // .format("h.mma");
  // const endTime = momentTimezone
  //   .tz(bookingData.bookingEnd, "Asia/Kolkata")
  //   .format("h.mma");
  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={{ marginVertical: 40 }}>
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            textAlign: "center",
            width: "100%",
            marginBottom: 20,
          }}
        >
          My Bookings
        </Text>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ED1C24" />
          </View>
        )}
        {bookings.map((booking, index) => (
          <View style={styles.card} key={booking._id}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{booking.name}</Text>
            </View>
            <View style={styles.cardContent}>
              {booking.bookings.map((booking, bIndex) =>
                bIndex === 0 && booking ? (
                  <View key={booking._id}>
                    <View>
                      <Text style={styles.cardText}>
                        Event: {booking.purpose}
                      </Text>
                      <Text style={styles.cardText}>
                        On:{" "}
                        {momentTimezone
                          .tz(booking.bookingStart, "Asia/Kolkata")
                          .format("DD-MM-YY")}
                      </Text>
                      <Text style={styles.cardText}>
                        {momentTimezone
                          .tz(booking.bookingStart, "Asia/Kolkata")
                          .format("h.mma")}{" "}
                        -{" "}
                        {momentTimezone
                          .tz(booking.bookingEnd, "Asia/Kolkata")
                          .format("h.mma")}
                      </Text>
                      <Text style={styles.cardText}>
                        Duration: {booking.duration} mins
                      </Text>
                      <Text style={styles.cardText}>
                        Recurrence: {booking.recurring[1]}
                      </Text>
                      <Text style={styles.cardText}>
                        Till:{" "}
                        {booking.recurring[0][2] +
                          "-" +
                          booking.recurring[0][1] +
                          1 +
                          "-" +
                          booking.recurring[0][0]}
                      </Text>
                      <Text style={styles.cardText}>
                        Business: {booking.businessUnit}
                      </Text>
                    </View>
                  </View>
                ) : null
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("mybookingclass", { data: booking });
                }}
                style={styles.btn_profile2}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    fontWeight: "bold",
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
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
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardContent: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  seeMoreText: {
    color: "blue",
    textAlign: "center",
    marginTop: 5,
    textDecorationLine: "underline",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  btn_profile2: {
    width: "100%",
    backgroundColor: "#000",
    backgroundColor: "#ed1c24",
    padding: 10,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
  },
});
