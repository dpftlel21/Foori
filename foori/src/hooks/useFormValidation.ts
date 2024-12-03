// hooks/useFormValidation.ts
import { useState } from 'react';

interface ValidationRules {
  email: (value: string) => string;
  password: (value: string) => string;
  confirmPassword?: (value: string) => string;
  nickname?: (value: string) => string;
  birth?: (value: string) => string;
  phone?: (value: string) => string;
}

interface FormData {
  [key: string]: string;
}

export const useFormValidation = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // 휴대폰 번호 - 자동생성
  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  // 유효성 검사
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
    },
    phone: (value: string) => {
      if (!value) return '휴대폰 번호를 입력해주세요.';
      const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
      if (!phoneRegex.test(value.replace(/-/g, ''))) return '올바른 휴대폰 번호가 아닙니다.';
      return '';
    }
  };

  // 입력 값 변경 (input onChange 이벤트)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 휴대폰 번호 형식 변경
    const formattedValue = name === 'phone' ? formatPhoneNumber(value) : value;
    
    setFormData(prev => ({ ...prev, [name]: formattedValue }));
    
    if (name in validationRules) {
      const error = validationRules[name as keyof ValidationRules](formattedValue);
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