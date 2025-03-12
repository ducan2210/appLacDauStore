import axios from 'axios';
import {apiUrl} from './apiURL';
import {typeCategory} from '@/models/category.model';

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${apiUrl}/GetCategory`);
    return response.data as typeCategory[];
  } catch (error) {
    throw new Error('Failed to create user: ' + error);
  }
};
export const getCategoryTree = async () => {
  try {
    const response = await axios.get(`${apiUrl}/GetCategoryTree`);
    return response.data as typeCategory[];
  } catch (error) {
    throw new Error('Failed to create user: ' + error);
  }
};

export const getCategoryChildren = async (idCategory: number | null) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetCategoryChildren?parent_id=${idCategory}`,
    );
    return response.data as typeCategory[];
  } catch (error) {
    throw new Error('Failed to create user: ' + error);
  }
};

export const getCategoryRoot = async () => {
  try {
    const response = await axios.get(`${apiUrl}/GetAllCategoryRoot`);
    return response.data as typeCategory[];
  } catch (error) {
    throw new Error('Failed to create user: ' + error);
  }
};
