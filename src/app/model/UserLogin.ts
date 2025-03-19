  export interface UserLogin {
    accessToken: string,
    refreshToken: string,
  }

  export interface AuthUser {
    id: number,
    username: string,
    role: string,
    permission: string[],
  }

export interface UserResVM {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: string;
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

// src/app/model/user-role-update.ts
export interface UserRoleUpdate {
  role: string;
}
