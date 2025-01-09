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
import {AntDesign, Feather, FontAwesome6} from '@expo/vector-icons';

import BtnBackScreen from '@/components/BtnBackScreen';
import {getProductByCategoryId, getSearchProduct} from '@/hooks/api/useProduct';
import ListProduct from '@/components/productComponent/listProduct';

import BtnFilter from '@/components/BtnFilter';
import Loading from '@/components/Loading';
const Search = () => {
  const {searchResult, category, categoryName, sortedProducts} =
    useLocalSearchParams();
  const searchValue = searchResult as string;
  const [categoryTitle, setCategoryTitle] = useState<string>(
    categoryName as string,
  );
  const categoryValue = category ? Number(category) : undefined;
  const [products, setProducts] = useState<typeProduct[]>([]);
  const decodedSort = sortedProducts
    ? decodeURIComponent(sortedProducts as string)
    : '[]';
  const [quantity, setQuantity] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (searchValue.trim() === '') {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      try {
        let product: typeProduct[] = [];
        if (sortedProducts) {
          setCategoryTitle(searchValue);
          product = JSON.parse(decodedSort);
          setQuantity(product.length);
        } else if (categoryValue) {
          product = await getProductByCategoryId(categoryValue);
          setQuantity(product.length);
        } else {
          product = await getSearchProduct(searchValue);
          setQuantity(product.length);
        }
        setProducts(product);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [searchValue, categoryValue, sortedProducts]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 0.9, flexDirection: 'row'}}>
          <Link href={'/(tabs)/explore'} asChild>
            <TouchableOpacity>
              <AntDesign name="left" size={wp(6)} color="#9098B1" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>
            {searchValue ? searchValue : categoryValue}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Link
            href={{
              pathname: '/moreScreen/sort/[sort]',
              params: {
                sort: encodeURIComponent(JSON.stringify(products)),
                title: searchValue ? searchValue : categoryValue,
              },
            }}
            asChild>
            <TouchableOpacity>
              <FontAwesome6
                name="arrow-down-wide-short"
                size={wp(6)}
                color="#9098B1"
              />
            </TouchableOpacity>
          </Link>
          <BtnFilter></BtnFilter>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {isLoading ? (
          <Loading visible={isLoading} text="Loading..." />
        ) : (
          <>
            {quantity > 0 && (
              <View
                style={{
                  marginBottom: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: wp(4),
                    fontWeight: 'bold',
                    color: '#9098B1',
                  }}>
                  {quantity.toString()} Result
                </Text>
                {categoryTitle && (
                  <Link href="/moreScreen/category" asChild>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          fontSize: wp(4),
                          fontWeight: 'bold',
                        }}>
                        {categoryTitle}
                      </Text>
                      <AntDesign
                        style={{marginLeft: wp(2)}}
                        name="down"
                        size={wp(4)}
                        color="black"
                      />
                    </TouchableOpacity>
                  </Link>
                )}
              </View>
            )}

            {products.length > 0 ? (
              <View>
                <ListProduct
                  data={products}
                  horizontal={false}
                  numColumns={2}></ListProduct>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: wp(100),
                    height: hp(7),
                    width: hp(7),
                    backgroundColor: '#40BFFF',
                    marginTop: hp(20),
                    marginBottom: hp(2),
                  }}>
                  <Feather name="x" size={wp(8)} color="white" />
                </View>
                <Text style={{fontSize: wp(7), fontWeight: 'bold'}}>
                  Product Not Found
                </Text>
                <Link href={'/(tabs)/home'} asChild>
                  <TouchableOpacity
                    style={{
                      marginTop: hp(2),
                      backgroundColor: '#40BFFF',
                      height: hp(8),
                      width: wp(94),
                      marginBottom: hp(7),
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: wp(2),
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: wp(4),
                        color: 'white',
                      }}>
                      Back to Home
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            )}
          </>
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
