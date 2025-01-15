import { NavLink } from 'react-router-dom';
import { RouteConst } from '../../interface/RouteConst';

const STYLES = {
  nav: 'flex items-center gap-6',
  link: 'text-sm text-gray-800 hover:text-gray-600 transition-colors',
} as const;

const Navigation = () => {
  return (
    <nav className={STYLES.nav}>
      <NavLink to={RouteConst.Main} className={STYLES.link}>
        예약하기
      </NavLink>
      <NavLink to={RouteConst.MyPage} className={STYLES.link}>
        마이페이지
      </NavLink>
    </nav>
  );
};

export default Navigation;
