import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center',    // Center content vertically (optional)
  },
});

export default Welcome;