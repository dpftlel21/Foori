import Icon from "../../assets/images/icon.png";

const Logo = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img src={Icon} alt="icon" className="w-[60%] h-[7%]" />
      <h1>푸리</h1>
    </div>
  );
};

export default Logo;
