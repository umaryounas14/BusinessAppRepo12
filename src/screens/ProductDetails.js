// import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
// import React from 'react'

// const ProductDetails = ({route}) => {
//   const { product } = route.params;
//   // console.log('product',product)
//   return (
    
  
    
//     <View>
    
//       <Text style={styles.productName}>{product.name}</Text>

//       <FlatList
//         horizontal
//         data={product.images}
//         renderItem={({ item }) => (
//           <Image source={{ uri: item }} style={styles.productImage} />

          
//         )}
//         keyExtractor={(item, index) => index.toString()}
//         style={styles.imageList}
//       />
//             <Text style={styles.productDescription}>{product.description}</Text>
//             <Text style={styles.productPrice}>${product.price}</Text>
    
//             {product.reviews && product.reviews.length > 0 ? (
//         product.reviews.map((review, index) => (
//           <View key={index} style={styles.reviewContainer}>
//             <Text style={styles.reviewRating}>Rating: {review.rating} / 5</Text>
//             <Text style={styles.reviewComment}>{review.comment}</Text>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noReviewsText}>No reviews available</Text>
//       )}
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#ffffff',
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#333',
//   },
//   productDescription: {
//     fontSize: 16,
//     marginBottom: 16,
//     color: '#666',
//   },
//   imageList: {
//     marginBottom: 16,
//   },
//   productImage: {
//     width: 200,
//     height: 200,
//     marginRight: 8,
//     borderRadius: 8,
//   },
//   productPrice: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     color: '#000',
//   },
//   reviewsTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   reviewContainer: {
//     marginBottom: 12,
//     padding: 8,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//   },
//   reviewRating: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#555',
//   },
//   reviewComment: {
//     fontSize: 16,
//     color: '#777',
//   },
//   noReviewsText: {
//     fontSize: 16,
//     color: '#999',
//   },
// });
// export default ProductDetails
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const ProductDetailScreen = ({ route,navigation }) => {
  const { product } = route.params;

  return (
    <>

    <ScrollView style={styles.container}>
    <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={styles.backButton}>
          <Icon name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
      <Text style={styles.productName}>{product.name}</Text>
      <FlatList
        horizontal
        data={product.images}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.productImage} />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.imageList}
      />
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.reviewsTitle}>Reviews:</Text>
      {product.reviews.map((review, index) => (
        <View key={index} style={styles.reviewContainer}>
          <Text style={styles.reviewRating}>Rating: {review.rating}/5</Text>
          <Text style={styles.reviewComment}>{review.comment}</Text>
        </View>
      ))}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#ffffff',
  },
  backButton: {
    // position: 'absolute',
    top: Platform.OS === 'ios' ? HeaderHeight + 5 : 5,
     right: 10,
    zIndex: 1,
    padding: 10,
  },
  productName: {
    marginTop:15,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  imageList: {
    marginBottom: 16,
  },
  productImage: {
    width: 200,
    height: 200,
    marginRight: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
     color:'black'
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
         color:'black'
  },
  reviewContainer: {
    marginBottom: 8,
  },
  reviewRating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 16,
  },
});

export default ProductDetailScreen;
