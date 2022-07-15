import {AuthApi, AccountViewModel, TokenApiModel} from '../api/api';
import ApiSingleton from "../api/ApiSingleton";
import decode from "jwt-decode";

interface TokenPayload {
    _id: string;
    _name: string;
    exp: number;
    iss: string;
    aud: string;
}

export default class AuthService {

    constructor() {
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    async login(user: AccountViewModel) {
        const response = await ApiSingleton.authApi.apiAuthLoginPost(user)
        if (response.token == null) {
            return {
                error: "error",
                isLogin: false
            }
        }
        this.setAccessToken(response.token)
        return {
            error: null,
            isLogin: true
        }
    }

    async register(user: AccountViewModel) {
        const response = await ApiSingleton.authApi.apiAuthRegisterPost(user)
        if (response.token == null) {
            return {
                error: "error",
                isLogin: false
            }
        }
        this.setAccessToken(response.token)
        return {
            error: null,
            isLogin: true
        }
    }

    async refresh() {
        const data = {
            accessToken: this.getAccessToken(),
            refreshToken: this.getRefreshToken(),
        } as TokenApiModel;

        const response = await ApiSingleton.authApi.apiAuthRefreshPost(data);

        if (response.token == null) {
            return {
                error: "error",
                isLogin: false
            }
        }
        this.setAccessToken(response.token)
        return {
            error: null,
            isLogin: true
        }
    }

    isLoggedIn() {
        const token = this.getAccessToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: any) {
        try {
            let decoded = decode(token);
            return (decoded as any).exp + 300 < Date.now() / 1000;
        } catch (err) {
            return false;
        }
    }

    setAccessToken = (idToken: string) => localStorage.setItem("accessToken", idToken);

    setRefreshToken = (idToken: string) => localStorage.setItem("refreshToken", idToken);

    getAccessToken = () => localStorage.getItem("accessToken");

    getRefreshToken = () => localStorage.getItem("refreshToken");

    logout = () => localStorage.removeItem("accessToken");

    getProfile = () => {
        const token = this.getAccessToken();

        return token === null ?  null : decode<TokenPayload>(token);
    };

    getUserId = () => this.getProfile()?._id;

    loggedIn = () => this.getAccessToken() !== null
}