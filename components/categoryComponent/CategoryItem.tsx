import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {typeCategory} from '@/models/category.model';
import {MaterialIcons} from '@expo/vector-icons';
import {router} from 'expo-router';

type props = {
  item: typeCategory;
  index?: number;
};

const CategoryItem = ({item, index = 0}: props) => {
  const [expanded, setExpanded] = useState(true); // Thêm state để theo dõi trạng thái mở/đóng

  const toggleExpand = () => {
    setExpanded(prev => !prev); // Đổi trạng thái khi nhấn
  };
  const handelCategory = (name: string, id: number, categoryName: string) => {
    router.push({
      pathname: '/moreScreen/search/[search]',
      params: {search: name, category: id, categoryName: categoryName}, // Pass any parameters if needed
    });
  };

  return (
    <View style={[styles.container, {marginLeft: wp(index * 10)}]}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => handelCategory(item.name, item.category_id, item.name)}>
        <Text
          style={[
            styles.title,
            {color: index === 0 ? '#000' : index === 1 ? '#555' : '#999'},
            {fontSize: index === 0 ? wp(5) : index === 1 ? wp(4.5) : wp(4)},
          ]}>
          {item.name}
        </Text>
        {item.children && item.children.length > 0 && (
          <TouchableOpacity onPress={toggleExpand}>
            <MaterialIcons
              name={expanded ? 'expand-less' : 'expand-more'}
              size={24}
              color="#888"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {expanded &&
        item.children &&
        item.children.length > 0 && ( // Nếu mục được mở rộng, hiển thị danh mục con
          <View style={styles.childrenContainer}>
            <FlatList
              data={item.children}
              keyExtractor={child => child.category_id.toString()}
              renderItem={({item: childItem}) => (
                <CategoryItem item={childItem} index={index + 1} />
              )}
            />
          </View>
        )}
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: wp(0.1),
    borderBottomColor: '#ccc',
    paddingBottom: hp(2),
    marginBottom: hp(2),
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
    alignItems: 'center',
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: wp(2),
  },
  childrenContainer: {
    marginTop: hp(2),
  },
});
