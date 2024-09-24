import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Row } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { getStores } from '../redux/slices/getStoresSlice'; // Adjust the import path
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const LoadMoreButton = memo(({ onPress }) => (
  <TouchableOpacity style={styles.loadMoreButton} onPress={onPress}>
    <Text style={styles.loadMoreButtonText}>Load More</Text>
  </TouchableOpacity>
));

const StoreTableView = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { data, totalPages, currentPage, status, error } = useSelector((state) => state.stores);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [isLoadingMore, setIsLoadingMore] = useState(false); // State to manage the loading state of "Load More"
  const [storeIdToDelete, setStoreIdToDelete] = useState(null); 
  const loading = status === 'loading' && !isLoadingMore; // Only show initial loader if not loading more
  const loadingMore = status === 'loading' && isLoadingMore; // Separate loading state for "Load More"
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (isFocused) {
      dispatch(getStores({ page: 1 }));
    }
  }, [dispatch, isFocused]);

  const handleLoadMore = () => {
    if (!loadingMore && currentPage < totalPages) {
      setIsLoadingMore(true); // Set loading state to true when loading more data
      dispatch(getStores({ page: currentPage + 1 })).finally(() => {
        setIsLoadingMore(false); // Reset loading state once loading is complete
      });
    }
  };

  const handleShowMore = () => {
    setItemsToShow(prev => prev + 5);
    if (itemsToShow >= data.length && currentPage < totalPages) {
      handleLoadMore();
    }
  };

  const handleActivate = (storeId) => {
    navigation.navigate('ActivateStore', { storeId });
  };
  const openDeleteModal = (storeId) => {
    setStoreIdToDelete(storeId);
    setModalVisible(true);
  };
  
  const cancelDelete = () => {
    setModalVisible(false);
    setStoreIdToDelete(null);
  };


  const handleDelete = async (storeId) => {
    setIsDeleting(true);
    console.log('Deleting store with ID:', storeId);
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      console.log('accessToken1111111:', accessToken);
  
      if (!accessToken) {
        console.error('No access token found');
        return;
      }
  
      const response = await axios.post('https://maryjfinder.com/api/stores/delete', { id: storeId },
        
          {
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`, // Include the auth token in headers
           }, 
        }
      );
      console.log('response from hsndle delete Store Table',response?.data?.id)
      if (response.status === 200) {
        console.log('Store deleted successfully:', storeId);
        // Refetch the stores after successful deletion
        dispatch(getStores({ page: 1, limit: 10 }));
      } else {
        console.error('Failed to delete store:', response);
      }
    } catch (error) {
      console.error('Error deleting store:', error);
    }
    finally {
      setIsDeleting(false);
     } // Stop loading
  };
  if (status === 'failed') {
    return <Text>Error: {error}</Text>;
  }

  const formattedStoreData = [
    ['Name', 'Email', 'Address', 'Type', 'Status', 'Action'],
    ...data.slice(0, itemsToShow).map(store => [
      store.title,
      'N/A',
      store.address,
      store.type,
      store.status_label,
      (
        <TouchableOpacity
          key={store.id} // Make sure each TouchableOpacity has a unique key
          style={styles.editButton}
          onPress={() => handleDelete(store.id)}
        >
          <Text style={styles.editButtonText}>Delete</Text>
        </TouchableOpacity>
      ),
      // store.status_label,
   
      // store.status === 'draft' ? (
      //   <TouchableOpacity
      //     style={styles.activateButton}
      //     onPress={() => handleActivate(store.id)}
      //   >
      //     <Text style={styles.activateButtonText}>Activate</Text>
      //   </TouchableOpacity>
      // ) : (
      //   <TouchableOpacity
      //   style={styles.editButton}
      //   onPress={() => confirmDelete(store.id)} // Directly delete without modal
      // >
      //   <Text style={styles.editButtonText}>Delete</Text>
      // </TouchableOpacity>
      // ),
    ]),
  ];

  return (
    <View style={styles.container}>
      {loading && !isLoadingMore && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        <Table>
          <FlatList
            data={formattedStoreData}
            renderItem={({ item, index }) => (
              <Row
                key={index}
                data={item}
                style={[
                  styles.row,
                  index === 0 ? styles.headerRow : (index % 2 === 0 ? styles.evenRow : styles.oddRow),
                ]}
                textStyle={
                  index === 0
                    ? { ...styles.text, ...styles.textBold }
                    : styles.text
                }
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </Table>
      </ScrollView>
      <LoadMoreButton onPress={handleShowMore} />
      {loadingMore && (
        <ActivityIndicator size="small" color="#0000ff" style={styles.loadMoreIndicator} />
      )}
      
      {isDeleting && (
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
    marginBottom: 100,
    marginHorizontal: 5,
  },
  row: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  headerRow: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: '100',
    fontSize: 13,
    width: 110,
    color: 'black',
  },
  textBold: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    width: 120,
    color: 'black',
  },
  loadMoreButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: -50
  },
  loadMoreButtonText: {
    color: 'white',
    fontSize: 16,
  },
  activateButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginRight: 15,
  },
  activateButtonText: {
    color: 'white',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginRight: 30,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  evenRow: {
    backgroundColor: '#f0f0f0',
  },
  oddRow: {
    backgroundColor: '#e8e8e8',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  loadMoreIndicator: {
    marginTop: 10,
    alignSelf: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: translucent background
  },
});

export default StoreTableView;
