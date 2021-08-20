import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";


export default function Login({ navigation }) {
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  useEffect(() => {
    getData();
}, []);

const getData = () => {
    try {
        AsyncStorage.getItem('UserData')
            .then(value => {
                if (value != null) {
                    navigation.navigate('Home');
                }
            })
    } catch (error) {
        console.log(error);
    }
}

const setData = async () => {
    if (name.length == 0 || age.length == 0) {
        Alert.alert('Warning!', 'Please write your data.')
    } else {
        try {
            var user = {
                Name: name,
                Age: age
            }
            await AsyncStorage.setItem('UserData', JSON.stringify(user));
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
        }
    }
}

  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("../assets/icon.png")} /> */}

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="name."
          placeholderTextColor="#003f5c"
          onChangeText={(name) => setname(name)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="age."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(age) => setage(age)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot age?</Text>
      </TouchableOpacity>


      <Button 
      title="Login" onPress={setData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
