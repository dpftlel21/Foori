import FindIDBox from "../components/login/findID/FindIDBox";

const FindID = () => {
  const ContainerStyle =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] flex flex-col justify-center items-center text-2xl font-bold";
  return (
    <div className={ContainerStyle}>
      <FindIDBox />
    </div>
  );
};

export default FindID;
