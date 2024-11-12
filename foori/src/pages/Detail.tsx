import Header from "src/components/header/Header";
import StoreIfDetail from "src/components/storeDetail/StoreIfDetail";

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
