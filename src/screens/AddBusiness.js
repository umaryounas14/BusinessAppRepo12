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
  TouchableOpacity,TextInput
} from 'react-native';
import {Block, Button, Input, theme} from 'galio-framework';
import {materialTheme} from '../constants';
import {HeaderHeight} from '../constants/utils';
import DropdownInput from '../components/DropDown';
import Icon from 'react-native-vector-icons/AntDesign'; 
import { Formik } from 'formik'; // Import Formik
import * as Yup from 'yup'; // Import Yup for validation
const {width} = Dimensions.get('window');
import DatePickerModal from '../components/DatePickerModal';
const AddBusiness = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState({
    email: false,
    password: false,
  });
   const [formData, setFormData] = useState({
    businessLicenseExpiration: '',
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
  // Function to handle date confirmation
  const handleDateConfirm = (date, setFieldValue) => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
      setSelectedDate(formattedDate);
      setFieldValue('expiration', formattedDate);  // <- This updates the Formik field value
    }
    setDatePickerVisible(false);
  };
  
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    businessName: Yup.string().required('Business Name is required'),
    Address1: Yup.string().required('Address one is required'),
    Address2: Yup.string().required('Address two is required'),
    city: Yup.string().required('City is required'),
    licenseNumber: Yup.string().required('License number is required'),
    name: Yup.string().required('Name is required'),
    expiration: Yup.string().required('Expiration date is required'),
    selectBusinessType: Yup.string().required('Please select a business type'),
    selectCategory: Yup.string().required('Please select a category'),
  });
  return (
    <ScrollView>
      <Block flex middle>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrowleft" size={24} color="#000" />
          </TouchableOpacity>
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
                marginTop: -20,
              }}>
              Add Your Business
            </Text>
            <Text
              center
              color={theme.COLORS.WHITE}
              size={theme.SIZES.FONT * 0.75}
              style={{
                color: '#949494',
                textAlign: 'center',
                paddingHorizontal: 20,
                marginTop: 10,
              }}>
              Please fill out and submit the form below. By submitting this
              application on behalf of a company or another legal entity, you
              confirm that you have the authority to agree to the terms and
              conditions outlined here on their behalf.
            </Text>
            <View style={{marginTop: 20}}>
              <Text
                style={{fontWeight: 'bold', marginRight: 180, color: 'black'}}>
                Contact Information
              </Text>
            </View>
           
          </Block>
          <Formik
  initialValues={{
    firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              businessName: '',
              Address1: '',
              Address2: '',
              city: '',
              licenseNumber: '',
              name: '',
              expiration: '',
              selectBusinessType: '',
              selectCategory: '',
           
  }}
  validationSchema={validationSchema}
  onSubmit={(values) => {
    console.log(values);
    navigation.navigate('UpgradePlan'); // Proceed to the next screen
  }}
>

        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldTouched, setFieldValue  }) => (
          <Block flex>
            <Block center>
              <Input
                color="black"
                placeholder="First Name*"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                type="first-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
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
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                type="last-name"
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
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
              onChangeText={(text) => {
                handleChange('phoneNumber')(text);
                // Optionally keep it touched on any change
                if (!touched.phoneNumber) {
                  setFieldTouched('phoneNumber', true);
                }
              }}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              type="phone-number"
              bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
               {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              <Input
                color="black"
                placeholder="Email Address*"
                type="email-address"
                autoCapitalize="none"
                bgColor="transparent"
                onChangeText={(text) => {
                  handleChange('email')(text);
                  // Optionally keep it touched on any change
                  if (!touched.email) {
                    setFieldTouched('email', true);
                  }
                }}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
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
                type="busniness-name"
                autoCapitalize="none"
                bgColor="transparent"
                onChangeText={(text) => {
                  handleChange('businessName')(text);
                  // Optionally keep it touched on any change
                  if (!touched.businessName) {
                    setFieldTouched('business Name', true);
                  }
                }}
                onBlur={handleBlur('businessName')}
                value={values.businessName}
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
               
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
                {touched.businessName && errors.businessName && (
                  <Text style={styles.errorText}>{errors.businessName}</Text>
                )}
              <View style={{marginLeft: 20}}>
              <DropdownInput
                  selectedItem={values.selectBusinessType}
                  onSelect={(item) => setFieldValue('selectBusinessType', item.value)}
                  placeholder="Select Business Type"
                />
                {touched.selectBusinessType && errors.selectBusinessType && (
                  <Text style={[styles.errorText,{left:20}]}>{errors.selectBusinessType}</Text>
                )}
              </View>
              <Input
  color="black"
  placeholder="Address Line 1"
  type="address"
  autoCapitalize="none"
  bgColor="transparent"
  onChangeText={(text) => {
    handleChange('Address1')(text);
    // Optionally keep it touched on any change
    if (!touched.Address1) {
      setFieldTouched('Address1', true);
    }
  }}
  onBlur={handleBlur('Address1')}
  value={values.Address1}
  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
  style={[
    styles.input,
    active.email ? styles.inputActive : null,
    { borderRadius: 15, borderColor: '#ddd' },
  ]}
/>
{touched.Address1 && errors.Address1 && (
  <Text style={styles.errorText}>{errors.Address1}</Text>
)}

              <Input
                color="black"
                placeholder="Address Line 2"
                type="address"
                onChangeText={(text) => {
                  handleChange('Address2')(text);
                  // Optionally keep it touched on any change
                  if (!touched.Address1) {
                    setFieldTouched('Address2', true);
                  }
                }}
                onBlur={handleBlur('Address2')}
                value={values.Address2}
                autoCapitalize="none"
                bgColor="transparent"
                placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                style={[
                  styles.input,
                  active.email ? styles.inputActive : null,
                  {borderRadius: 15, borderColor: '#ddd'},
                ]}
              />
               {touched.city && errors.city && (
                  <Text style={styles.errorText}>{errors.Address1}</Text>
                )}
             <Input
  color="black"
  placeholder="City*"
  type="city"
  autoCapitalize="none"
  bgColor="transparent"
  onChangeText={(text) => {
    handleChange('city')(text);
    // Optionally keep it touched on any change
    if (!touched.city) {
      setFieldTouched('city', true);
    }
  }}
  onBlur={handleBlur('city')}
  value={values.city}
  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
  style={[
    styles.input,
    active.email ? styles.inputActive : null,
    { borderRadius: 15, borderColor: '#ddd' },
  ]}
/>
{touched.city && errors.city && (
  <Text style={[styles.errorText, { marginRight: 'auto', left: 35 }]}>{errors.city}</Text>
)}

               <View style={{marginTop: 20}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginRight: 250,
                    color: 'black',
                  }}>
                  License
                </Text>
              </View>
              <Input
  color="black"
  placeholder="License No*"
  type="license"
  autoCapitalize="none"
  bgColor="transparent"
  onChangeText={(text) => {
    handleChange('licenseNumber')(text);
    // Optionally keep it touched on any change
    if (!touched.licenseNumber) {
      setFieldTouched('licenseNumber', true);
    }
  }}
  onBlur={handleBlur('licenseNumber')}
  value={values.licenseNumber}
  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
  style={[
    styles.input,
    active.email ? styles.inputActive : null,
    { borderRadius: 15, borderColor: '#ddd' },
  ]}
/>
{touched.licenseNumber && errors.licenseNumber && (
  <Text style={styles.errorText}>{errors.licenseNumber}</Text>
)}

              <View style={{marginLeft: 20}}>
               {/* Category Dropdown */}
               <DropdownInput
                  selectedItem={values.selectCategory}
                  onSelect={(item) => setFieldValue('selectCategory', item.value)}
                  placeholder="Select Category"
                />
                {touched.selectCategory && errors.selectCategory && (
                  <Text style={[styles.errorText,{left:20}]}>{errors.selectCategory}</Text>
                )}
              </View>
            
          <TouchableOpacity
              style={[
              styles.input, // Reuse the input style for consistency
             { 
            justifyContent: 'center',
            paddingVertical: 10, 
            borderRadius: 15, 
            borderColor: '#ddd', 
            marginTop: 20, 
            borderWidth:1,
            paddingHorizontal:10,
            color:'gray'
         }
  ]}
         onPress={() => setDatePickerVisible(true)}
     >
            <Text style={[styles.datePickerText,{color: selectedDate ? 'black' : 'gray' }]}>
           {selectedDate ||  "Expiration (mm/dd/yyy)"}
           </Text>

                  </TouchableOpacity>
                  {touched.expiration && errors.expiration && (
                  <Text style={styles.errorText}>{errors.expiration}</Text>
                )}
                 <DatePickerModal
                  visible={isDatePickerVisible}
                  onConfirm={(date) => handleDateConfirm(date, setFieldValue)}
                  onCancel={() => setDatePickerVisible(false)}
                  date={selectedDate ? new Date(selectedDate) : new Date()}
                  mode="date"
                />

           <Input
           placeholder='Enter Name'
           autoCapitalize='none'
           bgColor="transparent"
           type="name"
           onChangeText={handleChange('name')} // Use handleChange
           onBlur={handleBlur('name')} // Set touched on blur
           value={values.name} // Bind Formik value
           style={[styles.input, { borderRadius: 15, borderColor: '#ddd' }]}
           color='black'
           />
           {touched.name && errors.name && (
           <Text style={styles.errorText}>{errors.name}</Text>
           )}
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
              <Block center flex style={{marginTop: 20}}>
              <Button
  size="medium"
  shadowless
  color="#20B340"
  style={{ height: 48 }}
  onPress={() => {
    console.log("Button Pressed");
    console.log("Errors:", errors);
    handleSubmit();
  }}
>
  Continue
</Button>
{/* <TouchableOpacity onPress={()=>console.log('first')}>
  <Text>Continue</Text>
</TouchableOpacity> */}

              </Block>
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
    top: Platform.OS === 'ios' ? HeaderHeight + 10 : 10, 
    left: 10,
    zIndex: 1, 
    padding: 10,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center', 
    marginTop: 10, 
    marginLeft: 30,
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
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  datePickerText:{
    color:'gray'
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    right:80,
    fontSize:12
  },
  selectBusinessType: {
    color: 'red',
    marginBottom: 10,
  },
});
export default AddBusiness;
