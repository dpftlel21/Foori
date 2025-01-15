import { useQuery } from 'react-query';
import { getUserProfile } from '../../api/endpoints/auth';
import { cookieStorage } from '../../api/utils/cookies';

export const useUserInfo = () => {
  return useQuery(['userInfo'], getUserProfile, {
    enabled: !!cookieStorage.getToken(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    refetchOnMount: false,
  });
};
