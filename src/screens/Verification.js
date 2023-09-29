import {
  Image,
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
// import { signIn } from "../api/auth";

const Verification = ({ navigation, route }) => {
  const { userData } = route.params;
  const [usercode, setUsercode] = useState("");
  const [actualcode, setActualcode] = useState(null);
  const [errmsg, setErrmsg] = useState(null);

  useEffect(() => {
    setActualcode(userData[0]?.VerificationCode);
  }, []);

  const submitForm = async () => {
    if (!usercode) {
      setErrmsg("All fields are required");
      return;
    } else if (usercode == actualcode) {
      const fdata = {
        firstName: userData[0]?.firstName,
        lastName: userData[0]?.lastName,
        email: userData[0]?.email,
        password: userData[0]?.password,
      };
      await fetch("http://192.168.29.67:4000/signup", {
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
            alert("User Registered Successfully");
            navigation.navigate("login");
          }
        });
    } else {
      setErrmsg("Incorrect code");
      return;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          source={img}
          style={{ width: 450, height: 450, resizeMode: "contain" }}
        />
      </View>
      <View style={box2}>
        <Text style={h1}>Verification</Text>
        <Text style={h2}>verify to continue</Text>
        <View style={login_input}>
          <Text style={label}>
            {errmsg ? <Text style={{ color: "red" }}>*{errmsg}</Text> : null}
          </Text>
          <View style={form_grp}>
            <Text style={label}>Verification code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter verification code here"
              onChangeText={(text) => setUsercode(text)}
              onPressIn={() => setErrmsg(null)}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              submitForm();
            }}
          >
            <Text style={btn}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Verification;

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
