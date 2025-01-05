import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import CategoryItem from './CategoryItem';
import {typeCategory} from '@/models/category.model';

type listCategoryType = {
  data: typeCategory[];
};
const ListCategory = ({data}: listCategoryType) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={data}
        renderItem={({item}) => {
          return <CategoryItem item={item}></CategoryItem>;
        }}></FlatList>
    </View>
  );
};

export default ListCategory;

const styles = StyleSheet.create({});
