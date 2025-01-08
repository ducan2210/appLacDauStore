import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchBar from '@/components/SearchBar';
import {Link} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ListCategory from '@/components/categoryComponent/ListCategory';
import {typeCategory} from '@/models/category.model';
import {getCategoryTree} from '@/hooks/api/useCategory';
import {typeProduct} from '@/models/product.model';
import ListProduct from '@/components/productComponent/listProduct';
import ProductsRecommend from '@/components/productsRecommend';
const Explore = () => {
  const [category, setCategory] = useState<typeCategory[]>([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryTree();
      if (data) {
        setCategory(data);
      } else {
        console.log('No data found');
      }
    };
    fetchCategory();
  }, []);
  const [productsRecommend, setProductsRecommend] = useState<typeProduct[]>([]);

  const handleTextSearchChange = (newProducts: typeProduct[]) => {
    setProductsRecommend(newProducts); // Update the state in parent component
  };

  return (
    <View style={styles.container}>
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
            <AntDesign style={{}} name="bells" size={wp(7)} color="#9098B1" />
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
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
    marginBottom: hp(2),
  },
  body: {},
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
