import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {typeNotification} from '@/models/notification.model';
import {getNotificationByUserID} from '@/hooks/api/useNotification';
import NotificationItem from '@/components/notificationComponent/notificationItem';

const ListNotification = ({user_id}: {user_id: number}) => {
  const [notifications, setNotifications] = useState<typeNotification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNotificationByUserID(user_id);
        if (response) {
          setNotifications(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        data={notifications}
        renderItem={({item}) => {
          return <NotificationItem item={item} />;
        }}
      />
    </View>
  );
};

export default ListNotification;

const styles = StyleSheet.create({});
