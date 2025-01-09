import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AntDesign} from '@expo/vector-icons';

import Slider from '@/components/slider/Slider';
import ListProduct from '@/components/productComponent/listProduct';
import {Link} from 'expo-router';
import SearchBar from '@/components/SearchBar';
import {getToken} from '@/hooks/api/useToken';
import {useSelector} from 'react-redux';
import {getAllProduct, getAllProductAvailability} from '@/hooks/api/useProduct';
import {typeProduct} from '@/models/product.model';
import {getCategoryRoot} from '@/hooks/api/useCategory';
import {typeCategory} from '@/models/category.model';
import ProductsRecommend from '@/components/productsRecommend';
import Loading from '@/components/Loading';

const Home = () => {
  const [token, setToken] = useState<string | null>(null);
  const [dataProduct, setDataProduct] = useState<typeProduct[]>([]);
  const [dataCategory, setDataCategory] = useState<typeCategory[]>([]);
  const renderItem = ({item}: {item: typeProduct}) => (
    <TouchableOpacity style={styles.productBox}>
      <Text style={styles.productName}>{item.name}</Text>
      {/* Add more product details here if needed */}
    </TouchableOpacity>
  );
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
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

    fetchData();
  }, []);

  const [productsRecommend, setProductsRecommend] = useState<typeProduct[]>([]);

  const handleTextSearchChange = (newProducts: typeProduct[]) => {
    setProductsRecommend(newProducts); // Update the state in parent component
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading visible={isLoading} text="Loading..." />
      ) : (
        <>
          <View style={styles.header}>
            <SearchBar onTextSearchChange={handleTextSearchChange}></SearchBar>
            <TouchableOpacity>
              <Link href={'/moreScreen/favoriteProduct'} asChild>
                <TouchableOpacity>
                  <AntDesign
                    style={{}}
                    name="hearto"
                    size={wp(7)}
                    color="#9098B1"
                  />
                </TouchableOpacity>
              </Link>
            </TouchableOpacity>
            <Link href={'/moreScreen/notification'} asChild>
              <TouchableOpacity>
                <AntDesign
                  style={{}}
                  name="bells"
                  size={wp(7)}
                  color="#9098B1"
                />
              </TouchableOpacity>
            </Link>
          </View>
          {productsRecommend.length > 0 && (
            <ProductsRecommend
              data={productsRecommend}
              index={5}></ProductsRecommend>
          )}
          <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
            <Slider></Slider>
            <View style={styles.other}>
              <Text style={styles.otherTitle1}>Category</Text>
              <Link href={'/(tabs)/explore'} asChild>
                <TouchableOpacity>
                  <Text style={styles.otherTitle2}>More Category</Text>
                </TouchableOpacity>
              </Link>
            </View>
            <View>
              <FlatList
                data={dataCategory}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity style={styles.categoryItem}>
                      <View style={styles.itemIcon}>
                        <AntDesign name="info" size={wp(10)} color="#40BFFF" />
                      </View>
                      <Text style={{color: '#9098B1', marginTop: hp(2)}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{marginTop: hp(2.5)}}
                nestedScrollEnabled={true} // Thêm dòng này
              ></FlatList>
            </View>

            <View style={styles.other}>
              <Text style={styles.otherTitle1}>Flash Sale</Text>
              <Text style={styles.otherTitle2}>See More</Text>
            </View>
            <View>
              <ListProduct data={dataProduct}></ListProduct>
            </View>
            <View style={styles.other}>
              <Text style={styles.otherTitle1}>Mega Sale</Text>
              <Text style={styles.otherTitle2}>See More</Text>
            </View>
            <View>
              <ListProduct
                data={dataProduct}
                // horizontal={false}
                // numColumns={2}
              ></ListProduct>
            </View>
            <View style={{marginTop: hp(3)}}>
              <ListProduct
                data={dataProduct}
                horizontal={false}
                numColumns={2}></ListProduct>
            </View>
            <View style={{height: hp(10)}}></View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(6),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(8),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
  },
  searchBar: {
    paddingVertical: hp(1),
    paddingLeft: wp(2),
    flexDirection: 'row',
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    flex: 0.9,
    borderRadius: wp(1),
  },
  body: {
    marginTop: hp(2),
  },
  other: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(3),
  },
  otherTitle1: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  otherTitle2: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#40BFFF',
  },
  categoryItem: {
    marginRight: wp(5),
    alignItems: 'center',
  },
  itemIcon: {
    borderWidth: wp(0.1),
    height: wp(20),
    width: wp(20),
    borderRadius: wp(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#9098B1',
  },
  productBox: {
    padding: wp(2),
    marginBottom: wp(2),
    borderWidth: wp(0.1),
    borderColor: '#ccc',
    // borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    color: '#333',
  },
});
