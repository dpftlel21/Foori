import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { useLogin } from '../../hooks/auth/useAuth';

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  // Input 변경 핸들러
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 로그인 버튼 클릭 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await loginMutation.mutateAsync(formData);
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      showToast('로그인에 실패했습니다.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    togglePassword: () => setShowPassword((prev) => !prev),
  };
};
