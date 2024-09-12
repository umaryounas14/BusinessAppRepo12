import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Block, Button, Input, theme } from 'galio-framework';
import { materialTheme } from '../constants';
import DropdownInput from '../components/DropDown';
import { useDispatch, useSelector } from 'react-redux';
import { activateMyStore } from '../redux/slices/activateStoreSlice';
import { fetchSuggestions } from '../redux/slices/storeSuggestionSlice';
import DatePickerModal from '../components/DatePickerModal'; // Import the DatePickerModal

const { width } = Dimensions.get('window');
const ActivateStore = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const suggestionStatus = useSelector(state => state.storeSuggestions?.status || []);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [isSuggestionsVisible, setSuggestionsVisible] = useState(false);
  const { storeId } = route.params || { storeId: null };
  const [selectedItem, setSelectedItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  console.log('selectedStoreId-----------------',selectedStoreId);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    businessName: '',
    businessType: '',
    businessAddress1: '',
    businessAddress2: '',
    businessCity: '',
    businessState: '',
    businessPostcode: '',
    businessWebsite: '',
    businessLicense: '',
    businessLicenseType: '',
    businessLicenseExpiration: '',
  });
  const [errors, setErrors] = useState({});
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State for DatePickerModal

  const states = [
    { label: 'NY', value: '1' },
    { label: 'AL', value: '2' },
    { label: 'AK', value: '3' },
    { label: 'AZ', value: '4' },
    { label: 'FL', value: '5' },
    { label: 'HI', value: '6' },
    { label: 'MD', value: '7' },
    { label: 'MA', value: '8' },
  ];

  const businessTypes = [
    { label: 'dispensaries' },
  ];

  const licenseTypes = [
    { label: 'Business License', value: '1' },
    { label: 'Professional License', value: '2' },
    // Add other license types here
  ];

  const handleInputChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const isInt = (value) => {
    return !isNaN(value) && Number.isInteger(parseFloat(value));
  };
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [

      'firstName',
      'lastName',
      'phone',
      'email',
      'businessName',
      'businessType',
      'businessCity',
      'businessState',
      'businessPostcode',
      'businessLicense',
      'businessLicenseType',
      'businessLicenseExpiration',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    }
    if (formData.phone && isNaN(Number(formData.phone))) {
      newErrors.phone = 'Phone number must be numeric';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email must be a valid email address';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = () => {
    const isValid = validateForm(); // Assumes you have a validation function
  
    if (!isValid) {
      return;
    }
  const storeIdToUse = selectedStoreId || storeId;
    if (typeof storeIdToUse === 'undefined' || storeIdToUse === '' || storeIdToUse === null) {
      if (isInt(formData.businessName)) {
        storeIdToUse = formData.businessName;
      }
    }
    console.log('storeIdToUse0000000000000000000000000000',storeIdToUse)
    dispatch(activateMyStore({ ...formData ,store_id: storeIdToUse }))
      .unwrap()
      .then((response) => {
        console.log('Store activated successfully:', response);
      if (navigation && typeof navigation.goBack === 'function') {
        navigation.goBack({store_id: selectedStoreId}); // Navigate back after successful activation
      } else {
        console.error('Navigation object is undefined or invalid');
      }
    })
      .catch((err) => {
        console.error('Activation failed:', err);
      });
  };
  
  useEffect(() => {
    if (searchTerm.length > 2) {
      dispatch(fetchSuggestions({ businessType: formData.businessType, search: searchTerm }));
      setSuggestionsVisible(true);
    } else {
      setSuggestionsVisible(false);
    }
  }, [searchTerm]);

  const handleDateConfirm = date => {
    if (date) {
      const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
      setFormData(prevState => ({
        ...prevState,
        businessLicenseExpiration: formattedDate,
      }));
    }
    setDatePickerVisible(false);
  };

  const handleSearchInputChange = text => {
    setSearchTerm(text);
    setFormData(prevState => ({
      ...prevState,
      businessName: text, // Update businessName even if the user types
    }));
    setSelectedStoreId(null); // Reset the selected store ID
    if (text.length > 2) {
      dispatch(fetchSuggestions({ businessType: formData.businessType, search: text }))
        .unwrap()
        .then(response => {
          setSuggestions(response.body.response); // Update suggestions state with API response
          setSuggestionsVisible(true);
        })
        .catch(err => {
          console.error('Error fetching suggestions:', err);
          setSuggestionsVisible(false);
        });
    } else {
      setSuggestionsVisible(false);
    }
  };

  const handleSuggestionSelect = item => {
    setSelectedStoreId(item.id);
    setFormData(prevState => ({
      ...prevState,
      businessName: item.title, // Adjust based on your suggestion structure
    }));
    setSearchTerm(item.title);
    setSuggestionsVisible(false);
  };

  return (
    <View style={styles.container1}>
      <View style={styles.announcementBanner}>
        <Text style={styles.announcementText}>Activate Your Store!</Text>
      </View>
      <TouchableOpacity style={[styles.iconContainer, {top: 53, right: 60}]}>
        <Icon name="bell" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconContainer,
          {
            top: 50,
            right: 20,
            backgroundColor: '#099D63',
            borderRadius: 20,
            width: 30,
            height: 30,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
        <Icon name="user" size={24} color="white" />
      </TouchableOpacity>
      <ScrollView>
        <Block flex middle>
          <View behavior="padding" enabled>
            <Block middle style={{paddingVertical: theme.SIZES.BASE * 4}}>
              <Text
                style={{
                  fontSize: 30,
                  color: '#000000',
                  fontWeight: '500',
                  marginLeft: 15,
                  marginTop: -20,
                }}>
                Activate Store
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
                  style={{
                    fontWeight: 'bold',
                    marginRight: 180,
                    color: 'black',
                  }}>
                  Contact Information
                </Text>
              </View>
            </Block>
            <Block flex>
              <Block center>
                <Input
                  color="black"
                  placeholder="First Name*"
                  type="first-name"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd', marginTop: -40},
                  ]}
                  onChangeText={text => handleInputChange('firstName', text)}
                />
                {errors.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Last Name*"
                  type="last-name"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                  onChangeText={text => handleInputChange('lastName', text)}
                />
                {errors.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Phone number*"
                  type="phone-number"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                  onChangeText={text => handleInputChange('phone', text)}
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Email Address*"
                  type="email-address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                  onChangeText={text => handleInputChange('email', text)}
                />
                {errors.email && (
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
                <View style={{marginLeft: 20}}>
                  <DropdownInput
                    placeholder="Business Type*"
                    data={businessTypes}
                    onSelect={item =>
                      handleDropdownChange('businessType', item.label)
                    }
                  />
                </View>
                {errors.businessType && (
                  <Text style={styles.errorText}>{errors.businessType}</Text>
                )}
                <Input
                  color="black"
                  placeholder="Business Name*"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor="#888"
                  // style={styles.input}
                  value={searchTerm}
                  onChangeText={handleSearchInputChange}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />

                {/* Suggestions dropdown */}
                {isSuggestionsVisible && suggestions.length > 0 && (
                  <View style={styles.suggestionsContainer}>
                    <ScrollView>
                      {suggestions.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.suggestionItem}
                          onPress={() => handleSuggestionSelect(item)}>
                          <Text style={styles.suggestionText}>{item.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
                  
                <Input
                  color="black"
                  placeholder="Address Line 1"
                  type="address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessAddress1', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                <Input
                  color="black"
                  placeholder="Address Line 2"
                  type="address"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessAddress2', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                <Input
                  color="black"
                  placeholder="City*"
                  type="city"
                  autoCapitalize="none"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text => handleInputChange('businessCity', text)}
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessCity && (
                  <Text style={styles.errorText}>{errors.businessCity}</Text>
                )}

                <View style={{marginLeft: 20}}>
                  <DropdownInput
                    placeholder="State*"
                    data={states}
                    onSelect={item =>
                      handleDropdownChange('businessState', item.label)
                    }
                  />
                </View>
                {errors.businessState && (
                  <Text style={styles.errorText}>{errors.businessState}</Text>
                )}

                <Input
                  color="black"
                  placeholder="Postal Code*"
                  autoCapitalize="none"
                  type="Postal Code"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessPostcode', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessPostcode && (
                  <Text style={styles.errorText}>
                    {errors.businessPostcode}
                  </Text>
                )}

                <Input
                  color="black"
                  placeholder="Website"
                  autoCapitalize="none"
                  type="website"
                  bgColor="transparent"
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessWebsite', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />

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
                  placeholderTextColor={materialTheme.COLORS.PLACEHOLDER}
                  onChangeText={text =>
                    handleInputChange('businessLicense', text)
                  }
                  style={[
                    styles.input,
                    {borderRadius: 15, borderColor: '#ddd'},
                  ]}
                />
                {errors.businessLicense && (
                  <Text style={styles.errorText}>{errors.businessLicense}</Text>
                )}

                <View style={{marginLeft: 20}}>
                  <DropdownInput
                    placeholder="License Type*"
                    data={licenseTypes}
                    onSelect={item =>
                      handleDropdownChange('businessLicenseType', item.label)
                    }
                  />
                </View>
                {errors.businessLicenseType && (
                  <Text style={styles.errorText}>
                    {errors.businessLicenseType}
                  </Text>
                )}

                <TouchableOpacity
                  style={[
                    styles.input,
                    {
                      borderRadius: 15,
                      borderColor: '#ddd',
                      paddingVertical: 12,
                      paddingHorizontal: 15, // Ensure horizontal padding for consistency
                      borderWidth: 1, // Ensure border width matches other inputs
                      backgroundColor: 'transparent', // Set background color to match other inputs
                      marginBottom: 10, // Add margin if needed to match other inputs
                      marginTop: 10,
                    },
                  ]}
                  onPress={() => setDatePickerVisible(true)} // Show the date picker
                >
                  <Text
                    style={{
                      color: formData.businessLicenseExpiration
                        ? 'black'
                        : '#949494',
                      fontSize: 16, // Ensure font size matches other inputs
                    }}>
                    {formData.businessLicenseExpiration ||
                      'Expiration (yyyy-mm-dd)'}
                  </Text>
                </TouchableOpacity>
                {errors.businessLicenseExpiration && (
                  <Text style={styles.errorText}>
                    {errors.businessLicenseExpiration}
                  </Text>
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
                    style={{height: 48}}
                    onPress={handleSubmit}>
                    Continue
                  </Button>
                </Block>
              </Block>
            </Block>
          </View>
        </Block>
      </ScrollView>
      <DatePickerModal
        visible={isDatePickerVisible}
        onConfirm={handleDateConfirm}
        onCancel={() => setDatePickerVisible(false)}
        date={
          formData.businessLicenseExpiration
            ? new Date(formData.businessLicenseExpiration)
            : new Date()
        } // Default to current date if empty
        mode="date"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    flex: 1,
  },
  announcementBanner: {
    backgroundColor: '#099D63',
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  announcementText: {
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
  },
  iconContainer: {
    position: 'absolute',
  },
  input: {
    width: width * 0.9,
    borderRadius: 0,
    borderBottomWidth: 1,
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginRight: 'auto',
    paddingHorizontal: 30,
  },
  suggestionsContainer: {
    maxHeight: 120,
    borderColor: '#ddd',
  
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 2,
  },
  suggestionItem: {
    padding: 5,
  },
  noSuggestions: {
    padding: 10,
    textAlign: 'left',
    color: '#999',
  },
  suggestionsList: {
    maxHeight: 150, // Limit height to prevent overflowing
  },

  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
});

export default ActivateStore;
