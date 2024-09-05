///////////////////////////////////////
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProductSelectedList = ({ route,navigation }) => {
  const { selectedProducts: initialSelectedProducts } = route.params;
  const [selectedProducts, setSelectedProducts] = useState(initialSelectedProducts);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  useEffect(() => {
    // Recalculate total price when selectedItems changes
    const newTotalPrice = selectedItems.reduce((total, item) => 
      total + parseFloat(item.product.price.replace(/[^0-9.-]+/g, "")) * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  const handleSelectItem = (item) => {
    const isSelected = selectedItems.find(i => i.product.id === item.product.id);
    if (isSelected) {
      const updatedItems = selectedItems.filter(i => i.product.id !== item.product.id);
      setSelectedItems(updatedItems);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const showDeleteConfirmation = (item) => {
    setItemToDelete(item);
    setIsModalVisible(true);
  };

  const handleDeleteItem = () => {
    if (itemToDelete) {
      const updatedProducts = selectedProducts.filter(i => i.product.id !== itemToDelete.product.id);
      setSelectedProducts(updatedProducts);
      setSelectedItems(selectedItems.filter(i => i.product.id !== itemToDelete.product.id));
      setIsModalVisible(false);
      setItemToDelete(null);
    }
  };
  const renderProduct = ({ item }) => {
    const isSelected = !!selectedItems.find(i => i.product.id === item.product.id);
    return (
      <View style={styles.productContainer}>
        <TouchableOpacity onPress={() => handleSelectItem(item)} style={styles.customCheckbox}>
          {isSelected && <View style={styles.selectedCheckbox} />}
        </TouchableOpacity>
        <Image source={item.product.image} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.productPrice}>{item.product.price}</Text>
        </View>
        <TouchableOpacity onPress={() => showDeleteConfirmation(item)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>  navigation.goBack()}>
      <AntDesign name="arrowleft" size={19} color="black" />
      </TouchableOpacity>
      <Text style={styles.MyCartStyle}>My Cart</Text>
      {selectedProducts && selectedProducts.length > 0 ? (
        <FlatList
          data={selectedProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.product.id}
        />
      ) : (
        <Text style={styles.textStyle}>No Item Selected</Text>
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Subtotal: <Text style={styles.priceStyle}>${totalPrice.toFixed(2)}</Text></Text>
        <TouchableOpacity
          style={[styles.BtnView, { backgroundColor: selectedItems.length > 0 ? 'green' : 'gray' }]}
          disabled={selectedItems.length === 0}
          onPress={() => navigation.navigate('ProductDetails',{product:selectedProducts})}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Delete Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete this item permanently?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButton} onPress={handleDeleteItem}>
                <Text style={styles.modalButtonText}>Delete</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  MyCartStyle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'black',
    paddingVertical: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  customCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  selectedCheckbox: {
    width: 16,
    height: 16,
    backgroundColor: 'green',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 20,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productQuantity: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  productPrice: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  textStyle: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 230,
  },
  BtnView: {
    borderRadius:10,
     paddingVertical: 15,
    // paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 1,
    width:'40%',
  },
  continueText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 17,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    position:'relative',
    bottom:0,
    padding:5
    
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal:20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  priceStyle:{
    color:'black',
    fontWeight:'600'
  }
});

export default ProductSelectedList;



//////////////////////////////////////
