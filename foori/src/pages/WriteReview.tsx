import { useParams } from 'react-router-dom';
import ReviewForm from '../components/writeReview/ReviewForm';

const WriteReview = () => {
  const { bookingId } = useParams();
  return <ReviewForm bookingId={Number(bookingId)} />;
};

export default WriteReview;
