import { StatusBar } from "expo-status-bar";

import { StyleSheet, Text, View ,Button} from "react-native";

import React from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>hi</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default Home;
