import { useState } from 'react';
import { Link } from 'react-router-dom';
import Phone from '../../../assets/images/lock.png';
import User from '../../../assets/images/person.png';
import { useToast } from '../../../contexts/ToastContext';
import { useFindEmail } from '../../../hooks/auth/useAuth';
import { useFormValidation } from '../../../hooks/form/useFormValidation';
import { COMMON_INPUT_STYLES } from '../../../styles/commonStyles';
import Logo from '../../common/Logo';

const FindIDBox = () => {
  const [showResult, setShowResult] = useState(false);
  const { showToast } = useToast();

  const { formData, errors, handleChange, validateForm } = useFormValidation(
    {
      name: '',
      phoneNumber: '',
    },
    'findAccount',
  );

  const { data, isLoading, refetch } = useFindEmail(
    formData.name,
    formData.phoneNumber,
    { enabled: false },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await refetch();
        if (result.data) {
          setShowResult(true);
        }
      } catch (error) {
        showToast('이메일 찾기에 실패했습니다.', 'error');
      }
    }
  };

  if (showResult && data) {
    return (
      <div className={COMMON_INPUT_STYLES.formContainer}>
        <Logo />
        <div className={COMMON_INPUT_STYLES.form}>
          <h2 className={COMMON_INPUT_STYLES.title}>이메일 찾기 결과</h2>
          <div className={COMMON_INPUT_STYLES.resultBox}>
            <p className={COMMON_INPUT_STYLES.resultText}>
              {formData.name}님의 이메일 주소는
            </p>
            <p className={COMMON_INPUT_STYLES.resultHighlight}>{data}</p>
            <p className={COMMON_INPUT_STYLES.resultText}>입니다.</p>
          </div>
          <Link to="/login" className={COMMON_INPUT_STYLES.linkButton}>
            로그인하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={COMMON_INPUT_STYLES.formContainer}>
      <Logo />
      <form onSubmit={handleSubmit} className={COMMON_INPUT_STYLES.form}>
        <h2 className={COMMON_INPUT_STYLES.title}>이메일 찾기</h2>
        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img
              src={User}
              alt="user"
              className={COMMON_INPUT_STYLES.labelIcon}
            />
            <label className={COMMON_INPUT_STYLES.label}>이름</label>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            className={COMMON_INPUT_STYLES.input(!!errors.name)}
            required
          />
          {errors.name && (
            <p className={COMMON_INPUT_STYLES.errorText}>{errors.name}</p>
          )}
        </div>

        <div className={COMMON_INPUT_STYLES.fieldContainer}>
          <div className={COMMON_INPUT_STYLES.labelContainer}>
            <img
              src={Phone}
              alt="phone"
              className={COMMON_INPUT_STYLES.labelIcon}
            />
            <label className={COMMON_INPUT_STYLES.label}>휴대폰 번호</label>
          </div>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="휴대폰 번호를 입력하세요"
            className={COMMON_INPUT_STYLES.input(!!errors.phoneNumber)}
            required
          />
          {errors.phoneNumber && (
            <p className={COMMON_INPUT_STYLES.errorText}>
              {errors.phoneNumber}
            </p>
          )}
        </div>

        <button
          type="submit"
          className={COMMON_INPUT_STYLES.submitButton(
            isLoading || Object.keys(errors).length > 0,
          )}
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? '찾는 중...' : '이메일 찾기'}
        </button>
      </form>
    </div>
  );
};

export default FindIDBox;
