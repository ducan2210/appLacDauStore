import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {typeNotification} from '@/models/notification.model';
import {getNotificationByUserID} from '@/hooks/api/useNotification';
import NotificationItem from '@/components/notificationComponent/notificationItem';

const ListNotification = ({
  notification,
}: {
  notification: typeNotification[];
}) => {
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={notification}
        renderItem={({item}) => {
          return <NotificationItem item={item} />;
        }}
      />
    </View>
  );
};

export default ListNotification;

const styles = StyleSheet.create({});
