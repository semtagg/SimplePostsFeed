export interface TokenPayload {
  _id: string;
  _name: string;
  exp: number;
  iss: string;
  aud: string;
}

export interface AuthenticatedResponse {
  token?: string;
  refreshToken?: string;
}

export interface AccountViewModel {
  userName?: string;
  password?: string;
}

export interface TokenApiModel {
  accessToken?: string;
  refreshToken?: string;
}

export interface CreatePostViewModel {
  title?: string;
  body?: string;
  nickName?: string;
}

export interface PostViewModel {
  id?: number;
  title?: string;
  body?: string;
  nickName?: string;
}

export interface UpdateViewModel {
  id?: number;
  title?: string;
  body?: string;
}

