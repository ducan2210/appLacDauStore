import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Link} from 'expo-router';

const index = () => {
  return (
    <View style={styles.container}>
      <Link href={'/entry/LoginUI'} asChild>
        <Text>avcs</Text>
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
