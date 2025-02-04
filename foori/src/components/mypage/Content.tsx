import ContentList from './ContentList';
import Profile from './profile/Profile';

const Content = () => {
  const STYLES = {
    wrapper:
      'w-full h-[calc(768px-5px)] md:h-[calc(100vh-8rem)] md:max-w-[calc(100vw-10rem)] flex flex-col md:mx-auto bg-white md:border-solid md:border-2 md:border-[#EE6677] md:rounded-xl',
  } as const;

  return (
    <div className={STYLES.wrapper}>
      <Profile />
      <ContentList />
    </div>
  );
};

export default Content;
