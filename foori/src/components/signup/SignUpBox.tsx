import Logo from "../common/Logo";

const SignUpBox = () => {
  const SignUpBox =
    "w-[35%] h-[60%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-40 border border-gray-400 rounded-md shadow-md text-sm";
  return (
    <>
      <Logo />
      <div className={SignUpBox}>
        <h1>SignupBox</h1>
      </div>
    </>
  );
};

export default SignUpBox;
