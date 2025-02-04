import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createReview } from '../../api/endpoints/review';
import { useToast } from '../../contexts/ToastContext';
import ImageUpload from './ImageUpload';
import StarRating from './StarRating';

interface ReviewFormProps {
  bookingId: number;
}

const STYLES = {
  pageContainer: `
    w-full
    h-full
    min-h-[calc(768px-8px)]
    md:min-h-[calc(100vh-5rem)]
    flex
    justify-center
    items-center
    md:bg-gradient-to-b
    md:from-[#ffecd2]
    md:to-[#fcb69f]
    md:p-4
  `,
  formContainer: `
    w-full
    md:max-w-[600px]
    bg-white
    rounded-xl
    md:border-2
    md:border-solid
    md:border-[#EE6677]
    overflow-hidden
  `,
  form: `
    p-8
    space-y-6
  `,
  title: `
    text-2xl
    font-bold
    text-center
    mb-8
    text-gray-800
  `,
  section: `
    space-y-2
  `,
  label: `
    block
    text-gray-700
    text-sm
    font-medium
  `,
  textarea: `
    w-full
    h-32
    p-3
    border
    rounded-lg
    resize-none
    focus:ring-2
    focus:ring-[#FF800B]
    focus:outline-none
    transition-all
  `,
  buttonContainer: `
    flex
    gap-4
    mt-8
  `,
  submitButton: `
    flex-1
    py-3
    bg-[#FF800B]
    text-white
    rounded-lg
    font-medium
    hover:bg-[#fcb69f]
    transition-all
    duration-300
    disabled:opacity-50
    hover:-translate-y-0.5
    hover:shadow-lg
    hover:shadow-[#FF800B]/30
  `,
  cancelButton: `
    flex-1
    py-3
    bg-gray-100
    text-gray-700
    rounded-lg
    font-medium
    hover:bg-gray-200
    transition-all
    duration-300
  `,
  characterCount: `
    text-right
    text-sm
    text-gray-500
  `,
  ratingContainer: `
    flex
    items-center
    gap-3
  `,
  ratingLabel: `
    text-gray-700
    text-sm
    font-medium
  `,
} as const;

const ReviewForm = ({ bookingId }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      await createReview({ rating, content, bookingId, images });
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
    <div className={STYLES.pageContainer}>
      <div className={STYLES.formContainer}>
        <form onSubmit={handleSubmit} className={STYLES.form}>
          <h2 className={STYLES.title}>리뷰 작성</h2>

          <div className={STYLES.section}>
            <div className={STYLES.ratingContainer}>
              <label className={STYLES.ratingLabel}>별점</label>
              <StarRating rating={rating} setRating={setRating} />
              <span className="text-sm text-gray-500">({rating}/5)</span>
            </div>
          </div>

          <div className={STYLES.section}>
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

          <div className={STYLES.section}>
            <label className={STYLES.label}>사진 첨부 (최대 3장)</label>
            <ImageUpload
              images={images}
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
              maxImages={3}
            />
          </div>

          <div className={STYLES.buttonContainer}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={STYLES.cancelButton}
            >
              취소
            </button>
            <button
              type="submit"
              className={STYLES.submitButton}
              disabled={isLoading}
            >
              {isLoading ? '등록 중...' : '리뷰 등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
