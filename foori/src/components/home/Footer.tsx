interface StatsProps {
  stats: {
    restaurants: number;
    users: number;
    reviews: number;
    reservations: number;
  };
}

const Footer = ({ stats }: StatsProps) => {
  return (
    <section className="bg-[#FFD4BC] py-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="text-center">
            <div className="text-3xl font-bold text-[#FF6B3D] mb-2">
              {value.toLocaleString()}+
            </div>
            <div className="text-gray-700">
              {key === 'restaurants' && '등록된 맛집'}
              {key === 'users' && '활성 사용자'}
              {key === 'reviews' && '누적 리뷰'}
              {key === 'reservations' && '완료된 예약'}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Footer;
