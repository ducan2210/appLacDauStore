import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {router, useLocalSearchParams, useRouter} from 'expo-router';
import {typeProduct} from '@/models/product.model';
const Sort = () => {
  const {sort, title} = useLocalSearchParams();
  const [products, setProducts] = useState<typeProduct[]>([]);

  useEffect(() => {
    try {
      const decodedSort = sort ? decodeURIComponent(sort as string) : '[]';
      const dataArray = JSON.parse(decodedSort);
      setProducts(dataArray);
    } catch (error) {
      console.error('Error parsing sort parameter:', error);
    }
  }, [sort]);

  const handleSort = (type: number) => {
    let sortedProducts = [...products]; // Tạo một bản sao của mảng products

    switch (type) {
      case 1:
        break;
      case 2:
        sortedProducts.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );
        break;
      case 3:
        sortedProducts.sort(
          (a, b) =>
            new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime(),
        );
        break;
      case 4:
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 5:
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 6:
        // sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    router.push({
      pathname: '/moreScreen/search/[searchResult]',
      params: {
        searchResult: title as string,
        sortedProducts: encodeURIComponent(JSON.stringify(sortedProducts)),
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen></BtnBackScreen>
          <Text style={styles.title}>Short By</Text>
        </View>
      </View>

      <ScrollView style={styles.body}>
        <TouchableOpacity style={styles.item} onPress={() => handleSort(1)}>
          <Text style={[styles.title, {color: '#000'}, {fontSize: wp(4)}]}>
            Best Match
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handleSort(2)}>
          <Text style={[styles.title, {color: '#000'}, {fontSize: wp(4)}]}>
            Time: ending soonest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handleSort(3)}>
          <Text style={[styles.title, {color: '#000'}, {fontSize: wp(4)}]}>
            Time: newly listed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handleSort(4)}>
          <Text style={[styles.title, {color: '#000'}, {fontSize: wp(4)}]}>
            Price: lowest first
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handleSort(5)}>
          <Text style={[styles.title, {color: '#000'}, {fontSize: wp(4)}]}>
            Price: highest first
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => handleSort(6)}>
          <Text style={[styles.title, {color: '#000'}, {fontSize: wp(4)}]}>
            Distance: nearest first
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Sort;

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
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {},
  item: {
    flexDirection: 'row',
    marginBottom: hp(4),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
