import { cookieStorage } from './utils/cookies';

// GET 요청 함수
export const getData = async (
  url: string,
  params?: Record<string, unknown>,
): Promise<any> => {
  try {
    const token = cookieStorage.getToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // URL에 쿼리 파라미터 추가
    const queryString = params
      ? `?${new URLSearchParams(params as Record<string, string>).toString()}`
      : '';

    const response = await fetch(`${url}${queryString}`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('getError:', error);
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred',
    );
  }
};

// POST 요청 함수
export const postData = async (
  url: string,
  data: Record<string, unknown>,
): Promise<any> => {
  try {
    const token = cookieStorage.getToken();
    console.log('token : ', token);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (response.status === 201) {
      const text = await response.text();
      return text ? JSON.parse(text) : {};
    }

    return response.json();
  } catch (error) {
    console.error('postError:', error);
    throw new Error(
      error instanceof Error ? error.message : 'An unknown error occurred',
    );
  }
};
