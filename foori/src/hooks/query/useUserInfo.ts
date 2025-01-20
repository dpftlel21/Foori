import { useQuery, useQueryClient } from 'react-query';
import { getUserProfile } from '../../api/endpoints/auth';
import { cookieStorage } from '../../api/utils/cookies';

export const useUserInfo = () => {
  const queryClient = useQueryClient();
  const token = cookieStorage.getToken();

  return useQuery(
    ['userInfo'],
    async () => {
      try {
        const response = await getUserProfile();
        return response;
      } catch (err) {
        // 에러 발생 시 이전 캐시된 데이터 확인
        const previousData = queryClient.getQueryData(['userInfo']);
        if (previousData) {
          console.log('Error occurred, using cached userInfo');
          return previousData; // 캐시된 데이터 반환
        }
        throw err; // 캐시된 데이터도 없는 경우에만 에러 발생
      }
    },
    {
      enabled: !!token,
      staleTime: Infinity, // 캐시된 데이터를 최대한 오래 유지
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: false,
      keepPreviousData: true,
    },
  );
};
