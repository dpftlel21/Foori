import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RouteConst } from "./interface/RouteConst";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import FindID from "./pages/FindID";
import FindPassword from "./pages/FindPassword";
import Detail from "./pages/Detail";
import OauthCallback from "./components/login/oauthLogin/OauthCallback";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path={RouteConst.Main} element={<Main />} />
        <Route path={RouteConst.Login} element={<Login />} />
        <Route path={RouteConst.SignUp} element={<SignUp />} />
        <Route path={RouteConst.MyPage} element={<MyPage />} />
        <Route path={RouteConst.FindID} element={<FindID />} />
        <Route path={RouteConst.FindPW} element={<FindPassword />} />
        <Route path={RouteConst.Detail} element={<Detail />} />
        {/* OAuth 콜백 라우트 추가 */}
        <Route path={RouteConst.KaKaoCallback} element={<OauthCallback />} />
        <Route path={RouteConst.NaverCallback} element={<OauthCallback />} />
        <Route path={RouteConst.GoogleCallback} element={<OauthCallback />} />
      </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
