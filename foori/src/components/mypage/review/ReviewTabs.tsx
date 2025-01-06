interface ReviewTabsProps {
  activeTab: 'available' | 'written';
  onTabChange: (tab: 'available' | 'written') => void;
}

const ReviewTabs = ({ activeTab, onTabChange }: ReviewTabsProps) => {
  return (
    <div className="flex gap-4 border-b border-gray-200">
      <button
        className={`pb-2 px-1 font-medium transition-colors relative ${
          activeTab === 'available'
            ? 'text-[#FF800B] border-b-2 border-[#FF800B]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('available')}
      >
        작성 가능한 리뷰
      </button>
      <button
        className={`pb-2 px-1 font-medium transition-colors relative ${
          activeTab === 'written'
            ? 'text-[#FF800B] border-b-2 border-[#FF800B]'
            : 'text-gray-500 hover:text-gray-700'
        }`}
        onClick={() => onTabChange('written')}
      >
        작성한 리뷰
      </button>
    </div>
  );
};

export default ReviewTabs;
