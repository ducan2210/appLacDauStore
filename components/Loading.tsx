import React from 'react';
import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';

type LoadingProps = {
  visible: boolean;
  text?: string;
};

const Loading = ({visible, text}: LoadingProps) => {
  if (!visible) return null;
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#40BFFF" />
      <Text style={styles.loadingText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
});

export default Loading;
