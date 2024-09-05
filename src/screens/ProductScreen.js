// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import Entypo from 'react-native-vector-icons/Entypo';
// const products = [
//   {
//     id: '1',
//     image:require('../assets/productone.png'),
//     name: 'DreamBerry Gummies - Calm Effects',
//     thcContent: '10mg THC each',
//     location: 'GreenLeaf Dispensary (Sponsored)',
//     price: '$20 for a pack of 10',
//     rating: 5,
//   },
//   {
//     id: '2',
//     image:require('../assets/producttwo.png'),
//     name: 'NightOwl Cookies - Relaxing Blend',
//     thcContent: '5mg THC each',
//     location: 'Herbal Vibes Shop',
//     price: '$15 for a pack of 6',
//     rating: 4.5,
//   },
//   {
//     id: '3',
//     image:require('../assets/productone.png'),
//     name: 'COOKING  NightOwl Cookies - Relaxing Blend',
//     thcContent: '5mg THC each',
//     location: 'Herbal Vibes Shop',
//     price: '$15 for a pack of 6',
//     rating: 4.5,
//   },
//   {
//     id: '4',
//     image:require('../assets/productone.png'),
//     name: 'MORING NightOwl Cookies - Relaxing Blend',
//     thcContent: '5mg THC each',
//     location: 'Herbal Vibes Shop',
//     price: '$15 for a pack of 6',
//     rating: 4.5,
//   },
//   {
//     id: '5',
//     image:require('../assets/productone.png'),
//     name: 'Sunshine NightOwl Cookies - Relaxing Blend',
//     thcContent: '5mg THC each',
//     location: 'Herbal Vibes Shop',
//     price: '$15 for a pack of 6',
//     rating: 4.5,
//   },
// ];

// const Rating = ({ rating }) => {
//   const fullStars = Math.floor(rating);
//   const halfStars = rating % 1 !== 0 ? 1 : 0;
//   const emptyStars = 5 - fullStars - halfStars;

//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {[...Array(fullStars)].map((_, index) => (
//         <Icon key={`full-${index}`} name="star" size={20} color="#FFD700" />
//       ))}
//       {[...Array(halfStars)].map((_, index) => (
//         <Icon key={`half-${index}`} name="star-half" size={20} color="#FFD700" />
//       ))}
//       {[...Array(emptyStars)].map((_, index) => (
//         <Icon key={`empty-${index}`} name="star-border" size={20} color="#FFD700" />
//       ))}
//     </View>
//   );
// };
// const directionFunc = () => {
//   console.log('directionFunc');
// };
// const ProductCard = ({ product, onAddToCart }) => {
//   return (
//     <View style={styles.card}>
//       <Image source={product.image} style={styles.productImage} />
//       <Text style={styles.productName}>{product.name}</Text>
//       <Text style={styles.thcContent}>{product.thcContent}</Text>
//       <Text style={styles.location}>Location: {product.location}</Text>
//       <Text style={styles.price}>Price: {product.price}</Text>
//       <Rating rating={product.rating} />
//       <View style={styles.actions}>
//         <TouchableOpacity style={styles.actionButton} onPress={directionFunc}>
//           <Icon name="place" size={20} color="#FF6347" />
//           <Text style={styles.actionText}>Directions</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.actionButton} onPress={() => onAddToCart(product)}>
//           <Icon name="shopping-cart" size={20} color="#000" />
//           <Text style={styles.actionText}>Add to Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const ProductListScreen = ({ navigation }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [productQuantity, setProductQuantity] = useState(1);

//   const handleAddToCart = (product) => {
//     const existingItem = cartItems.find(item => item.product.id === product.id);
//     if (existingItem) {
//       setProductQuantity(existingItem.quantity);
//     } else {
//       setProductQuantity(1); // Reset to 1 if it's a new product
//     }
//     setSelectedProduct(product);
//     setIsModalVisible(true);
//   };
//   const handleConfirmAddToCart = () => {
//     const existingProductIndex = cartItems.findIndex(item => item.product.id === selectedProduct.id);
//     if (existingProductIndex >= 0) {
//       const updatedItems = [...cartItems];
//       updatedItems[existingProductIndex].quantity = productQuantity;
//       setCartItems(updatedItems);
//     } else {
//       setCartItems([...cartItems, { product: selectedProduct, quantity: productQuantity }]);
//     }
    
//     setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, productQuantity));
//     setIsModalVisible(false);
//   };
//   const handleSelectedList = () => {
//     console.log('selectedProductworking', selectedProduct);
//     navigation.navigate('ProductSelectedList', { selectedProducts: cartItems });
//   };

//   const incrementQuantity = () => setProductQuantity(productQuantity + 1);
//   const decrementQuantity = () => {
//     if (productQuantity > 1) setProductQuantity(productQuantity - 1);
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.header}>Mary J Finder</Text>
//         <TouchableOpacity style={styles.basketContainer} onPress={handleSelectedList}>
//           <SimpleLineIcons name="basket" size={30} color="#000" />
//           <View style={styles.basketCountContainer}>
//             <Text style={styles.basketCountText}>{cartCount}</Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={products}
//         renderItem={({ item }) => <ProductCard product={item} onAddToCart={handleAddToCart} />}
//         keyExtractor={(item) => item.id}
//       />
//       <Modal
//         visible={isModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setIsModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContainer}>
//             <View style={styles.headerView}>
//               <Text style={styles.header}>Confirm Product</Text>
//               <TouchableOpacity onPress={() => setIsModalVisible(false)}>
//                 <Entypo name="cross" size={30} color="#000" />
//               </TouchableOpacity>
//             </View>
//             {selectedProduct && (
//               <>
//                 <View style={{ flexDirection: 'row' }}>
//                   <View>
//                     <Image source={selectedProduct.image} style={{ width: '100%', height: 150, backgroundColor: 'green' }} />
//                     <Rating rating={selectedProduct?.rating} />
//                   </View>
//                   <View style={{ paddingHorizontal: 5, left: 20 }}>
//                     <Text style={{ fontSize: 12, color: "black", fontWeight: '700' }}>{selectedProduct?.name}</Text>
//                     <Text style={{ fontSize: 12, color: "gray", fontWeight: '400', marginTop: 5 }}>{selectedProduct?.thcContent}</Text>
//                     <Text style={{ fontSize: 12, color: "black", fontWeight: '400', marginTop: 5 }}>Location: {selectedProduct?.location}</Text>
//                     <Text style={[styles.price, { fontSize: 12, color: "black", fontWeight: '400', marginTop: 5 }]}>Price: {selectedProduct?.price}</Text>
//                     <View style={styles.quantityContainer}>
//                       <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
//                         <Text style={styles.quantityText}>-</Text>
//                       </TouchableOpacity>
//                       <Text style={styles.quantityText}>{productQuantity}</Text>
//                       <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
//                         <Text style={styles.quantityText}>+</Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 </View>
//                 <View style={styles.ModalView}>
//                   <TouchableOpacity style={styles.ModalButton} onPress={handleConfirmAddToCart}>
//                     <Text style={styles.buttonText}>Confirm</Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header:{
// fontSize:17,
// color:'black',
// fontWeight:'600'
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   basketContainer: {
//     position: 'relative',
//   },
//   basketCountContainer: {
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     backgroundColor: 'red',
//     borderRadius: 10,
//     padding: 3,
//     paddingHorizontal: 7,
//   },
//   basketCountText: {
//     color: 'white',
//     fontSize: 12,
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: '50%',
//   },
//   headerView: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   card: {
//     padding: 16,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   productImage: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   thcContent: {
//     fontSize: 14,
//     color: 'gray',
//     marginBottom: 8,
//   },
//   location: {
//     fontSize: 14,
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionText: {
//     marginLeft: 5,
//     fontSize: 16,
//     color: '#000',
//   },
//   ModalView: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   ModalButton: {
//     backgroundColor: '#FF6347',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   quantityButton: {
//     width: 30,
//     height: 30,
//     backgroundColor: '#ddd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginHorizontal: 10,
//   },
//   quantityText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProductListScreen;




/////////////////////////////////////////////

import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard'; // Ensure the path is correct
const products = [
  {
    id: '1',
    name: 'Product One',
    price: '29.99',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/201',
      'https://via.placeholder.com/202',
    ],
    description: 'This is a description of Product One.',
    reviews: [
      { rating: 4, comment: 'Great product!' },
      { rating: 5, comment: 'Exceeded expectations.' },
    ],
  },
  {
    id: '2',
    name: 'Product two',
    price: '29.99',
    images: [
      'https://via.placeholder.com/200',
      'https://via.placeholder.com/201',
      'https://via.placeholder.com/202',
    ],
    description: 'This is a description of Product One.',
    reviews: [
      { rating: 4, comment: 'Great product!' },
      { rating: 5, comment: 'Exceeded expectations.' },
    ],
  },
  // Add more products as needed
];
const ProductScreen = ({ navigation }) => {
  const handlePress = (product) => {
    // Navigate to the ProductDetails screen, passing the product as a parameter
    navigation.navigate('ProductDetails', { product });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handlePress} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
});
export default ProductScreen;
