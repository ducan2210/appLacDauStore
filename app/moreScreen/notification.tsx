import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import ListNotification from '@/components/notificationComponent/listNotification';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';
import {Link} from 'expo-router';
import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
const Notification = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>Notification</Text>
      </View>
      <ScrollView>
        {user?.user_id ? (
          <ListNotification user_id={user.user_id} />
        ) : (
          <Text style={{color: 'red'}}>User is not logged in</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(4),
    paddingHorizontal: wp(3),
  },
  header: {
    flexDirection: 'row',
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

  option: {
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(100),
  },
  optionTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
