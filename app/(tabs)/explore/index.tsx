import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '@/components/SearchBar';
import {Link} from 'expo-router';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ListCategory from '@/components/categoryComponent/listCategory';
import {typeCategory} from '@/models/category.model';
import {getCategoryTree} from '@/hooks/api/useCategory';
import {typeProduct} from '@/models/product.model';
import ListProduct from '@/components/productComponent/listProduct';
import ProductsRecommend from '@/components/productsRecommend';
import BtnGoToWishList from '@/components/BtnGoToWishList';
import {RootState} from '@/redux/rootReducer';
import {useSelector} from 'react-redux';
const Explore = () => {
  const [category, setCategory] = useState<typeCategory[]>([]);
  const quantumNotification = useSelector(
    (state: RootState) => state.notification.notifications,
  );
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    const data = await getCategoryTree();
    if (data) {
      setCategory(data);
    } else {
      console.log('No data found');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const [productsRecommend, setProductsRecommend] = useState<typeProduct[]>([]);

  const handleTextSearchChange = (newProducts: typeProduct[]) => {
    setProductsRecommend(newProducts); // Update the state in parent component
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBar onTextSearchChange={handleTextSearchChange} />
        <BtnGoToWishList />
        <Link href={'/moreScreen/notification'} asChild>
          <TouchableOpacity style={styles.notificationIcon}>
            {quantumNotification.some(item => item.status === 'unread') ? (
              <MaterialCommunityIcons
                name="bell-badge-outline"
                size={wp(7)}
                color="#FF5733"
              />
            ) : (
              <MaterialCommunityIcons
                name="bell-outline"
                size={wp(7)}
                color="#9098B1"
              />
            )}
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#40BFFF']} // Màu của vòng loading khi kéo
            tintColor="#40BFFF" // Màu trên iOS
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.body}>
        {productsRecommend.length > 0 ? (
          <ProductsRecommend data={productsRecommend}></ProductsRecommend>
        ) : (
          <ListCategory data={category} />
        )}
        <View style={{height: hp(10)}}></View>
      </ScrollView>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(7),
    paddingHorizontal: wp(4),
    backgroundColor: '#F5F6FA',
  },
  notificationIcon: {
    padding: wp(1),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderBottomWidth: wp(0.1),
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    borderRadius: wp(2),
    paddingHorizontal: wp(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 2,
  },
  body: {
    paddingTop: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },

  // productBox: {
  //   padding: wp(2),
  //   marginBottom: wp(2),
  //   borderWidth: wp(0.1),
  //   borderColor: '#ccc',
  //   // borderRadius: 8,
  // },
  // productName: {
  //   fontSize: 16,
  //   color: '#333',
  // },
});
