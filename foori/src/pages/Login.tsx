import LoginBox from "../components/login/LoginBox";

const Login = () => {
  const LoginStyle =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] flex flex-col justify-center items-center text-2xl font-bold";
  return (
    <div className={LoginStyle}>
      <LoginBox />
    </div>
  );
};

export default Login;
