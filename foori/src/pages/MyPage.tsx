import Content from '../components/mypage/Content';

const MyPage = () => {
  const Container =
    'min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-5rem)] bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] flex justify-center items-center';

  return (
    <div className={Container}>
      <Content />
    </div>
  );
};

export default MyPage;
