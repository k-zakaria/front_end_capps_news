export interface UserLogin {
  accessToken: string,
  username: string,
  email: string,
  cni: string,
  role: string
}

export interface AuthUser {
  username: string,
}

export interface UserResVM {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

// src/app/model/user-form-data.ts
export interface UserFormData {
  username: string;
  email: string;
  password: string;
  role: string;
}
