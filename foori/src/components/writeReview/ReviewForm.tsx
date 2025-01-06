import { useRef, useState } from 'react';

interface ReviewFormProps {
  bookingId: number;
  onCancel: () => void;
  onSubmit: (review: Review) => void;
}

interface Review {
  rating: number;
  content: string;
  bookingId: number;
  images?: File[];
}

const ReviewForm = ({ bookingId, onCancel, onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit({ rating, content, bookingId, images });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <p className="text-sm text-gray-600 mb-6">
        리뷰 작성 시 매너있는 표현을 사용해주세요. 작성하신 리뷰는 수정이
        불가능합니다.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          별점
        </label>
        <div className="flex">
          {[...Array(5)].map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRating(index + 1)}
              className={`w-8 h-8 ${
                index < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          리뷰 내용
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF800B] focus:border-transparent"
          placeholder="리뷰를 작성해주세요"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          사진 첨부
        </label>
        <div className="flex gap-4 flex-wrap">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`업로드 이미지 ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
              >
                ×
              </button>
            </div>
          ))}
          {images.length < 3 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:border-[#FF800B] hover:text-[#FF800B] transition-colors"
            >
              +
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#FF800B] text-white rounded-md hover:bg-[#fcb69f]"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
