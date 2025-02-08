import ContentList from './ContentList';
import Profile from './profile/Profile';

const Content = () => {
  return (
    <div className="w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-20rem)] lg:h-[calc(100dvh-8rem)] md:max-w-[calc(100dvw-10rem)] flex flex-col bg-white md:border-solid md:border-2 md:border-[#EE6677] md:rounded-xl">
      <Profile />
      <ContentList />
    </div>
  );
};

export default Content;
