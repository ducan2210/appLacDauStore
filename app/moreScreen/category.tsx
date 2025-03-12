import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BtnBackScreen from '@/components/BtnBackScreen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getCategoryRoot, getCategoryTree} from '@/hooks/api/useCategory';
import {typeCategory} from '@/models/category.model';
import ListCategory from '@/components/categoryComponent/listCategory';
const ShortBy = () => {
  const [dataCategory, setDataCategory] = useState<typeCategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const categories = await getCategoryTree();
        if (categories) setDataCategory(categories);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <BtnBackScreen></BtnBackScreen>
          <Text style={styles.title}>Category</Text>
        </View>
      </View>

      <ScrollView style={styles.body}>
        <ListCategory data={dataCategory} />
      </ScrollView>
    </View>
  );
};

export default ShortBy;

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
    paddingBottom: hp(1),
    borderBottomWidth: wp(0.1),
    borderColor: '#9098B1',
    marginBottom: hp(1),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {},
});
