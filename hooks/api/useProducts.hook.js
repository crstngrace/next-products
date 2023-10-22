import { useQuery } from 'react-query';
import { endPoints } from '@/api/config';
import { getAxios } from '@/api/axios';

/*
 * Hook for Fetching Products
 */
// Fetch products
export const useFetchProducts = (arg) => {
  const { limit, skip, q } = arg.params;

  return useQuery({
    queryKey: ['products', limit, skip, q],
    queryFn: async () => {
      const url = q ? endPoints.searchProducts : endPoints.getProducts;
      const response = await getAxios(url, arg);

      return response.data;
    },
    refetchOnWindowFocus: false,
    retry: false
  });
};
