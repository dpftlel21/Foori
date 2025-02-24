import { useUserInfo } from '../../../hooks/query/useGetUserInfo';
import OauthCon from './oauthCon/OauthCon';

const STYLES = {
  wrapper: 'p-2 md:p-6 border-solid border-b-2 border-[#EE6677]',
  container: 'flex flex-col md:flex-row justify-between items-center gap-4',
  userSection: 'flex items-center gap-4 w-full',
  imageWrapper: `
    w-12 h-12 md:w-14 md:h-14
    shrink-0
    rounded-full
    border-2 border-[#EE6677]/20
    shadow-md
    overflow-hidden
  `,
  userImage: 'w-full h-full rounded-full object-cover',
  userInfo: 'flex flex-row items-center justify-between w-full',
  nameSection: 'flex flex-col justify-center',
  userName: 'text-lg font-medium leading-tight',
  oauthSection: 'flex items-center gap-1.5 scale-90 origin-right',
} as const;

const Profile = () => {
  const userInfoQuery = useUserInfo();
  const userInfo = userInfoQuery.data;

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <div className={STYLES.userSection}>
          <div className={STYLES.imageWrapper}>
            <img
              src={userInfo?.profileImageUri}
              alt="user"
              className={STYLES.userImage}
            />
          </div>
          <div className={STYLES.userInfo}>
            <div className={STYLES.nameSection}>
              <h1 className={STYLES.userName}>{userInfo?.name}</h1>
            </div>
            <div className={STYLES.oauthSection}>
              <OauthCon actionType="connect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
