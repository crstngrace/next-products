import axios from 'axios';
import getConfig from 'next/config';

/*
 * Axios Configuration
 */
const { publicRuntimeConfig } = getConfig();

// API endpoints
export const endPoints = {
  searchProducts: 'products/search',
  getProducts: 'products'
};

// Set axios base URL
export const api = axios.create({
  baseURL: publicRuntimeConfig.API_URL || '/api'
});
