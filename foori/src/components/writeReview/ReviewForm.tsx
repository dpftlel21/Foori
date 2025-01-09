import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReview } from '../../api/review';
import { useToast } from '../../contexts/ToastContext';
import ImageUpload from './ImageUpload';
import StarRating from './StarRating';

interface ReviewFormProps {
  bookingId: number;
  onCancel: () => void;
}

const ReviewForm = ({ bookingId, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const STYLES = {
    container: 'w-full max-w-[600px] mx-auto p-6 bg-white rounded-lg shadow-md',
    title: 'text-2xl font-bold text-center mb-6',
    form: 'space-y-6',
    label: 'block text-gray-700 text-sm font-medium mb-2',
    textarea: `w-full h-32 p-3 border rounded-lg resize-none
               focus:ring-2 focus:ring-[#FF800B] focus:outline-none`,
    button: `w-full py-3 bg-[#FF800B] text-white rounded-lg
             hover:bg-[#fcb69f] transition-all duration-300
             disabled:opacity-50 hover:-translate-y-0.5
             hover:shadow-lg hover:shadow-[#FF800B]/30`,
    error: 'text-red-500 text-sm mt-1',
    ratingContainer: 'flex items-center gap-2',
    ratingLabel: 'text-gray-700 text-sm font-medium',
    characterCount: 'text-right text-sm text-gray-500',
    imageSection: 'space-y-2',
  } as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 별점 유효성 검사 추가
    if (rating < 1 || rating > 5) {
      showToast('별점은 1점에서 5점 사이여야 합니다.', 'error');
      return;
    }

    if (content.trim() === '') {
      showToast('리뷰 내용을 입력해주세요.', 'error');
      return;
    }

    try {
      setIsLoading(true);
      const reviewData = {
        rating,
        content,
        bookingId,
        images,
      };

      await createReview(reviewData);
      showToast('리뷰가 성공적으로 등록되었습니다.', 'success');
      navigate('/mypage');
    } catch (error) {
      console.error('리뷰 등록 에러:', error);
      showToast('리뷰 등록에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (files: File[]) => {
    if (files.length + images.length > 3) {
      showToast('이미지는 최대 3개까지 업로드할 수 있습니다.', 'error');
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={STYLES.container}>
      <h2 className={STYLES.title}>리뷰 작성</h2>
      <form onSubmit={handleSubmit} className={STYLES.form}>
        {/* 별점 선택 */}
        <div className={STYLES.ratingContainer}>
          <label className={STYLES.ratingLabel}>별점</label>
          <StarRating rating={rating} setRating={setRating} />
          <span className="text-sm text-gray-500">({rating}/5)</span>
        </div>

        {/* 리뷰 내용 */}
        <div>
          <label htmlFor="content" className={STYLES.label}>
            리뷰 내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="리뷰를 작성해주세요"
            className={STYLES.textarea}
            maxLength={500}
          />
          <div className={STYLES.characterCount}>{content.length}/500</div>
        </div>

        {/* 이미지 업로드 */}
        <div className={STYLES.imageSection}>
          <label className={STYLES.label}>사진 첨부 (최대 3장)</label>
          <ImageUpload
            images={images}
            onImageChange={handleImageChange}
            onImageRemove={handleImageRemove}
            maxImages={3}
          />
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className={STYLES.button} disabled={isLoading}>
          {isLoading ? '등록 중...' : '리뷰 등록하기'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
