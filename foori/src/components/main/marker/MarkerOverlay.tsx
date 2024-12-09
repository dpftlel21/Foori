import { MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import './Marker.css';
import koreanFood from '../../../assets/images/koreafood.jpg';
import japaneseFood from '../../../assets/images/japanfood.jpg';
import chineseFood from '../../../assets/images/chinesefood.jpg';
import westernFood from '../../../assets/images/pasta.jpg';
import cafe from '../../../assets/images/cafe.jpg';
import tteokbokki from '../../../assets/images/tteok.jpg';
//import etc from '../../../assets/images/etc.jpg';

interface Place {
  id: string;
  place_name: string;
  address_name: string;
  category_name: string;
  x: string;
  y: string;
}

interface MarkerOverlayProps {
  place: Place;
  selectedPlace: string | null;
  onSelect: (id: string) => void;
  onReservation: (id: string) => void;
}

type CategoryType = '한식' | '일식' | '중식' | '양식' | '카페' | '분식' ;

const getCategoryType = (category_name: string): CategoryType => {
  if (category_name.includes('한식')) return '한식';
  if (category_name.includes('일식')) return '일식';
  if (category_name.includes('중식')) return '중식';
  if (category_name.includes('양식')) return '양식';
  if (category_name.includes('카페')) return '카페';
  if (category_name.includes('분식')) return '분식';
};

const categoryImage = {
  '한식': koreanFood,
  '일식': japaneseFood,
  '중식': chineseFood,
  '양식': westernFood,
  '카페': cafe,
  '분식': tteokbokki,
};


const MarkerOverlay = ({
  place,
  selectedPlace,
  onSelect,
  onReservation,
}: MarkerOverlayProps) => {

  const categoryType = getCategoryType(place.category_name);
  const categoryImageSrc = categoryImage[categoryType];

  return (
    <>
      <MapMarker
        key={place.id}
        position={{
          lat: parseFloat(place.y),
          lng: parseFloat(place.x),
        }}
        onClick={() => onSelect(place.id)}
        image={{
          src: categoryImageSrc,
          size: {
            width: 30,
            height: 30,
          },
        }}                                   
      />
      {selectedPlace === place.id && (
        <CustomOverlayMap
          position={{
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
          }}
        >
          <div className="overlay-content">
            <button className="close-btn" onClick={() => onSelect(null)}>
              X
            </button>
            <h3>{place.place_name}</h3>
            <p>{place.address_name}</p>
            <button
              className="reservation-btn"
              onClick={() => onReservation(place.id)}
            >
              예약하기
            </button>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
};

export default MarkerOverlay;
