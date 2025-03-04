import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {typeCategory} from '@/models/category.model';
import {MaterialIcons} from '@expo/vector-icons';
import {router} from 'expo-router';

type Props = {
  item: typeCategory;
  index?: number;
};

const CategoryItem = ({item, index = 0}: Props) => {
  const [expanded, setExpanded] = useState(false); // Mặc định ẩn danh mục con

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  const handleCategory = (name: string, id: number, categoryName: string) => {
    router.push({
      pathname: '/moreScreen/search/[searchResult]',
      params: {searchResult: name, category: id, categoryName: categoryName},
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => handleCategory(item.name, item.category_id, item.name)}>
        <Text
          style={[
            styles.title,
            {
              color:
                index === 0 ? '#223263' : index === 1 ? '#666666' : '#9098B1',
              fontSize: index === 0 ? wp(5) : index === 1 ? wp(4.5) : wp(4),
            },
          ]}>
          {item.name}
        </Text>
        {item.children && item.children.length > 0 && (
          <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
            <MaterialIcons
              name={expanded ? 'expand-less' : 'expand-more'}
              size={wp(5)}
              color="#666666"
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {expanded && item.children && item.children.length > 0 && (
        <View style={styles.childrenContainer}>
          <FlatList
            data={item.children}
            keyExtractor={child => child.category_id.toString()}
            renderItem={({item: childItem}) => (
              <CategoryItem item={childItem} index={index + 1} />
            )}
            contentContainerStyle={styles.childrenList}
          />
        </View>
      )}
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1.5),
    borderBottomWidth: wp(0.1),
    borderBottomColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  title: {
    fontWeight: '600',
    marginRight: wp(2),
  },
  expandButton: {
    padding: wp(1),
  },
  childrenContainer: {
    marginTop: hp(1),
    paddingLeft: wp(5), // Tạo thụt lề cho danh mục con
  },
  childrenList: {
    paddingVertical: hp(0.5),
  },
});
