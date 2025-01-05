import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LinearGradient} from 'expo-linear-gradient';
import {EvilIcons, MaterialIcons} from '@expo/vector-icons';

const HomeUI = () => {
  const DATA = Array.from({length: 10}, (_, index) => ({
    id: index.toString(),
    title: `Item ${index + 1}`,
  }));
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e90ff', '#87cefa']} // Màu bắt đầu và kết thúc
        style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: wp(6), fontWeight: 'bold', color: 'white'}}>
            Hi username...
          </Text>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bell-outline"
              size={wp(7)}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: hp(2)}}>
          <EvilIcons name="location" size={wp(10)} color="white" />
          <Text style={{fontSize: wp(5), fontWeight: '600', color: 'white'}}>
            TP.HCM, Việt Nam
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.searchContainer}>
        <View style={styles.SearchBar}>
          <MaterialIcons name="search" size={wp(6)} color="black" />
          <TextInput
            style={{marginLeft: wp(2), flex: 1}}
            placeholder="Search"
          />
        </View>
      </View>
      <View
        style={{marginTop: hp(5), paddingHorizontal: wp(4), height: hp(23)}}>
        <FlatList
          data={DATA}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.item}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: wp(5), // Giữ nguyên borderRadius
                    overflow: 'hidden', // Đảm bảo phần con không bị tràn ra
                  }}>
                  <Image
                    style={{
                      flex: 0.8,
                      width: '100%',
                      height: '100%',
                    }}
                    source={require('../../../assets/images/giay.png')}
                  />
                  <View
                    style={{
                      flex: 0.2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ để phân biệt text
                    }}>
                    <Text style={{textAlign: 'center', color: 'white'}}>
                      {item.title}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}></FlatList>
      </View>
    </ScrollView>
  );
};

export default HomeUI;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: wp(7),
    paddingTop: hp(5),
    height: hp(20),
    flexDirection: 'column',

    borderBottomEndRadius: wp(8),
    borderBottomStartRadius: wp(8),
  },
  SearchBar: {
    flexDirection: 'row',
    borderRadius: wp(10),
    paddingHorizontal: wp(4),
    alignItems: 'center',
    backgroundColor: 'white',
    height: hp(7),
    width: wp(70),
    borderWidth: wp(0.1),
    borderColor: '#ccc', // Màu đường viền nhạt hơn

    // Drop Shadow trên iOS
    shadowColor: '#000', // Màu bóng
    shadowOffset: {width: 0, height: 2}, // Hướng của bóng
    shadowOpacity: 0.4, // Độ trong suốt của bóng (0.0 - 1.0)
    shadowRadius: 3, // Độ mờ của bóng

    // Drop Shadow trên Android
    elevation: 4, // Độ cao của bóng (giá trị càng lớn, bóng càng rõ)
  },
  searchContainer: {
    position: 'absolute',
    top: hp(16), // Điều chỉnh để đè nửa lên header
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10, // Đảm bảo nằm trên `LinearGradient`
  },
  item: {
    height: hp(20),
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(3),
    borderRadius: wp(5),
    borderWidth: wp(0.1),
    borderColor: '#ccc',

    // Drop Shadow chỉ ở đây
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5}, // Hướng của bóng
    shadowOpacity: 0.5, // Độ trong suốt của bóng (0.0 - 1.0)
    shadowRadius: 2, // Độ mờ của bóng
    elevation: 5,
  },
});
