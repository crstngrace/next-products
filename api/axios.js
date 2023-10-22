import { api } from './config';

/*
 * Generic Axios for Fetching
 */
// Get
export async function getAxios(endpoint, arg) {
  return await api.get(`${endpoint}`, arg);
}
