import FindPwBox from "src/components/login/findPassword/FindPwBox";

const FindPassword = () => {
  const ContainerStyle =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] flex flex-col justify-center items-center text-2xl font-bold";
  return (
    <div className={ContainerStyle}>
      <FindPwBox />
    </div>
  );
};

export default FindPassword;
