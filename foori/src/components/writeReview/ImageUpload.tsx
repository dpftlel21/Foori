import { useRef } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

interface ImageUploadProps {
  images: File[];
  onImageChange: (files: File[]) => void;
  onImageRemove: (index: number) => void;
  maxImages: number;
}

const ImageUpload = ({
  images,
  onImageChange,
  onImageRemove,
  maxImages,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const STYLES = {
    container: 'space-y-4',
    imageList: 'flex gap-4 flex-wrap',
    imageContainer: 'relative',
    image: 'w-24 h-24 object-cover rounded-lg',
    removeButton: `absolute -top-2 -right-2 bg-red-500 text-white rounded-full
                  p-1 cursor-pointer hover:bg-red-600 transition-colors`,
    uploadButton: `w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg
                  flex items-center justify-center cursor-pointer
                  hover:border-[#FF800B] transition-colors`,
  } as const;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      onImageChange(newFiles);
      // 파일 선택 초기화
      e.target.value = '';
    }
  };

  return (
    <div className={STYLES.container}>
      <div className={STYLES.imageList}>
        {images.map((image, index) => (
          <div key={index} className={STYLES.imageContainer}>
            <img
              src={URL.createObjectURL(image)}
              alt={`Preview ${index + 1}`}
              className={STYLES.image}
            />
            <button
              type="button"
              onClick={() => onImageRemove(index)}
              className={STYLES.removeButton}
            >
              <FiX />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={handleClick}
            className={STYLES.uploadButton}
          >
            <FiPlus size={24} className="text-gray-400" />
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
