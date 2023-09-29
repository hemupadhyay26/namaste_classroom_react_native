import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  box2_90,
  btn,
  footer,
  form_grp,
  h1,
  h2,
  h3,
  label,
  login_input,
} from "../commons/button";
import img from "../../assets/favicon.png";
// import { signUp } from "../api/auth";

const Signup = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errmsg, setErrmsg] = useState(null);

  function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const submitForm = async () => {
    if (
      fdata.firstName === "" ||
      fdata.lastName === "" ||
      fdata.email === "" ||
      fdata.password === ""
    ) {
      setErrmsg("All fields are required");
      return;
    } else if (!isEmailValid(fdata.email)) {
      setErrmsg("Enter the valid email");
      return;
    } else {
      // console.log(fdata);
      await fetch("http://192.168.29.67:4000/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setErrmsg(data.error);
          } else {
            // console.log(data.udata);
            alert("Verification code has been sent successfully");
            navigation.navigate("verify", {userData: data.udata});
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView style={box2_90}>
        <View style={{ marginBottom: 20 }}>
          <Text style={h1}>Create New Account</Text>
          <Text style={h2}>Sign up to continue</Text>
        </View>

        <View style={login_input}>
          <Text style={label}>
            {errmsg ? <Text style={{ color: "red" }}>*{errmsg}</Text> : null}
          </Text>
          <View style={form_grp}>
            <Text style={label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter first name here"
              onChangeText={(text) => setFdata({ ...fdata, firstName: text })}
              onPressIn={() => setErrmsg(null)}
            />
          </View>
          <View style={form_grp}>
            <Text style={label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter last name here"
              onChangeText={(text) => setFdata({ ...fdata, lastName: text })}
              onPressIn={() => setErrmsg(null)}
            />
          </View>
          <View style={form_grp}>
            <Text style={label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email here"
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
              onPressIn={() => setErrmsg(null)}
            />
          </View>
          <View style={form_grp}>
            <Text style={label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="**********"
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onPressIn={() => setErrmsg(null)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              submitForm();
            }}
          >
            <Text style={btn}>Signup</Text>
          </TouchableOpacity>
          <Text style={h3}>
            Already Registered?
            <Text
              style={{ color: "#ed1c24" }}
              onPress={() => navigation.navigate("login")}
            >
              {" "}
              Login
            </Text>
          </Text>
        </View>
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Image source={img} style={{ width: 120, height: 120 }} />
          <Text style={footer}> © 2024 All Right Reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fbfafa",
  },

  input: {
    width: "100%",
    height: 40,
    borderWidth: 2,
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    borderRadius: 20,
  },
  box: {
    height: "10%",
    backgroundColor: "#fbfafa",
    display: "flex",
    padding: "40px",
    borderRadius: 5,
    alignItems: "center",
  },
});
