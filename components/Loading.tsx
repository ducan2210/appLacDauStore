import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type LoadingProps = {
  visible: boolean;
  text?: string;
};

const Loading = ({visible, text}: LoadingProps) => {
  return (
    <Spinner
      visible={visible}
      textContent={text || 'Loading...'}
      textStyle={styles.loadingText}
      overlayColor="rgba(0, 0, 0, 0.6)"
      animation="fade"
      color="#FFFFFF"
      size="large"
    />
  );
};

const styles = StyleSheet.create({
  loadingText: {
    fontSize: wp(4.5),
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: hp(1),
  },
});

export default Loading;
