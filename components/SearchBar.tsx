import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AntDesign, Feather} from '@expo/vector-icons';
import {getSearchProduct} from '@/hooks/api/useProduct';
import {typeProduct} from '@/models/product.model';
import {router} from 'expo-router';

interface SearchBarProps {
  onTextSearchChange: (productsRecommend: typeProduct[]) => void;
}

const SearchBar = ({onTextSearchChange}: SearchBarProps) => {
  const [textSearch, setTextSearch] = useState<string>('');
  const [productsRecommend, setProductsRecommend] = useState<typeProduct[]>([]);
  const touchX = () => {
    setTextSearch('');
  };
  useEffect(() => {
    const fetchProductsRecommend = async () => {
      if (textSearch.trim() === '') {
        onTextSearchChange([]);
        setProductsRecommend([]);
        return;
      }
      try {
        const product = await getSearchProduct(textSearch);
        if (product) {
          setProductsRecommend(product);
          onTextSearchChange(product);
        } else {
          setProductsRecommend([]);
          console.log('No products found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductsRecommend([]);
      }
    };
    fetchProductsRecommend();
  }, [textSearch]);

  return (
    <View style={{flex: 0.9}}>
      <View style={styles.searchBar}>
        <AntDesign
          style={{marginRight: wp(2)}}
          name="search1"
          size={wp(3.5)}
          color="#40BFFF"
        />
        <TextInput
          style={{flex: 1}}
          value={textSearch}
          onChangeText={text => {
            setTextSearch(text);
          }}
          placeholder="Search Product"
          onSubmitEditing={() => {
            textSearch &&
              router.push({
                pathname: '/moreScreen/search/[searchResult]',
                params: {searchResult: textSearch}, // Pass any parameters if needed
              });
          }}
        />
        {textSearch.length > 0 && (
          <TouchableOpacity onPress={touchX}>
            <Feather name="x" size={wp(3.5)} color="#9098B1" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    padding: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    flex: 0.7,
    borderRadius: wp(1),
    alignItems: 'center',
  },
  productList: {
    marginTop: 10,
  },
  productBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productName: {
    fontSize: 16,
    color: '#333',
  },
});
