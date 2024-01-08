import Header from "src/components/header/Header";
import StoreIfDetail from "src/components/storeDetail/StoreIfDetail";

const Detail = () => {
  const Container =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]";

  return (
    <>
      <div className={Container}>
        <Header />
        <StoreIfDetail />
      </div>
    </>
  );
};

export default Detail;
