import Header from "src/components/header/Header";

const Main = () => {
  const MainStyle =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]";

  return (
    <main className={MainStyle}>
      <Header />
    </main>
  );
};

export default Main;
