import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import DropdownInput from '../components/DropDown';
import Icon from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as Yup from 'yup';
const {width} = Dimensions.get('window');
const AboutBusiness = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState({
    email: false,
    password: false,
  });
  const handleChange = (name, value) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };
  const toggleActive = name => {
    setActive({...active, [name]: !active[name]});
  };
  const handleDropdownSelect = item => {
    setSelectedItem(item);
    setDropdownOpen(false);
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^\d+$/, 'Phone number must be digits only'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    businessName: Yup.string().required('Business Name is required'),
  });
  return (
    <ScrollView>
      <View>
      <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}
        style={styles.skiprow}>
        <Text style={{marginRight: 2, fontWeight: '500', color: "black",fontWeight:'600'}}>Skip Info</Text>
        <Icon name="right" size={17} color="black" style={{top:3}}/>
        </TouchableOpacity>
      </View>
      <Block flex middle>
      
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color="#000" />
          </TouchableOpacity> */}
          <View style={{height: 150}}>
            <Image
              source={require('../assets/splash.png')}
              style={styles.image}
            />
      </View>
       <Block middle style={{paddingVertical: theme.SIZES.BASE * 2.625}}>
            <Text
              style={{
                fontSize: 30,
                color: '#000000',
                fontWeight: '500',
                marginLeft: 15,
              }}>
              About Your Business
            </Text>
            <View style={{marginTop: 20}}>
              <Text
                style={{fontWeight: 'bold', marginRight: 180, color: 'black'}}>
                Contact Information
              </Text>
            </View>
          </Block>
              {/* Formik form starts */}
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            businessName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // If validation is successful, proceed to next screen
            navigation.navigate('AddBusiness');
          }}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
          <Block flex>
            <Block center>
              <Input
                color="black"
                placeholder="First Name*"
                type="first-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd', marginTop: -40},
                ]}
              />
                {touched.firstName && errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}
              <Input
                color="black"
                placeholder="Last Name*"
                type="last-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
                {touched.lastName && errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}
              <Input
                color="black"
                placeholder="Phone number*"
                type="phone-number"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
               {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.phoneError}>{errors.phoneNumber}</Text>
                )}
              <Input
                color="black"
                placeholder="Email Address*"
                type="email-address"
                autoCapitalize="none"
                bgColor="transparent"
                // onBlur={() => toggleActive('email')}
                onFocus={() => toggleActive('email')}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
               {touched.email && errors.email && (
                  <Text style={[styles.errorText,{marginRight:30}]}>{errors.email}</Text>
                )}
              <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: 170,
                    color: 'black',
                  }}>
                  Business Information
                </Text>
              </View>
              <Input
                color="black"
                placeholder="Business Name*"
                type="business-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                onChangeText={handleChange('businessName')}
                onBlur={handleBlur('businessName')}
                value={values.businessName}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
               {touched.businessName && errors.businessName && (
                  <Text style={styles.phoneError}>{errors.businessName}</Text>
                )}
              <View style={{marginLeft: 20}}>
                <DropdownInput />
              </View>
              <Text
                center
                color={theme.COLORS.WHITE}
                size={theme.SIZES.FONT * 0.75}
                style={{
                  color: '#949494',
                  textAlign: 'center',
                  paddingHorizontal: 30,
                  marginTop: 10,
                }}>
                By completing this form, you consent to Mary J. Finder
                processing your information in accordance with our Privacy
                Policy.
              </Text>
            
              <Block center flex style={{marginTop: 25, flexDirection: 'row'}}>
                  <Button size="medium" shadowless color="#20B340" style={{height: 48}} onPress={handleSubmit}>
                    Continue
                  </Button>
                </Block>
              <View style={{flexDirection:"row",justifyContent: "space-evenly",paddingBottom:30}}>
              <Text  style={{
                  color: '#949494',
                  textAlign: 'center',
                  paddingHorizontal:0,
                  marginTop: 10,
                }}> You may want to skip</Text>
                <TouchableOpacity  onPress={() => navigation.navigate('Dashboard')}>
              
                 <Text style={{color:'blue', marginTop: 10,textDecorationLine:'underline',fontWeight:'500',  marginLeft:'5%'}}>click here</Text>
          
                </TouchableOpacity>
               
              </View>
            </Block>
          </Block>
            )}
        </Formik>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  signin: {          
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },

  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? HeaderHeight + 10 : 10, // Adjust for different platform header heights
    left: 10,
    zIndex: 1, // Ensure it's above other components
    padding: 10,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10, 
    marginLeft: 40,
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputActive: {
    borderBottomColor: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginTop: -7,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
    marginLeft: 10,
    marginRight: 10,
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  skiprow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // alignItems: 'center',
    // position: 'absolute',
    right: 5, 
    top: 10 // or whatever top value fits your layout
  },
  infoView:{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 2
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -10,
right:80,
    width: '90%',
  },
  phoneError:{
  color: 'red',
   fontSize: 12,
    marginBottom: 10,
     marginTop: -10,
    right:65,
     width: '90%',
  }
  
});

export default AboutBusiness;
