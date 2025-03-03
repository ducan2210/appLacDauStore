import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {typeNotification} from '@/models/notification.model';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const NotificationItem = ({item}: {item: typeNotification}) => {
  const isUnread = item.status === 'unread';

  return (
    <TouchableOpacity
      style={[styles.container, isUnread && styles.unreadContainer]}>
      <View style={styles.content}>
        <Text style={[styles.title, isUnread && styles.unreadText]}>
          {item.title}
        </Text>
        <Text
          style={[styles.message, isUnread && styles.unreadText]}
          numberOfLines={3}
          ellipsizeMode="tail">
          {item.message}
        </Text>
        <Text style={styles.date}>
          {new Date(item.created_at).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: hp(1),
    padding: wp(4),
    borderRadius: wp(3),
    backgroundColor: '#FFFFFF',
    borderWidth: wp(0.2),
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp(0.2)},
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    elevation: 3,
  },
  unreadContainer: {
    backgroundColor: '#F0F7FF',
    borderColor: '#007AFF',
    borderWidth: wp(0.4),
    shadowOpacity: 0.15,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#223263',
    marginBottom: hp(0.8),
  },
  message: {
    fontSize: wp(3.8),
    color: '#666666',
    lineHeight: wp(5),
    marginBottom: hp(0.8),
  },
  unreadText: {
    color: '#007AFF',
    fontWeight: '700',
  },
  date: {
    fontSize: wp(3.2),
    color: '#9098B1',
    fontStyle: 'italic',
  },
});
