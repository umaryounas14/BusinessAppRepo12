import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Block, Button, Input, theme} from 'galio-framework';
const {width, height} = Dimensions.get('window');
import Heatmap from '../components/Heatmap';
import TableView from '../components/TableView';
import PredictiveAnalysisGraph from '../components/PredictiveAnalysisGraph';
import MultiLineChart from '../components/MultiLineChart';
import {materialTheme} from '../constants';
import DatePickerModal from '../components/DatePickerModal'; 
import Entypo from 'react-native-vector-icons/Entypo';

const Intractions = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null); // For Start Date
  const [endDate, setEndDate] = useState(null); // For End Date
  const [currentDatePicker, setCurrentDatePicker] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [inputWidth, setInputWidth] = useState(width * 0.90);
  const handleDateConfirm = date => {
    if (currentDatePicker === 'start') {
      setSelectedDate(date); // Update the selected start date
    } else if (currentDatePicker === 'end') {
      setEndDate(date); // Update the selected end date
    }
    setDatePickerVisible(false);
    setCurrentDatePicker(null); // Reset the current date picker
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.announcementBanner}>
          <Text style={styles.announcementText}>Activate Your Store!</Text>
        </View>
        <TouchableOpacity onPress={openDrawer}>
         <Entypo name="menu" size={35} style={{color:'black',marginLeft: 10, marginTop: 10}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer1,
           
            {
              top: 62,
              right: 60,
            },
          ]}>
          <Icon name="bell" size={24} color="black" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.iconContainer,
            {
              top: 59,
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

        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" enabled>
            <View
              style={{
                paddingVertical: 30,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginRight: 180,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                  textDecorationLine: 'underline',
                  marginRight: 7,
                }}>
                All Stores
              </Text>
              <Icon name="arrow-down" size={13} color="black" />
            </View>
            <View>
          
            <TouchableOpacity
              onPress={() => {
                setCurrentDatePicker('start');
                setDatePickerVisible(true);
              }}
              style={[styles.dateContainer, { width: inputWidth }]}>
              <Icon
                name="calendar"
                size={20}
                color="#B4B4B4"
                style={styles.dateIcon}
              />
              <Text
                style={[
                  styles.dateText,
                  { color: selectedDate ? 'black' : 'lightgray' },
                ]}
              >
                {selectedDate ? selectedDate.toDateString() : 'Start Date'}
              </Text>
            </TouchableOpacity>

            <DatePickerModal
              visible={isDatePickerVisible && currentDatePicker === 'start'}
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisible(false)}
              date={selectedDate || new Date()} // Default to current date if not selected
              mode="date"
            />
            </View>
      

            <View style={{ marginTop: -5 }}>
              <TouchableOpacity
                onPress={() => {
                  setCurrentDatePicker('end');
                  setDatePickerVisible(true);
                }}
                style={[styles.dateContainer, { width: inputWidth }]}>
              
                <Icon
                  name="calendar"
                  size={20}
                  color="#B4B4B4"
                  style={styles.dateIcon}
                />
                <Text
                  style={[
                    styles.dateText,
                    { color: endDate ? 'black' : 'lightgray' },
                  ]}
                >
                  {endDate ? endDate.toDateString() : 'End Date'}
                </Text>
              </TouchableOpacity>

              <DatePickerModal
                visible={isDatePickerVisible && currentDatePicker === 'end'}
                onConfirm={handleDateConfirm}
                onCancel={() => setDatePickerVisible(false)}
                date={endDate || new Date()} // Default to current date if not selected
                mode="date"
              />
            </View>
            <View style={[styles.searchContainer, { width: inputWidth }]}>
              <TextInput
                value={searchInput}
                onChangeText={setSearchInput}
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor={"lightgray"}
              />
              <Icon
                name="search"
                size={20}
                color="#B4B4B4"
                style={styles.searchIcon}
              />
            </View>
            
          </KeyboardAvoidingView>
        </Block>
        <Block flex middle>
            <View style={{marginHorizontal: 20, paddingVertical: 20}}>
            <MultiLineChart/>
            </View>
        </Block>
        <Block flex middle>
            <View style={{marginLeft: 15, marginRight: 20, paddingVertical: 10}}>
            <Heatmap/>
            </View>
        </Block>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
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
    color: 'black',
  },
  iconContainer: {
    position: 'absolute',
  },
  iconContainer1: {
    position: 'absolute',
    zIndex: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 17,
    height: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  startDateContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 1,
    marginBottom: 30,
  },
  tableViewContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  tableViewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 20,
  },
  endDateContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    marginBottom: 10,
  },
  datePickerText: {
    color: '#B4B4B4',
    marginLeft: 25,
  },
  dateIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    marginTop: 5,
  }, 
  textInput: {
    paddingVertical:2,
    paddingHorizontal:28,
    color: 'black',
    backgroundColor: 'transparent',
    paddingHorizontal:10
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:20
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    fontSize: 15,
    color: 'black',
    fontWeight:'400'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 28,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    fontSize: 15,
    backgroundColor: 'transparent',
    borderRadius: 20,
    color: 'black',
    fontWeight:"400"
  },
  searchIcon: {
    marginLeft: 7,
    position:'absolute',
    marginTop:17,
    paddingHorizontal:3
  },
 
});

export default Intractions;
