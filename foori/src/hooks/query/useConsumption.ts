import { useQuery } from 'react-query';
import { getConsumptionData } from '../../api/endpoints/consumption';

interface ConsumptionResponse {
  MyMaxVisit: string;
  MyMaxVisitCount: string;
  beforeSumPrice: null;
  category: string;
  categoryCount: string;
  myAvgPrice: string;
  sumPrice: string;
  categorySumPrice: string;
  totalUserAvgPrice: string;
}

export const useConsumption = (fromDate: string, toDate: string) => {
  return useQuery<ConsumptionResponse[]>({
    queryKey: ['consumption', fromDate, toDate],
    queryFn: () => getConsumptionData(fromDate, toDate),
    enabled: !!fromDate && !!toDate, // 날짜가 모두 있을 때만 쿼리 실행
    staleTime: 30000,
    cacheTime: 5 * 60 * 1000,
  });
};
