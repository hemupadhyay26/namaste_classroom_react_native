import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
// import Checkbox from "expo-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import Floating_btn from "../commons/Floating_btn";
import { API_BASE_URL } from "../../config";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import axios from "axios";
import BookClassroom from "./BookClassroom";

const BookClasses = ({ navigation }) => {
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    const roomsData = async () => {
      try {
        axios
          .get(`${API_BASE_URL}/rooms`, {
            headers: {
              "content-type": "application/json",
            },
          })
          .then((response) => {
            // console.log(response.data);
            setRoomList(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("Error-> " + error);
      }
    };
    roomsData();
  }, []);

  const [selectedFloor, setSelectedFloor] = useState([]);
  const [selectedCapacity, setSelectedCapacity] = useState([]);

  const floors = [
    { key: "1", value: "Ground" },
    { key: "2", value: "First" },
    { key: "3", value: "Second" },
  ];

  const capacitys = [
    { key: "1", value: "16" },
    { key: "2", value: "18" },
    { key: "3", value: "30" },
    { key: "4", value: "50" },
    { key: "5", value: "60" },
  ];

  const [viewFilters, setViewFilters] = useState(true);

  const filterData = () => {
    // console.log("Capacity "+selectedCapacity);
    // console.log("Floor "+selectedFloor);
    const filterData = {
      floor: selectedFloor,
      capacity: selectedCapacity,
    };

    try {
      axios
        .post(`${API_BASE_URL}/filter`, filterData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setRoomList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    // <DrawerNavigation/>
    <ScrollView>
      <View style={{ backgroundColor: "#8c8c8c" }}>
        <View style={{ bottom: 0, margin: 50 }}>
          <Text style={{ fontSize: 40 }}>Filters</Text>
          <TouchableOpacity onPress={() => setViewFilters(!viewFilters)}>
            {viewFilters ? (
              <AntDesign name="caretup" size={24} color="black" />
            ) : (
              <AntDesign name="caretdown" size={24} color="black" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {viewFilters ? (
        <View name="filter">
          <View style={styles.container}>
            <Text> Floor </Text>
            <MultipleSelectList
              setSelected={(val) => setSelectedFloor(val)}
              data={floors}
              save="value"
              placeholder="Select the floor"
              label="Floors"
            />
          </View>

          <View style={styles.container}>
            <Text> Capacity </Text>
            <MultipleSelectList
              setSelected={(val) => setSelectedCapacity(val)}
              data={capacitys}
              save="value"
              placeholder="Select the capacity"
              label="Capacity"
            />
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={filterData}>
              <Text
                style={{
                  backgroundColor: "rgba(237, 28, 36, 1)",
                  color: "#fff",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                  textAlign: "center",
                  borderRadius: 50,
                }}
              >
                Filter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // setSelected("");
                // roomsData();
                console.log(roomList[0]);
              }}
            >
              <Text
                style={{
                  borderWidth: 2,
                  borderColor: "rgba(237, 28, 36, 1)",
                  color: "#000",
                  padding: 10,
                  borderRadius: 5,
                  marginTop: 20,
                  textAlign: "center",
                  borderRadius: 50,
                }}
              >
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        ""
      )}
      <Text
        style={{
          marginHorizontal: 20,
          marginVertical: 20,
          borderTopWidth: 0.5,
          paddingBottom: 5,
        }}
      >
        Total room are &nbsp;
        <Text
          style={{
            color: "#ED1C24",
          }}
        >
          {roomList.length}
        </Text>
      </Text>
      {roomList.map((room) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("bookclassroom", { data: room });
          }}
        >
          <View style={styles.card} key={room._id}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{room.name}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>Capacity - {room.capacity}</Text>
              <Text style={styles.cardText}>Floors - {room.floor}</Text>
              <Text style={styles.cardText} key={room._id}>
                Assets -{" "}
                {Object.keys(room.assets).filter(
                  (asset) => room.assets[asset] === true
                ).length > 0
                  ? Object.keys(room.assets)
                      .filter((asset) => room.assets[asset] === true)
                      .join(", ")
                  : "N/A"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* <Floating_btn navigation={navigation} /> */}
    </ScrollView>
  );
};

export default BookClasses;
const styles = StyleSheet.create({
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
  checkbox: {
    margin: 8,
    borderRadius: 10,
  },
});
