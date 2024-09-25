import React from 'react';
import { View, Text, Image, StyleSheet,Linking  } from 'react-native';
import {Button} from 'galio-framework';

const Selection = ({ navigation }) => {
  const signUpNow = () => {
    // Handle navigation or any other functionality here
    navigation.navigate('Main');
  };
  const openBusinessSignup = async () => {
    const url = 'https://maryjfinder.com/business/signup'; // Replace with your signup URL

    // Check if the URL can be opened
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      // Open the URL in an external browser
      await Linking.openURL(url);
    } else {
      // Show an alert if the URL is not supported
      Alert.alert(`Can't open this URL: ${url}`);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/splash.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.buttonContainer}>
        {/* <Button
          size="medium"
          shadowless
          color="#20B340"
          style={[styles.button, { width: 200 }]} 
          onPress={signUpNow}
        >
          Create Account
        </Button> */}
        <Button
          size="small"
          shadowless
          color="#20B340"
          style={[styles.button, { width: 250 }]} 
          onPress={openBusinessSignup}>
          {/* // onPress={() => navigation.navigate('BusinessSignUp')}> */}
          Create Business Account
        </Button>
        <Button
          size="medium"
          shadowless
          color="#20B340"
          style={[styles.button, { width: 250 }]} 
          onPress={()=>navigation.navigate('Login')}>
          Login
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  logoContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginLeft: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,

  },
  loginButton: {
    backgroundColor: '#3498db',
  },
});

export default Selection;
