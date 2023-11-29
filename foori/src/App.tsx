import "./App.css";
import { Route, Routes } from "react-router-dom";
import { RouteConst } from "./interface/RouteConst";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <>
      <Routes>
        <Route path={RouteConst.Main} element={<Main />} />
        <Route path={RouteConst.Login} element={<Login />} />
        <Route path={RouteConst.SignUp} element={<SignUp />} />
        <Route path={RouteConst.MyPage} element={<MyPage />} />
      </Routes>
    </>
  );
}

export default App;
