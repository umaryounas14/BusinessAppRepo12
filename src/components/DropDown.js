import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const { width } = Dimensions.get('window');

// Default data and placeholder
const defaultData = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const DropdownInput = ({ data = defaultData, placeholder = "Select an item", onSelect,selectedItem }) => {
  // const [value, setValue] = useState(null);
  const [value, setValue] = useState(selectedItem);
  // Handle selection change
  // const handleChange = (item) => {
  //   setValue(item.value);
  //   if (onSelect) {
  //     onSelect(item);
  //   }
  // };
  const handleChange = (item) => {
    setValue(item.value);  // Set the local state to show the selected value in the dropdown
    if (onSelect) {
      onSelect(item);  // Pass selected item back to parent component
    }
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle} // Style the items in the list
      iconStyle={styles.iconStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Search..."
      value={value || selectedItem}
      onChange={handleChange}
    />
  );
};

export default DropdownInput;

const styles = StyleSheet.create({
  dropdown: {
    width: width * 0.9, // Adjust the percentage as needed
    margin: 5,
    height: 45,
    marginRight: 25,
    borderRadius: 15,
    padding: 10,
    borderWidth: 1, // Add border width
    borderColor: '#ddd', // Add border color 
  },
  item: {
    padding: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
   
  
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: 'black',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
    borderRadius: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: {
    color: 'black', // Text color for items in the dropdown
    fontSize: 15,
  },
});
