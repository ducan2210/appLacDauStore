import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ListProduct from '@/components/productComponent/listProduct';
import BtnBackScreen from '@/components/BtnBackScreen';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
const FavoriteProduct = () => {
  const router = useRouter();
  const wishList = useSelector((state: RootState) => state.wishList.wishList);
  useEffect(() => {
    console.log(wishList);
  }, [wishList]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen></BtnBackScreen>
          <Text style={styles.title}>Favorite Product</Text>
        </View>
      </View>

      <ScrollView style={styles.body}>
        {/* <ListProduct
          data={ProductData}
          horizontal={false}
          numColumns={2}></ListProduct> */}
      </ScrollView>
    </View>
  );
};

export default FavoriteProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
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
});
