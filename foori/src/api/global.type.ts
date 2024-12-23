export type SignUpData = {
    email: string;
    password: string;
    name: string;
    birth: string;
    phoneNumber: string;
};

export type SignUpResponse = {
    accessToken: string;
    message?: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
    message?: string;
    statusCode?: number;
    status?: number;
};

export type OauthResponse = {
  success: boolean;
  accessToken: string;
  user?: any;
  message?: string;
};

export type ActionType = 'login' | 'connect';