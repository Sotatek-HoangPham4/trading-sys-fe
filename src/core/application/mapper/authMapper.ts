// src/core/application/mapper/authMapper.ts
export interface Tokens {
  accessToken: string | null; // chỉ lưu memory
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  isHasPassword: Boolean;
  isTwoFactorEnabled: Boolean;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isTokenExpired: boolean;
}

export const mapLoginResponseToAuthState = (res: any): AuthState => {
  return {
    user: {
      id: res.data.id,
      name: res.data.name,
      email: res.data.email,
      avatar: res.data.avatar,
      isHasPassword: res.data.isHasPassword,
      isTwoFactorEnabled: res.data.isTwoFactorEnabled,
    },
    accessToken: res.data.tokens.accessToken,
    isAuthenticated: true,
    isTokenExpired: false,
  };
};
