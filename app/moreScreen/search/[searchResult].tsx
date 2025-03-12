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
        <View style={styles.headerLeft}>
          <Link href={'/(tabs)/explore'} asChild>
            <TouchableOpacity>
              <AntDesign name="left" size={wp(6)} color="#666666" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.title}>
            {searchValue || (categoryValue && categoryTitle) || 'Search'}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Link
            href={{
              pathname: '/moreScreen/sort/[sort]',
              params: {
                sort: encodeURIComponent(JSON.stringify(products)),
                title: searchValue || (categoryValue && categoryTitle) || '',
              },
            }}
            asChild>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesome6
                name="arrow-down-wide-short"
                size={wp(6)}
                color="#666666"
              />
            </TouchableOpacity>
          </Link>
          <BtnFilter />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.body}>
        {isLoading ? (
          <Loading visible={isLoading} text="Loading..." />
        ) : (
          <>
            {quantity > 0 && (
              <View style={styles.resultHeader}>
                <Text style={styles.resultCount}>{quantity} Results</Text>
                {categoryTitle && (
                  <Link href="/moreScreen/category" asChild>
                    <TouchableOpacity style={styles.categoryLink}>
                      <Text style={styles.categoryText}>{categoryTitle}</Text>
                      <AntDesign name="down" size={wp(4)} color="#223263" />
                    </TouchableOpacity>
                  </Link>
                )}
              </View>
            )}

            {products.length > 0 ? (
              <ListProduct data={products} horizontal={false} numColumns={2} />
            ) : (
              <View style={styles.noResults}>
                <View style={styles.noResultsIcon}>
                  <Feather name="x" size={wp(8)} color="white" />
                </View>
                <Text style={styles.noResultsText}>Product Not Found</Text>
                <Link href={'/(tabs)/home'} asChild>
                  <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back to Home</Text>
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
    paddingHorizontal: wp(4),
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 2,
    marginBottom: hp(1),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.9,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5.5),
    fontWeight: '600',
    color: '#223263',
    marginLeft: wp(3),
  },
  iconButton: {
    padding: wp(2),
  },
  body: {
    flex: 1,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    backgroundColor: '#FFFFFF',
    borderRadius: wp(2),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.1)},
    shadowOpacity: 0.05,
    shadowRadius: wp(0.5),
    elevation: 1,
  },
  resultCount: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#666666',
  },
  categoryLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#223263',
  },
  noResults: {
    alignItems: 'center',
    marginTop: hp(15),
  },
  noResultsIcon: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(7.5),
    backgroundColor: '#40BFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  noResultsText: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#223263',
    marginBottom: hp(3),
  },
  backButton: {
    backgroundColor: '#40BFFF',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 2,
  },
  backButtonText: {
    fontSize: wp(4.5),
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
