// import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";

import StackNavigation from "./navigation/StackNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import AWS from 'aws-sdk'
// import { ACCESS_KEY, ACCESS_SECRET, REGION } from "./config";
// AWS.config.update({
//   secretAccessKey: ACCESS_SECRET,
//   accessKeyId: ACCESS_KEY,
//   region: REGION,
// });

// const s3 = new AWS.S3();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StackNavigation />
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
