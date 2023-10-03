import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

import StackNavigation from "./navigation/StackNavigation";
import "react-native-gesture-handler";


export default function App() {
  return (
    <>
      <StackNavigation/>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
