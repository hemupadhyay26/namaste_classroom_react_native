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
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const Profile = ({ navigation }) => {
  // ------------------//
  const [isEditable, setIsEditable] = useState(false);
  const [data, setData] = useState({
    firstName: "---",
    lastName: "---",
    email: "--@gmail.com",
    address: "--, --",
    phoneNo: "-- -- --",
    age: "--",
    gender: "----",
    profile: "",
  });

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const saveChanges = async () => {
    const { firstName, lastName, email } = data;
    if (!firstName || !lastName || !email) {
      console.log("error saving changes");
      return;
    }
    try {
      let userId = "";
      await AsyncStorage.getItem("token").then((value) => {
        userId = value;
      });
      axios
        .post(`${API_BASE_URL}/profile`, data, {
          headers: {
            Authorization: `Bearer ${userId}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          handleEditToggle();
        })
        .catch((error) => {
          // Handle any errors here
          console.error(error);
        });
    } catch (error) {
      console.log("error" + error.message);
    }
  };

  const handleTextChange = (key, newText) => {
    setData({ ...data, [key]: newText });
  };
  // -----------------//
  // const [userId, setUserId] = useState(null);
  async function fetchData() {
    try {
      let userId = "";
      await AsyncStorage.getItem("token").then((value) => {
        userId = value;
      });

      // console.log("16");
      // console.log(userId);
      axios
        .get(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${userId}`, // Assuming it's a Bearer token
          },
        })
        .then((response) => {
          // Handle the successful
          // console.log("89-->", response.data);
          setData(response.data);
          if (response.data.profile) {
            axios
              .get(`${API_BASE_URL}/url/${response.data.profile}`, {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                setImage(response.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          // Handle any errors here
          console.error(error);
        });
      // const response = await fetch(`${API_BASE_URL}/profile`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     authorization: `Bearer ${userId}`,
      //   },
      // });
      // // console.log(response);

      // if (response.error) {
      //   const errorData = await response.json();
      //   setErrmsg(errorData.error);
      // } else {
      //   const data = await response.json();
      //   console.log(data);
      //   handleTextChange("email", data.email);
      //   handleTextChange("userName", data.firstName);
      // }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

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

  const [image, setImage] = useState("https://avatar.iran.liara.run/public/50");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      uploadProfileImage(result.assets[0].uri);

      // console.log("162-->", data);
      saveChanges();
      // console.log("162-->",data);
    }
  };
  const uploadProfileImage = async (path) => {
    // setImage(path);
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
        setImage(res.data.url);
        handleTextChange("profile", res.data.filename);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
              <View>
                <TextInput
                  style={styles.input}
                  value={data.firstName}
                  placeholder="username"
                  onChangeText={(text) => handleTextChange("firstName", text)}
                  autoFocus
                />
                <TextInput
                  style={styles.input}
                  value={data.lastName}
                  placeholder="username"
                  onChangeText={(text) => handleTextChange("lastName", text)}
                  autoFocus
                />
              </View>
            ) : (
              <Text style={{ fontSize: 25, fontWeight: "bold", padding: 10 }}>
                {data.firstName + " " + data.lastName || "Username"}
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
                style={{ marginLeft: 5 }}
                value={data.gender}
                placeholder="gender"
                onChangeText={(text) => handleTextChange("gender", text)}
                autoFocus
              />
            </View>
          ) : (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
                {data.age || "Age"},
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "bold", color: "gray" }}>
                {data.gender || "Gender"}
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
            <Text style={styles.text_format}>{data.address || "Address"}</Text>
          )}
        </View>

        <View style={styles.profile_details}>
          <Feather name="phone-call" size={24} color="black" />
          {isEditable ? (
            <TextInput
              style={styles.input}
              value={data.phoneNo}
              placeholder="phone number"
              onChangeText={(text) => handleTextChange("phoneNo", text)}
            />
          ) : (
            <Text style={styles.text_format}>
              {data.phoneNo || "Phone Number"}
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row", // Horizontally align the buttons
            justifyContent: "space-around",
          }}
        >
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
        </View>
        <TouchableOpacity style={styles.btn_profile2} onPress={logout}>
          <Text
            style={{
              fontSize: 15,
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 10,
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
    backgroundColor: "#000",
    alignSelf: "center",
    padding: 30,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 30,
    width: "45%",
  },
  btn_profile2: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 22,
    backgroundColor: "#000",
    alignSelf: "center",
    backgroundColor: "#ed1c24",
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    margin: 10,
    // marginHorizontal:60,
  },
});
