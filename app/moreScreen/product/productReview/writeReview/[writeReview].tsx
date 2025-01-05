import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BtnBackScreen from '@/components/BtnBackScreen';
import {useLocalSearchParams} from 'expo-router';
import StarRating from '@/components/StarRating';
import {launchImageLibrary} from 'react-native-image-picker';
import {AntDesign, EvilIcons} from '@expo/vector-icons';

const WriteReview = () => {
  const {writeReview} = useLocalSearchParams();
  const [photos, setPhotos] = useState<string[]>([]); // Lưu đường dẫn ảnh

  const handleAddPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // Cho phép chọn nhiều ảnh
      },
      response => {
        if (!response.didCancel && !response.errorCode && response.assets) {
          const selectedPhotos = response.assets.map(asset => asset.uri || '');
          setPhotos([...photos, ...selectedPhotos]); // Thêm ảnh vào danh sách
        }
      },
    );
  };

  const handleRemovePhoto = (index: number) => {
    // Xóa ảnh theo vị trí trong danh sách
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>{writeReview}</Text>
      </View>
      <ScrollView style={styles.body}>
        <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
          Please write Overall level of satisfaction with your shipping /
          Delivery Service
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp(2),
          }}>
          <StarRating rating={4} />
          <Text style={{fontSize: wp(4), fontWeight: '800', marginLeft: wp(2)}}>
            4/5
          </Text>
        </View>
        <Text style={{fontSize: wp(4), fontWeight: 'bold', marginTop: hp(4)}}>
          Write Your Review
        </Text>
        <TextInput
          placeholder="Write Your Review Here"
          multiline={true}
          numberOfLines={4}
          style={{
            fontSize: wp(4),
            height: hp(20),
            width: wp(94),
            borderWidth: wp(0.1),
            borderRadius: wp(1),
            borderColor: '#9098B1',
            padding: wp(3),
            marginTop: hp(2),
          }}
        />
        <Text style={{fontSize: wp(4), fontWeight: 'bold', marginTop: hp(4)}}>
          Add Photo
        </Text>
        <View style={styles.photoContainer}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoWrapper}>
              <Image source={{uri: photo}} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePhoto(index)}>
                <EvilIcons name="trash" size={wp(5)} color="#9098B1" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity
            onPress={handleAddPhoto}
            style={styles.addPhotoButton}>
            <AntDesign name="plus" size={wp(8)} color="#9098B1" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default WriteReview;

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
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  body: {
    marginTop: hp(2),
  },
  addPhotoButton: {
    borderWidth: wp(0.1),
    borderColor: '#9098B1',
    width: wp(20),
    height: wp(20),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },

  photoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(2),
  },
  photoWrapper: {
    position: 'relative',
    width: wp(20),
    height: wp(20),
    marginRight: wp(2),
    marginBottom: wp(2),
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: wp(2),
  },
  removeButton: {
    position: 'absolute',
    top: -wp(2),
    right: -wp(2),
    backgroundColor: 'white',
    width: wp(6),
    height: wp(6),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
