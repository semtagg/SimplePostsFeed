import decode from "jwt-decode";
import axios from "axios";
import {AccountViewModel, AuthenticatedResponse, TokenApiModel, TokenPayload} from "../models/Models";

const basePath = "http://localhost:5000";

const login = async (user: AccountViewModel) => {
  const response = await axios.post<AuthenticatedResponse>(basePath + "/api/Auth/login", user);

  if (response.data.token == null || response.data.refreshToken == null) {
    return {
      error: "error",
      isLogin: false
    }
  }

  setAccessToken(response.data.token);
  setRefreshToken(response.data.refreshToken);

  return {
    error: null,
    isLogin: true
  }
}

const register = async (user: AccountViewModel) => {
  const response = await axios.post<AuthenticatedResponse>(basePath + "/api/Auth/register", user);

  if (response.data.token == null || response.data.refreshToken == null) {
    return {
      error: "error",
      isLogin: false
    }
  }

  setAccessToken(response.data.token);
  setRefreshToken(response.data.refreshToken);

  return {
    error: null,
    isLogin: true
  }
}

const refresh = async () => {
  const data = {
    accessToken: getAccessToken(),
    refreshToken: getRefreshToken(),
  } as TokenApiModel;

  const response = await axios.post<AuthenticatedResponse>(basePath + "/api/Auth/refresh", data);

  if (response.data.token == null) {
    return {
      error: "error",
      isLogin: false
    }
  }
  setAccessToken(response.data.token)
  return {
    error: null,
    isLogin: true
  }
}

const revoke = async () => {
  await axios.post(
    basePath + "/api/Auth/revoke",
    {
      headers: {Authorization: `Bearer ${AuthService.getAccessToken()}`}
    }
  );
}

const isLoggedIn = async () => {
  const token = getAccessToken();
  return !!token && !await isTokenExpired(token);
}

const isTokenExpired = async (token: any) => {
  try {
    let decoded = decode(token);
    return (decoded as any).exp + 300 < Date.now() / 1000;
  } catch (err) {
    return false;
  }
}

const setAccessToken = (idToken: string) => localStorage.setItem("accessToken", idToken);

const setRefreshToken = (idToken: string) => localStorage.setItem("refreshToken", idToken);

const getAccessToken = () => localStorage.getItem("accessToken");

const getRefreshToken = () => localStorage.getItem("refreshToken");

const logout = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  await revoke();
};

const getProfile = () => {
  const token = getAccessToken();

  return token === null ? null : decode<TokenPayload>(token);
};

const getUserId = () => getProfile()?._id;

const getUserName = () => getProfile()?._name;

const loggedIn = () => getAccessToken() !== null

const AuthService = {
  login,
  register,
  logout,
  getProfile,
  isLoggedIn,
  getUserName,
  getAccessToken
};

export default AuthService;