import { useState } from 'react';
import Header from '../components/header/Header';
import FeaturesSection from '../components/home/FeaturesSection';
import Footer from '../components/home/Footer';
import HeroSection from '../components/home/HeroSection';
import PopularRestaurants from '../components/home/PopularRestaurants';
import FeaturedCollections from '../components/home/category/FeaturedCollections';

const Home = () => {
  const [stats] = useState({
    restaurants: 2500,
    users: 15000,
    reviews: 45000,
    reservations: 100000,
  });

  return (
    <div className="min-h-screen bg-[#FFE4D6]">
      <Header />

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 추천 컬렉션 */}
      <FeaturedCollections />

      {/* 주요 기능 섹션 */}
      <FeaturesSection />

      {/* 인기 맛집 섹션 */}
      <PopularRestaurants />

      {/* 통계 섹션 */}
      <Footer stats={stats} />
    </div>
  );
};

export default Home;
