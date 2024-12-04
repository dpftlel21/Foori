import Header from "../components/header/Header";
import Content from "../components/mypage/Content";

const MyPage = () => {
  const Container = "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]";

  return (
    <div className={Container}>
      <Header />
      <Content />
    </div>
  );
};

export default MyPage;
