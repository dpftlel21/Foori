import Header from "../components/header/Header";
import StoreIfDetail from "../components/storedetail/StoreIfDetail";

const Detail = () => {
  const Container =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]";

  return (
    <>
      <main className={Container}>
        <Header />
        <StoreIfDetail />
      </main>
    </>
  );
};

export default Detail;
