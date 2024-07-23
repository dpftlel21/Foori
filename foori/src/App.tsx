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
import OauthCallback from "./components/login/oauth/OauthCallback";

function App() {
  return (
    <>
      <Routes>
        <Route path={RouteConst.Main} element={<Main />} />
        <Route path={RouteConst.Login} element={<Login />} />
        <Route path={RouteConst.SignUp} element={<SignUp />} />
        <Route path={RouteConst.MyPage} element={<MyPage />} />
        <Route path={RouteConst.FindID} element={<FindID />} />
        <Route path={RouteConst.FindPW} element={<FindPassword />} />
        <Route path={RouteConst.Detail} element={<Detail />} />
        <Route path={RouteConst.OauthCallback} element={<OauthCallback />} />
      </Routes>
    </>
  );
}

export default App;
