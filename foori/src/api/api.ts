import { cookieStorage } from './utils/cookies';

// GET 요청 함수
export const getData = async (url: string) => {
  const token = cookieStorage.getToken();
  const fullUrl = `${import.meta.env.VITE_BACK_URL}/${url}`;
  const response = await fetch(fullUrl, {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// POST 요청 함수
export const postData = async <T>(url: string, data: T): Promise<any> => {
  try {
    const token = cookieStorage.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const fullUrl = `${import.meta.env.VITE_BACK_URL}/${url}`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    console.log('POST 호출 후 응답', response);

    if (response.status === 201) {
      const text = await response.text();
      return text ? JSON.parse(text) : response;
    }

    return response.json();
  } catch (error) {
    console.error('postError:', error);
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred',
    );
  }
};
