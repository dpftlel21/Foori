import { useQuery } from 'react-query';
import { getData } from '../../api/api';

// 크롤링 데이터 전체 조회
export const useCrawledData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['crawledData'],
    queryFn: () => getData(`api/place`),
  });
  return { data, isLoading, error };
};

// 가게 상세 조회
export const useCrawledDataDetail = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['crawledDataDetail', id],
    queryFn: () => getData(`api/place/${id}`),
  });

  return { data, isLoading, error };
};
