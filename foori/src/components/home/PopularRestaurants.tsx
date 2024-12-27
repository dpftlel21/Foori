import { FaStar } from 'react-icons/fa';

const popularRestaurants = [
  {
    id: 1,
    name: '스시 오마카세',
    image: 'https://example.com/sushi.jpg',
    rating: 4.8,
    cuisine: '일식',
    priceRange: '₩₩₩',
  },
  {
    id: 2,
    name: '이탈리안 비스트로',
    image: 'https://example.com/italian.jpg',
    rating: 4.6,
    cuisine: '양식',
    priceRange: '₩₩',
  },
  {
    id: 3,
    name: '서울 한식당',
    image: 'https://example.com/korean.jpg',
    rating: 4.7,
    cuisine: '한식',
    priceRange: '₩₩',
  },
];

const PopularRestaurants = () => {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
        인기 맛집
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularRestaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all"
          >
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 text-gray-800">
                {restaurant.name}
              </h3>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="flex items-center text-[#FF6B3D]">
                  <FaStar /> {restaurant.rating}
                </span>
                <span>•</span>
                <span>{restaurant.cuisine}</span>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularRestaurants;
