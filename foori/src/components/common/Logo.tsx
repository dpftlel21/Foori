import Icon from "../../assets/images/icon.png";

const Logo = () => {
  return (
    <div className="h-[15vh] flex justify-center items-center">
      <img src={Icon} alt="icon" className="w-[60%] h-[10vh]" />
      <h1>푸리</h1>
    </div>
  );
};

export default Logo;
