import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/images/icon.png';

const Logo = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <button
      className="h-[10vh] flex justify-center items-center"
      onClick={handleHome}
    >
      <img src={Icon} alt="icon" className="w-[80%] h-[7vh] cursor-pointer" />
      <h1 className="text-2xl font-bold">Foori</h1>
    </button>
  );
};

export default Logo;
