import axios from 'axios';
import {apiUrl} from './apiURL';
import {typeProduct} from '@/models/product.model';

export const getAllProduct = async () => {
  try {
    const response = await axios.get(`${apiUrl}/GetAllProduct`);
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};

export const getAllProductAvailability = async () => {
  try {
    const response = await axios.get(`${apiUrl}/GetAllProductAvailability`);
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};

export const getSearchProduct = async (query: string) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetSearchProduct?query=${query}`,
    );
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to search product: ' + error);
  }
};

export const getProductById = async (query: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetProductById?product_id=${query}`,
    );

    return response.data as typeProduct;
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};

export const getProductByCategoryId = async (query: number) => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetProductByCategoryID?category_id=${query}`,
    );

    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};

export const getProductShortByTimeEndingSoonest = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetProductShortByTimeEndingSoonest`,
    );
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};

export const getProductShortByPriceLowestFirst = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetProductShortByPriceLowestFirst`,
    );
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product:' + error);
  }
};

export const getProductShortByPriceHighestFirst = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetProductShortByPriceHighestFirst`,
    );
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};

export const getProductShortByTimeNewlyListed = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/GetProductShortByTimeNewlyListed`,
    );
    return response.data as typeProduct[];
  } catch (error) {
    throw new Error('Failed to find product: ' + error);
  }
};
