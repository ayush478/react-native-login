import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, View, Button,TextInput } from "react-native";

import React, { useState, useEffect } from 'react';
import GlobalStyle from "../utils/GlobalStyle";
import Login from "./Login";
import CustomButton from "../utils/CustomButton";
CustomButton
const Home = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
      getData();
  }, []);

  const getData = () => {
      try {
          AsyncStorage.getItem('UserData')
              .then(value => {
                  if (value != null) {
                      let user = JSON.parse(value);
                      setName(user.Name);
                      setPhone(user.Phone);
                  }
              })
      } catch (error) {
          console.log(error);
      }
  }

  const updateData = async () => {
      if (name.length == 0) {
          Alert.alert('Warning!', 'Please write your data.')
      } else {
          try {
              var user = {
                  Name: name
              }
              await AsyncStorage.mergeItem('UserData', JSON.stringify(user));
              Alert.alert('Success!', 'Your data has been updated.');
          } catch (error) {
              console.log(error);
          }
      }
  }

  const removeData = async () => {
      try {
          await AsyncStorage.clear();
          navigation.navigate('Login');
      } catch (error) {
          console.log(error);
      }
  }

  return (
      <View style={styles.body}>
          <Text style={[
              GlobalStyle.CustomFont,
              styles.text
          ]}>
              Welcome {name} !
          </Text>
          <Text style={[
              GlobalStyle.CustomFont,
              styles.text
          ]}>
              Your Phone No. is {phone}
          </Text>
          <TextInput
              style={styles.input}
              placeholder='Enter your name'
              value={name}
              onChangeText={(value) => setName(value)}
          />
          
          <CustomButton
              title='Update'
              color='#ff7f00'
              on
              onPress={updateData}
          />
          <CustomButton
              title='Remove'
              color='red'
            
              onPress={removeData}
          />
      </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  body: {
      flex: 1,
      alignItems: 'center',
  },
  text: {
      fontSize: 40,
      margin: 10,
  },
  input: {
      width: 300,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 130,
      marginBottom: 10,
  }
})