import { getData } from '../api';

interface RestaurantParams {
  page: number;
  size: number;
}

export const getCrawledData = () => getData('api/place');

export const getRestaurantDetail = (id: string) => getData(`api/place/${id}`);

export const getRestaurants = (params: RestaurantParams) =>
  getData(`api/place/list?page=${params.page}&size=${params.size}`);
