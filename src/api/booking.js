import moment from "moment";
import momentTimezone from "moment-timezone";
import { API_BASE_URL } from "../../config";
import axios from "axios";
// import api from './init'

// Function to receive booking data (AEST) and convert to JS Date object
// Data expected in [year, month, date, hours, seconds] format
const dateUTC = (dataArray) => {
  // Ensure date data is saved in AEST and then converted to a Date object in UTC
  return momentTimezone(dataArray).tz("Asia/Kolkata").toDate();
};

// Make a room booking
export async function makeBooking(data, existingBookings) {
  // Convert booking data to UTC Date objects
  let bookingStart = dateUTC(data.startDate);
  let bookingEnd = dateUTC(data.endDate);
  // console.log(`Booking Start: ${bookingStart}`);
  // console.log(`Booking End: ${bookingEnd}`);

  // Convert booking Date objects into a number value
  let newBookingStart = bookingStart.getTime();
  let newBookingEnd = bookingEnd.getTime();
  // console.log(`Booking newBookingStart: ${newBookingStart}`);
  // console.log(`Booking newBookingStart: ${newBookingStart}`);
  // console.log(`Booking time: ${new Date().getTime()}`);
  // console.log(`Booking time: ${newBookingStart > new Date().getTime()}`);

  // Check whether the new booking times overlap with any of the existing bookings
  let bookingClash = false;

  existingBookings.forEach((booking) => {
    // Convert existing booking Date objects into number values
    let existingBookingStart = new Date(booking.bookingStart).getTime();
    let existingBookingEnd = new Date(booking.bookingEnd).getTime();

    // Check whether there is a clash between the new booking and the existing booking
    if (
      (newBookingStart >= existingBookingStart &&
        newBookingStart < existingBookingEnd) ||
      (existingBookingStart >= newBookingStart &&
        existingBookingStart < newBookingEnd)
    ) {
      // Switch the bookingClash variable if there is a clash
      return (bookingClash = true);
    }
  });

  // Ensure the new booking is valid (i.e. the start time is before the end time, and the booking is for a future time)
  let validDate = newBookingStart < newBookingEnd;
  // let validDate = newBookingStart < newBookingEnd && newBookingStart > new Date().getTime()

  // If a recurring booking as been selected, ensure the end date is after the start date
  let validRecurring =
    data.recurringData.length > 0
      ? dateUTC(data.recurringData[0]).getTime() > newBookingEnd
      : true;

  // console.log("line  44-> " + bookingClash);
  // Save the booking to the database and return the booking if there are no clashes and the new booking time is not in the past
  if (!bookingClash && validDate && validRecurring) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/rooms/${data.roomId}`,
        {
          bookingStart: bookingStart,
          bookingEnd: bookingEnd,
          businessUnit: data.businessUnit,
          purpose: data.purpose,
          roomId: data.roomId,
          recurring: data.recurringData
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${data.token}`
          }
        }
      );
      return response.data;
      // Handle success response or return data as needed
    } catch (error) {
      console.log('Error sending booking data:', error);
      // Handle error as needed
    }
  }
}
