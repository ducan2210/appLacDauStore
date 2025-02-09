import axios from 'axios';
import {apiUrl} from './apiURL';
import {loadAddress} from '@/redux/slices/addressSlice';
import axiosInstance from './axiosInstance';
import {Alert} from 'react-native';
import {router} from 'expo-router';

export const updateDefaultAddress = async (
  dispatch: any,
  user_id: number,
  address_id: number,
) => {
  try {
    const response = await axios.put(
      `${apiUrl}/UpdateDefaultAddress?user_id=${user_id}&address_id=${address_id}&is_default=1`,
    );
    dispatch(loadAddress(user_id));
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw new Error('Update failed');
  }
};

export const deleteAddress = async (
  dispatch: any,
  user_id: number,
  address_id: number,
) => {
  try {
    const response = await axiosInstance.delete(
      `${apiUrl}/DeleteAddress?user_id=${user_id}&&address_id=${address_id}`,
    );
    dispatch(loadAddress(user_id));
    return response.data;
  } catch (error) {
    console.error('Delete failed:', error);
    throw new Error('Delete failed');
  }
};

export const createAddress = async (
  dispatch: any,
  user_id: number,
  full_name: string,
  phone: string,
  address_line: string,
  postal_code: string,
  city: string,
  state: string,
  country: string,
) => {
  try {
    const response = await axiosInstance.post(`${apiUrl}/CreateAddress`, {
      user_id: user_id,
      full_name: full_name,
      phone: phone,
      address_line: address_line,
      postal_code: postal_code,
      city: city,
      state: state,
      country: country,
    });
    if (response.data) {
      Alert.alert('Success', 'Address created successfully');
    }
    dispatch(loadAddress(user_id));
    router.back();
    return response.data;
  } catch (error) {
    console.error('Create failed:', error);
    throw new Error('Create failed');
  }
};

export const updateAddress = async (
  dispatch: any,
  user_id: number,
  address_id: number,
  full_name: string,
  phone: string,
  address_line: string,
  postal_code: string,
  city: string,
  state: string,
  country: string,
) => {
  try {
    const response = await axiosInstance.put(`${apiUrl}/UpdateAddress`, {
      user_id: user_id,
      address_id: address_id,
      full_name: full_name,
      phone: phone,
      address_line: address_line,
      postal_code: postal_code,
      city: city,
      state: state,
      country: country,
    });
    if (response.data) {
      Alert.alert('Success', 'Address updated successfully');
    }
    dispatch(loadAddress(user_id));
    router.back();
    return response.data;
  } catch (error) {
    console.error('Update failed:', error);
    throw new Error('Update failed');
  }
};
