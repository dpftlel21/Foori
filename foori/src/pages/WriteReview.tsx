import { useParams } from 'react-router-dom';
import { writeReview } from '../api/review';
import ReviewForm from '../components/writeReview/ReviewForm';

interface Review {
  rating: number;
  content: string;
  bookingId: number;
  images?: File[];
}

const WriteReview = () => {
  const Container =
    'w-full h-[91.52dvh] flex justify-center items-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]';
  const ContentContainer =
    'w-[60%] flex flex-col justify-center items-center bg-white rounded-xl shadow-xl border-2 border-solid border-[#EE6677]';

  const IdParam = useParams();
  const bookingId = Number(IdParam.bookingId);

  const handleSubmit = (review: Review) => {
    writeReview(review);
  };

  return (
    <main className={Container}>
      <div className="w-full h-[100%] flex justify-center items-center p-4">
        <div className={ContentContainer}>
          <div className="w-full max-w-3xl p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-[#e38994fb]">
              리뷰 작성
            </h1>
            <ReviewForm
              bookingId={bookingId}
              onCancel={() => window.history.back()}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default WriteReview;
