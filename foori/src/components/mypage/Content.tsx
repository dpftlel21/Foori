import ContentList from './ContentList';
import Profile from './profile/Profile';

const Content = () => {
  const STYLES = {
    wrapper:
      'w-[calc(100vw-2rem)] h-[calc(100vh-8rem)] md:max-w-[calc(100vw-10rem)] flex flex-col md:mx-auto bg-white border-solid border-2 border-[#EE6677] rounded-xl',
  } as const;

  return (
    <div className={STYLES.wrapper}>
      <Profile />
      <ContentList />
    </div>
  );
};

export default Content;
