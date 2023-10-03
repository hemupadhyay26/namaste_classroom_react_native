import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  box2,
  btn,
  form_grp,
  h1,
  h2,
  h3,
  label,
  login_input,
} from "../commons/button";
import img from "../../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { signIn } from "../api/auth";

const Login = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    email: "",
    password: "",
  });

  const [errmsg, setErrmsg] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("token").then((value) => {
        if (value != null) {
          // console.log("41");
          // console.log(AsyncStorage.getItem("token").value);
          navigation.navigate("main");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async () => {
    // console.log(fdata);
    const { email, password } = fdata;
    if (!email || !password) {
      setErrmsg("All fields are required");
      return;
    } else {
      await fetch("http://192.168.29.67:4000/login", {
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
            alert("Account Logged In successfully");
            // console.log(data.token);
            AsyncStorage.setItem("token", JSON.stringify(data.token));
            navigation.navigate("main");
          }
        });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Image source={img} style={{ width: 450, height: 450 }} />
      </View>
      <ScrollView style={box2}>
          <Text style={h1}>Login</Text>
          <Text style={h2}>Sign in to continue</Text>
          <View style={login_input}>
            <Text style={label}>
              {errmsg ? <Text style={{ color: "red" }}>*{errmsg}</Text> : null}
            </Text>
            <View style={form_grp}>
              <Text style={label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter name here"
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
              <Text style={btn}>Login</Text>
            </TouchableOpacity>
            <Text style={h3}>
              Don't have an account?
              <Text
                style={{ color: "#ed1c24" }}
                onPress={() => navigation.navigate("signup")}
              >
                Signup
              </Text>
            </Text>
          </View>
      </ScrollView>
    </ScrollView>
  );
};

export default Login;

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
    height: "50%",
    backgroundColor: "#fbfafa",
    display: "flex",
    padding: "40px",
    borderRadius: 5,
    alignItems: "center",
  },
});
