// hooks/useFormValidation.ts
import { useState } from 'react';


// 유효성 검사 Hook
interface ValidationRules {
  email: (value: string) => string;
  password: (value: string) => string;
  confirmPassword: (value: string) => string;
  nickname: (value: string) => string;
  birth: (value: string) => string;
}

export const useFormValidation = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validationRules: ValidationRules = {
    email: (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return '이메일을 입력해주세요.';
      if (!emailRegex.test(value)) return '올바른 이메일 형식이 아닙니다.';
      return '';
    },
    password: (value: string) => {
      if (!value) return '비밀번호를 입력해주세요.';
      if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
      return '';
    },
    confirmPassword: (value: string) => {
      if (!value) return '비밀번호 확인을 입력해주세요.';
      if (value !== formData.password) return '비밀번호가 일치하지 않습니다.';
      return '';
    },
    nickname: (value: string) => {
      if (!value) return '닉네임을 입력해주세요.';
      if (value.length < 2) return '닉네임은 2자 이상이어야 합니다.';
      return '';
    },
    birth: (value: string) => {
      if (!value) return '생년월일을 입력해주세요.';
      return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    
    // name이 validationRules의 키인지 확인
    if (name in validationRules) {
      const error = validationRules[name as keyof ValidationRules](value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    (Object.keys(validationRules) as Array<keyof ValidationRules>).forEach(key => {
      const error = validationRules[key](formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    handleChange,
    errors,
    validateForm
  };
};