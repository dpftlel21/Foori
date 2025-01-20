import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import OauthCallback from './components/login/oauthLogin/OauthCallback';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import PaymentFail from './components/storeDetail/toss/PaymentFail';
import PaymentSuccess from './components/storeDetail/toss/PaymentSuccess';
import { setupAuthInterceptor, useTokenRefresh } from './hooks/auth/useAuth';
import { RouteConst } from './interface/RouteConst';
import Detail from './pages/Detail';
import FindID from './pages/FindID';
import FindPassword from './pages/FindPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Main from './pages/Main';
import MyPage from './pages/MyPage';
import SignUp from './pages/SignUp';
import WriteReview from './pages/WriteReview';

function App(): JSX.Element {
  const { mutateAsync: refreshToken } = useTokenRefresh();
  const queryClient = useQueryClient();
  const location = useLocation();

  const noHeaderRoutes = [
    RouteConst.Login,
    RouteConst.SignUp,
    RouteConst.FindID,
    RouteConst.FindPW,
    RouteConst.KaKaoCallback,
    RouteConst.NaverCallback,
    RouteConst.GoogleCallback,
  ];

  useEffect(() => {
    setupAuthInterceptor(queryClient, refreshToken);
  }, [refreshToken]);

  return (
    <>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={RouteConst.Login} element={<Login />} />
        <Route path={RouteConst.SignUp} element={<SignUp />} />
        <Route path={RouteConst.FindID} element={<FindID />} />
        <Route path={RouteConst.FindPW} element={<FindPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={RouteConst.Main} element={<Main />} />
          <Route path={RouteConst.MyPage} element={<MyPage />} />
          <Route path={RouteConst.WriteReview} element={<WriteReview />} />
          <Route
            path={RouteConst.PaymentSuccess}
            element={<PaymentSuccess />}
          />
          <Route path={RouteConst.PaymentFail} element={<PaymentFail />} />
        </Route>

        {/* Public Routes */}
        <Route path={RouteConst.Detail} element={<Detail />} />
        <Route path={RouteConst.KaKaoCallback} element={<OauthCallback />} />
        <Route path={RouteConst.NaverCallback} element={<OauthCallback />} />
        <Route path={RouteConst.GoogleCallback} element={<OauthCallback />} />
      </Routes>
    </>
  );
}

export default App;
