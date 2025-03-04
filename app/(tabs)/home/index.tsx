import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Link} from 'expo-router';
import {useSelector} from 'react-redux';

import Slider from '@/components/slider/Slider';
import ListProduct from '@/components/productComponent/listProduct';
import SearchBar from '@/components/SearchBar';
import {getToken} from '@/hooks/api/useToken';
import {getAllProductAvailability} from '@/hooks/api/useProduct';
import {typeProduct} from '@/models/product.model';
import {getCategoryRoot} from '@/hooks/api/useCategory';
import {typeCategory} from '@/models/category.model';
import ProductsRecommend from '@/components/productsRecommend';
import Loading from '@/components/Loading';
import BtnGoToWishList from '@/components/BtnGoToWishList';
import {RootState} from '@/redux/rootReducer';

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [dataProduct, setDataProduct] = useState<typeProduct[]>([]);
  const [dataCategory, setDataCategory] = useState<typeCategory[]>([]);
  const quantumNotification = useSelector(
    (state: RootState) => state.notification.notifications,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State cho pull-to-refresh
  const [productsRecommend, setProductsRecommend] = useState<typeProduct[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [token, products, categories] = await Promise.all([
        getToken(),
        getAllProductAvailability(),
        getCategoryRoot(),
      ]);
      if (token) setToken(token);
      if (products) setDataProduct(products);
      if (categories) setDataCategory(categories);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Hàm xử lý pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const handleTextSearchChange = (newProducts: typeProduct[]) => {
    setProductsRecommend(newProducts);
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
      {productsRecommend.length > 0 && (
        <ProductsRecommend data={productsRecommend} index={5} />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.body}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#40BFFF']} // Màu của vòng loading khi kéo
            tintColor="#40BFFF" // Màu trên iOS
          />
        }>
        <Slider />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Link href={'/(tabs)/explore'} asChild>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>More Category</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <FlatList
          data={dataCategory}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <AntDesign name="appstore-o" size={wp(8)} color="#40BFFF" />
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryList}
          nestedScrollEnabled={true}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flash Sale</Text>
          <Text style={styles.sectionLink}>See More</Text>
        </View>
        <ListProduct data={dataProduct} />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mega Sale</Text>
          <Text style={styles.sectionLink}>See More</Text>
        </View>
        <ListProduct data={dataProduct} />
        <ListProduct data={dataProduct} horizontal={false} numColumns={2} />
        <View style={styles.footerSpacer} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(7),
    paddingHorizontal: wp(4),
    backgroundColor: '#F5F6FA',
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
  notificationIcon: {
    padding: wp(1),
  },
  body: {
    paddingTop: hp(2),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(3),
    paddingHorizontal: wp(1),
  },
  sectionTitle: {
    fontSize: wp(5.5),
    fontWeight: '700',
    color: '#223263',
  },
  sectionLink: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#40BFFF',
  },
  categoryList: {
    marginTop: hp(2),
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: wp(4),
  },
  categoryIcon: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: wp(0.2),
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.1)},
    shadowOpacity: 0.1,
    shadowRadius: wp(0.5),
    elevation: 1,
  },
  categoryName: {
    fontSize: wp(3.5),
    color: '#666666',
    marginTop: hp(1),
    textAlign: 'center',
  },
  gridProduct: {
    marginTop: hp(3),
  },
  footerSpacer: {
    height: hp(10),
  },
});
