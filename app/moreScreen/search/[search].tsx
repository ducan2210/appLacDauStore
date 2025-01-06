import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {typeProduct} from '@/models/product.model';
import {Link, useLocalSearchParams} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import SearchBar from '@/components/SearchBar';
import BtnBackScreen from '@/components/BtnBackScreen';
import {getProductByCategoryId, getSearchProduct} from '@/hooks/api/useProduct';
import ListProduct from '@/components/productComponent/listProduct';
const Search = () => {
  const {search, category} = useLocalSearchParams();
  const searchValue = search as string;
  const categoryValue = category ? Number(category) : undefined;
  const [products, setProducts] = useState<typeProduct[]>([]);
  let product: typeProduct[];
  useEffect(() => {
    const fetchProducts = async () => {
      if (searchValue.trim() == '') {
        setProducts([]);
        return;
      }
      try {
        if (categoryValue) {
          product = await getProductByCategoryId(categoryValue);
        } else {
          product = await getSearchProduct(searchValue);
        }

        if (product) {
          setProducts(product);
        } else {
          setProducts([]);
          console.log('No products found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [searchValue, categoryValue]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 0.9, flexDirection: 'row'}}>
          <BtnBackScreen></BtnBackScreen>
          <Text style={styles.title}>
            {searchValue ? searchValue : categoryValue}
          </Text>
        </View>
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
        {products && (
          <ListProduct
            data={products}
            horizontal={false}
            numColumns={2}></ListProduct>
        )}
      </ScrollView>
    </View>
  );
};

export default Search;

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
    marginLeft: wp(3),
  },
});
