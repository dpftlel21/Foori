import { getData } from '../api';

export const getConsumptionData = async (fromDate: string, toDate: string) =>
  getData(`api/mypage/my-stats/${fromDate}/${toDate}`);
