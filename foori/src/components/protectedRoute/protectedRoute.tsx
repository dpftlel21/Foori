import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { cookieStorage } from '../../api/utils/cookies';
import { useToast } from '../../contexts/ToastContext';
import { RouteConst } from '../../interface/RouteConst';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const token = cookieStorage.getToken();

  useEffect(() => {
    if (!token) {
      showToast('로그인이 필요한 서비스입니다.', 'warning');
      navigate(RouteConst.Login, {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [token, navigate, location, showToast]);

  if (!token) return null;

  return <Outlet />;
};

export default ProtectedRoute;
