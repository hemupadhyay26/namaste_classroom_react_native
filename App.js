// import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

import StackNavigation from "./navigation/StackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigation />
      <StatusBar style="auto" />
    </GestureHandlerRootView>
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
