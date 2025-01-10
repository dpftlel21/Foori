import { useAuth } from '../../../api/auth';
import OauthCon from './oauthCon/OauthCon';

const Profile = () => {
  const { userInfoQuery } = useAuth();
  const userInfo = userInfoQuery.data;

  const STYLES = {
    wrapper: 'p-4 md:p-6 border-solid border-b-2 border-[#EE6677]',
    container: 'flex flex-col md:flex-row justify-between items-center gap-4',
    userSection:
      'flex items-center gap-4 md:gap-6 border-b-2 border-solid border-[#f4f2f2eb]',
    imageWrapper: 'w-12 h-12 md:w-14 md:h-14',
    userImage: 'w-full h-full rounded-full object-cover',
    userName: 'text-lg font-medium',
    userEmail: 'text-sm text-gray-600',
    oauthSection: 'flex justify-center md:justify-end',
  } as const;

  return (
    <div className={STYLES.wrapper}>
      <div className={STYLES.container}>
        <div className={STYLES.userSection}>
          <div className={STYLES.imageWrapper}>
            <img
              src={userInfo?.image}
              alt="user"
              className={STYLES.userImage}
            />
          </div>
          <h1 className={STYLES.userName}>{userInfo?.name}</h1>
        </div>
        <div className={STYLES.oauthSection}>
          <OauthCon actionType="connect" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
