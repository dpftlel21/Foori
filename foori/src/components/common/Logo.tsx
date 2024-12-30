import { useNavigate } from 'react-router-dom';
import Icon from '../../assets/images/icon.png';

const Logo = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="h-[10vh] flex justify-center items-center">
      <img
        src={Icon}
        alt="icon"
        className="w-[80%] h-[7vh] cursor-pointer"
        onClick={handleHome}
      />
    </div>
  );
};

export default Logo;
