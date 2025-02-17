import { getData } from '../api';

export const getConsumptionData = async (fromDate: string, toDate: string) => {
  const response = getData(`api/mypage/my-stats/${fromDate}/${toDate}`);
  console.log('response', response);
  return response;
};
