import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import BtnSave from '@/components/BtnSave';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/rootReducer';

const ChangeName = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [data, setData] = useState({username: user?.username});
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen></BtnBackScreen>
        <Text style={styles.title}>Name</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.titleBox}>First Name</Text>
          <View style={styles.textInputStyle}>
            <TextInput
              placeholder="First Name"
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
              style={{fontSize: wp(4)}}
            />
          </View>
          <Text style={styles.titleBox}>Last Name</Text>
          <View style={styles.textInputStyle}>
            <TextInput
              value={data.username}
              autoComplete="off"
              autoCorrect={false} // Tắt tự động sửa
              spellCheck={false} // Tắt kiểm tra chính tả
              keyboardType="ascii-capable" // Chỉ cho phép ký tự ASCII cơ bản
              onChangeText={text => setData({...data, username: text})}
              placeholder="Last Name"
              style={{fontSize: wp(4)}}
            />
          </View>
        </View>
        <View>
          {user && <BtnSave data={data} userName={user.username}></BtnSave>}
        </View>
      </View>
    </View>
  );
};

export default ChangeName;

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
  body: {
    flex: 1,
    marginTop: hp(2),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(2),
  },
  titleBox: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  textInputStyle: {
    fontSize: wp(5),
    borderWidth: wp(0.2),
    borderColor: '#ccc',
    borderRadius: wp(2),
    padding: wp(2),
    marginTop: hp(1),
    marginBottom: hp(2),
  },
});
