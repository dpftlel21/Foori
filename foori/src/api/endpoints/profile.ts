import { cookieStorage } from '../utils/cookies';

// 비밀번호 확인
export const passwordCheck = async (password: string) => {
  const token = cookieStorage.getToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACK_URL}/api/users/verify-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    },
  );

  console.log('비밀번호 확인 response', response);

  return response;
};

// 비밀번호 변경
export const passwordChange = async (
  currentPassword: string,
  newPassword: string,
) => {
  const token = cookieStorage.getToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACK_URL}/api/users/password`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    },
  );

  console.log('비밀번호 response', response);

  return response;
};

// 프로필 이미지 업로드
export const profileImageUpload = async (image: File) => {
  //console.log('프로필 이미지 업로드', image);
  const token = cookieStorage.getToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACK_URL}/api/users/profile/upload`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: image,
    },
  );

  console.log('프로필 이미지 response', response);

  return response;
};

// 프로필 이미지 삭제
export const profileImageDelete = async () => {
  const token = cookieStorage.getToken();
  const response = await fetch(
    `${import.meta.env.VITE_BACK_URL}/api/users/profile/delete`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log('프로필 이미지 삭제 response', response);

  return response;
};
