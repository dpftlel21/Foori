import Logo from "../common/Logo";

const Login = () => {
  const LoginBox =
    "w-[35%] h-[60%] flex justify-center items-center bg-[#ffffffba] border border-gray-400 shadow-md";

  return (
    <>
      <Logo />
      <div className={LoginBox}>
        <h1>Login</h1>
      </div>
    </>
  );
};

export default Login;
