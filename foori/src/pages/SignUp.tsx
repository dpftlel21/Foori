import SignUpBox from "../components/signup/SignUpBox";

const SignUp = () => {
  const SignUpStyle =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] flex flex-col justify-center items-center text-2xl font-bold";

  return (
    <div className={SignUpStyle}>
      <SignUpBox />
    </div>
  );
};

export default SignUp;
