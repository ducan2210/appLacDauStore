import BtnBackScreen from '@/components/BtnBackScreen';
import {getOrderById} from '@/hooks/api/useOrder';
import {typeOrderInformation} from '@/models/order.model';
import {FontAwesome} from '@expo/vector-icons';
import {Link, useLocalSearchParams} from 'expo-router';
import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useFocusEffect} from '@react-navigation/native';

const OrderDetail = () => {
  const {orderDetail} = useLocalSearchParams();
  const [orderInformation, setOrderInformation] =
    useState<typeOrderInformation>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadOrderDetail = async () => {
    setLoading(true);
    const order = await getOrderById(Number(orderDetail));
    if (order) {
      setOrderInformation(order.order);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrderDetail();
  }, [orderDetail]);

  useFocusEffect(
    useCallback(() => {
      loadOrderDetail();
    }, [orderDetail]),
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'hourglass-start';
      case 'shipped':
        return 'truck';
      case 'completed':
        return 'check-circle';
      case 'cancelled':
        return 'times-circle';
      default:
        return 'question-circle';
    }
  };

  const getStatusColor = (status: string, currentStatus: string) => {
    const statusOrder = ['pending', 'shipped', 'completed', 'cancelled'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);
    return statusIndex <= currentIndex
      ? getStatusColorByStatus(status)
      : '#808080';
  };

  const getStatusColorByStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return '#FFA500'; // Orange
      case 'shipped':
        return '#1E90FF'; // Blue
      case 'completed':
        return '#32CD32'; // Green
      case 'cancelled':
        return '#FF0000'; // Red
      default:
        return '#808080'; // Grey
    }
  };

  const parseOrderInformation = (orderInfo: string) => {
    const infoArray = orderInfo.split(', ');
    return infoArray.map((info, index) => (
      <Text key={index} style={styles.infoValue}>
        {info}
      </Text>
    ));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrderDetail();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BtnBackScreen />
        <Text style={styles.title}>Order Information</Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#40BFFF']} // Màu của vòng loading khi kéo
            tintColor="#40BFFF" // Màu trên iOS
          />
        }
        showsVerticalScrollIndicator={false}
        style={styles.body}>
        <View style={styles.statusContainer}>
          <View style={{alignItems: 'center', marginBottom: hp(2)}}>
            <Text style={styles.infoLabel}>Order status</Text>
          </View>
          <View style={styles.statusSteps}>
            <View style={styles.statusStep}>
              <FontAwesome
                name={getStatusIcon('pending')}
                size={wp(6)}
                color={getStatusColor(
                  'pending',
                  orderInformation?.status || '',
                )}
              />
              <View
                style={[
                  styles.statusLine,
                  {
                    backgroundColor: getStatusColor(
                      'shipped',
                      orderInformation?.status || '',
                    ),
                  },
                ]}
              />
            </View>
            <View style={styles.statusStep}>
              <FontAwesome
                name={getStatusIcon('shipped')}
                size={wp(6)}
                color={getStatusColor(
                  'shipped',
                  orderInformation?.status || '',
                )}
              />
              <View
                style={[
                  styles.statusLine,
                  {
                    backgroundColor: getStatusColor(
                      orderInformation?.status === 'completed' ||
                        orderInformation?.status === 'cancelled'
                        ? orderInformation?.status
                        : 'completed',
                      orderInformation?.status || '',
                    ),
                  },
                ]}
              />
            </View>
            <View style={styles.statusColumn}>
              <View style={{...styles.statusStep, marginBottom: hp(2)}}>
                <View
                  style={[
                    styles.statusHorizontalLine,
                    {
                      backgroundColor:
                        orderInformation?.status === 'completed'
                          ? getStatusColor(
                              'completed',
                              orderInformation?.status,
                            )
                          : '#808080',
                    },
                  ]}
                />
                <FontAwesome
                  name={getStatusIcon('completed')}
                  size={wp(6)}
                  color={
                    orderInformation?.status === 'completed'
                      ? getStatusColor('completed', orderInformation?.status)
                      : '#808080'
                  }
                />
              </View>
              <View style={styles.statusStep}>
                <View
                  style={[
                    styles.statusHorizontalLine,
                    {
                      backgroundColor:
                        orderInformation?.status === 'cancelled'
                          ? getStatusColor(
                              'cancelled',
                              orderInformation?.status,
                            )
                          : '#808080',
                    },
                  ]}
                />
                <FontAwesome
                  name={getStatusIcon('cancelled')}
                  size={wp(6)}
                  color={
                    orderInformation?.status === 'cancelled'
                      ? getStatusColor('cancelled', orderInformation?.status)
                      : '#808080'
                  }
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: hp(1),
            padding: wp(4),
            borderColor: '#9098B1',
            borderWidth: wp(0.1),
            borderRadius: wp(2),
          }}>
          <View style={{alignItems: 'center', marginBottom: hp(2)}}>
            <Text style={styles.infoLabel}>Recipient information</Text>
          </View>
          <View style={styles.infoValueContainer}>
            {orderInformation?.order_information &&
              parseOrderInformation(orderInformation.order_information)}
          </View>
        </View>
        {orderInformation?.OrderItems &&
        orderInformation.OrderItems.length > 0 ? (
          orderInformation.OrderItems.map(item => {
            const hasReview = orderInformation?.Reviews?.some(
              review => review.product_id === item.product_id,
            );

            return (
              <TouchableOpacity key={item.order_item_id}>
                <View style={styles.orderItem}>
                  <Image
                    style={styles.imageProduct}
                    source={{uri: item.Product.image_url}}
                  />
                  <View
                    style={{
                      marginLeft: wp(2),
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.productName}>{item.Product.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontSize: wp(4)}}>
                        Price: ${item.price}
                      </Text>
                      {item.discount && (
                        <Text style={styles.price}> ${item.Product.price}</Text>
                      )}
                    </View>
                    <Text style={{fontSize: wp(4)}}>
                      Quantity: {item.quantity}
                    </Text>
                    {item.discount && (
                      <Text style={{fontSize: wp(4)}}>
                        Discount: {Math.round(item.discount)}%
                      </Text>
                    )}

                    {orderInformation?.status === 'completed' && !hasReview && (
                      <View style={styles.reviewContainer}>
                        <Link
                          href={{
                            pathname:
                              '/moreScreen/product/productReview/writeReview/[writeReview]',
                            params: {
                              writeReview: item.Product.product_id,
                              order_id: item.order_id,
                            },
                          }}
                          asChild>
                          <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>
                              Go to Review Page
                            </Text>
                          </TouchableOpacity>
                        </Link>
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={{fontSize: wp(4)}}>Loading...</Text>
          </View>
        )}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total amount</Text>
            <Text style={styles.infoValue}>
              ${orderInformation?.total_amount}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Invoice Date</Text>
            <Text style={styles.infoValue}>
              {orderInformation?.created_at
                ? new Date(orderInformation.created_at).toLocaleString()
                : ''}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Form of payment</Text>
            <Text style={styles.infoValue}>
              {orderInformation?.PaymentMethod.method_name}
            </Text>
          </View>
        </View>
        <View style={{height: hp(12)}}></View>
      </ScrollView>
    </View>
  );
};

export default OrderDetail;

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
  body: {
    // marginTop: hp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginLeft: wp(3),
  },
  orderItem: {
    flexDirection: 'row',
    padding: wp(3),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    marginVertical: hp(2),
  },
  productName: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProduct: {
    height: hp(12),
    width: wp(30),
  },
  discount_price: {
    fontSize: wp(4),
    color: '#40BFFF',
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  price: {
    fontSize: wp(4),
    color: '#9098B1',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  statusContainer: {
    marginTop: hp(2),
    padding: wp(3),
    borderColor: '#9098B1',
    borderWidth: wp(0.1),
    borderRadius: wp(2),
  },
  statusSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLine: {
    width: wp(22),
    height: 2,
    backgroundColor: '#808080',
    marginHorizontal: wp(1),
  },
  statusHorizontalLine: {
    width: wp(22),
    height: 2,
    backgroundColor: '#808080',
    marginVertical: hp(1),
  },
  infoContainer: {},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(1),
  },
  infoLabel: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: '#333',
  },
  infoValue: {
    fontSize: wp(4),
    color: '#555',
  },
  infoValueContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  reviewContainer: {
    marginTop: hp(1),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: wp(2),
    fontSize: wp(4),
    minHeight: hp(6),
    width: wp(50),
    backgroundColor: '#fff',
    marginBottom: hp(1),
  },
  // Style cho nút Submit
  submitButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  // Style cho nút Navigate
  navigateButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    alignItems: 'center',
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: 'bold',
  },
});
