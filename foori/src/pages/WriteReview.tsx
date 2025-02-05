import { useParams } from 'react-router-dom';
import ReviewForm from '../components/writeReview/ReviewForm';

const WriteReview = () => {
  const IdParam = useParams();
  const bookingId = Number(IdParam.bookingId);

  return <ReviewForm bookingId={bookingId} />;
};
export default WriteReview;
