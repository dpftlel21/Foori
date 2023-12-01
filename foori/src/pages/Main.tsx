import Header from "src/components/header/Header";
import FoodFilter from "src/components/main/FoodFilter";
import KaKaoMap from "src/components/main/KaKaoMap";
import SearchPlace from "src/components/main/SearchPlace";

const Main = () => {
  const MainStyle =
    "w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]";

  return (
    <main className={MainStyle}>
      <Header />
      <SearchPlace />
      <FoodFilter />
      <KaKaoMap />
    </main>
  );
};

export default Main;
