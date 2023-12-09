import {
  Alert,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import momentTimezone from "moment-timezone";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const screenWidth = Dimensions.get("window").width;

const BookingItem = ({ booking, deleteBooking }) => (
  <View style={[styles.bookingCard, { width: screenWidth - 40 }]}>
    <Text style={styles.bookingText}>
      {`On: ${momentTimezone
        .tz(booking.bookingStart, "Asia/Kolkata")
        .format("DD/MM/YYYY ")}`}
    </Text>
    <Text style={styles.bookingText}>{`Purpose: ${booking.purpose}`}</Text>
    <Text style={styles.bookingText}>
      {`Start: ${momentTimezone
        .tz(booking.bookingStart, "Asia/Kolkata")
        .format("h.mma")}`}
    </Text>
    <Text style={styles.bookingText}>
      {`End: ${momentTimezone
        .tz(booking.bookingEnd, "Asia/Kolkata")
        .format("h.mma")}`}
    </Text>
    <TouchableOpacity
      onPress={() => deleteBooking(booking.roomId, booking._id)}
    >
      <Text style={styles.deleteButton}>Delete</Text>
    </TouchableOpacity>
  </View>
);

const OneClassYourBookingData = ({ route, navigation }) => {
  const { data } = route.params;
  console.log(data);

  const deleteBooking = async (roomId, bookingId) => {
    console.log(`Deleting  front ${roomId} from ${bookingId}`);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/rooms/${roomId}/${bookingId}`
      );
      if (response.status === 201) {
        Alert.alert(
          "Success",
          `Booking with ID ${response.data.name} deleted successfully`,
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack(); // Navigate back or perform any other action
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error(
          `Unable to delete booking with ID ${bookingId} from room ${roomId}.`
        );
        // Handle error scenarios if needed
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Handle error scenarios if needed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{data.name}</Text>

      <Text style={styles.sectionHeader}>Bookings:</Text>
      <FlatList
        data={data.bookings}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <BookingItem booking={item} deleteBooking={deleteBooking} />
        )}
      />
    </View>
  );
};

export default OneClassYourBookingData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  heading: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  bookingCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
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
  bookingText: {
    fontSize: 18,
    marginBottom: 8,
  },
  deleteButton: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});
