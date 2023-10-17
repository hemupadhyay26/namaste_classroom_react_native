import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../config";
import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { StackActions } from "@react-navigation/native";
import axios from "axios";

const Profile = ({ navigation }) => {
  // const [userId, setUserId] = useState(null);
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       await AsyncStorage.getItem("token").then((value) => {
  //         setUserId(value);
  //       });

  //       // console.log("16");
  //       // console.log(userId);
  //       const response = await fetch(`${API_BASE_URL}/profile`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           authorization: `Bearer ${userId}`,
  //         },
  //       });
  //       // console.log(response);

  //       if (response.error) {
  //         const errorData = await response.json();
  //         setErrmsg(errorData.error);
  //       } else {
  //         const data = await response.json();
  //         console.log(data);
  //       }
  //     } catch (error) {
  //       console.error("An error occurred:", error);
  //     }
  //   }
  //   fetchData();
  // });

  //
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("login");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  //profile pic

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadProfileImage(result.assets[0].uri);
    }
  };
  const uploadProfileImage = async (path) => {
    const formData = new FormData();
    formData.append("profile", {
      name: Date.now() + "_profile.jpg",
      uri: path,
      type: "image/jpg",
    });

    try {
      axios({
        method: "POST",
        url: `${API_BASE_URL}/upload`,
        data: formData,
      }).then(function (res) {
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  // ------------------//
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState({
    userName: "Earth Venus",
    email: "hem@gmail.com",
    address: "Rudrapur, Uttarakhand",
    phoneno: "8928384747",
    age: "55",
    gender: "Male",
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = () => {
    handleEditToggle();
  };

  const handleTextChange = (key, newText) => {
    setData({ ...data, [key]: newText });
  };
  // -----------------//
  return (
    <View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: "#000",
            height: 200,
          }}
        ></View>
        <View style={{ alignItems: "center" }}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                marginTop: -70,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/logo1.jpg")}
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                marginTop: -70,
              }}
            ></Image>
          )}

          <TouchableOpacity onPress={pickImage} style={{ margin: 5 }}>
            <AntDesign name="plussquareo" size={24} color="green" />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              margin: 3,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isEditable ? (
              <TextInput
                style={styles.input}
                value={data.userName}
                placeholder="username"
                onChangeText={(text) => handleTextChange("userName", text)}
                autoFocus
              />
            ) : (
              <Text style={{ fontSize: 25, fontWeight: "bold", padding: 10 }}>
                {data.userName}
              </Text>
            )}
            <TouchableOpacity
              onPress={isEditable ? saveChanges : handleEditToggle}
            >
              <Text style={styles.edit_btn}>
                {isEditable ? (
                  <Feather name="save" size={24} color="black" />
                ) : (
                  <Feather name="edit" size={24} color="black" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
          {isEditable ? (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput
                style={styles.input}
                value={data.age}
                placeholder="age"
                onChangeText={(text) => handleTextChange("age", text)}
                autoFocus
              />
              <TextInput
                style={styles.input}
                value={data.gender}
                placeholder="gender"
                onChangeText={(text) => handleTextChange("gender", text)}
                autoFocus
              />
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
                {data.age},
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
                {data.gender}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.profile_details}>
          <Entypo name="email" size={24} color="black" />
          {isEditable ? (
            <TextInput
              style={styles.input}
              value={data.email}
              placeholder="email"
              onChangeText={(text) => handleTextChange("email", text)}
              autoFocus
            />
          ) : (
            <Text style={styles.text_format}>{data.email}</Text>
          )}
        </View>

        <View style={styles.profile_details}>
          <Entypo name="location-pin" size={24} color="red" />
          {isEditable ? (
            <TextInput
              style={styles.input}
              value={data.address}
              placeholder="address"
              onChangeText={(text) => handleTextChange("address", text)}
            />
          ) : (
            <Text style={styles.text_format}>{data.address}</Text>
          )}
        </View>

        <View style={styles.profile_details}>
          <Feather name="phone-call" size={24} color="black" />
          {isEditable ? (
            <TextInput
              style={styles.input}
              value={data.phoneno}
              placeholder="phone number"
              onChangeText={(text) => handleTextChange("phoneno", text)}
            />
          ) : (
            <Text style={styles.text_format}>{data.phoneno}</Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.btn_profile}
          onPress={() => {
            navigation.navigate("booking");
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Check Availability
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn_profile}
          onPress={() => {
            navigation.navigate("mybooking");
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            My Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_profile} onPress={logout}>
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 45,
            }}
          >
            LogOut
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  edit_btn: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
    // backgroundColor: "#ED1C24",
    color: "#fff",
    // padding: 8,
    borderRadius: 100,
  },
  text_format: {
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
  profile_details: {
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
    marginTop: 20,
  },
  btn_profile: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#000",
    width: "90%",
    padding: 20,
    paddingBottom: 22,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 20,
  },
});
