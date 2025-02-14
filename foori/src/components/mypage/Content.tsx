import ContentList from './ContentList';
import Profile from './profile/Profile';

const Content = () => {
  return (
    <div className="w-full h-[calc(100dvh-5rem)] flex justify-center items-center md:bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]">
      <div className="w-full md:w-[calc(100dvw-10rem)] md:h-[calc(100dvh-10rem)] lg:h-[calc(100dvh-8rem)] flex flex-col p-4 bg-white md:border-solid md:border-2 md:border-[#EE6677] md:rounded-xl">
        <Profile />
        <ContentList />
      </div>
    </div>
  );
};

export default Content;
