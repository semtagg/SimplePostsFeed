import { AuthApi, PostApi} from ".";
import { Configuration } from './configuration';
import AuthService from "../services/AuthService";


class Api {
    readonly authApi: AuthApi;
    readonly postApi: PostApi;
    readonly authService: AuthService;

    constructor(
        authApi: AuthApi,
        postApi: PostApi,
        authService: AuthService
    ) {
        this.authApi = authApi;
        this.postApi = postApi;
        this.authService = authService;
    }
}

const basePath = "http://localhost:5000";
const authService = new AuthService();
let ApiSingleton: Api;

ApiSingleton = new Api(
    new AuthApi({ basePath: basePath, apiKey: () => "Bearer " + authService.getAccessToken() }),
    new PostApi({ basePath: basePath, apiKey: () => "Bearer " + authService.getAccessToken() }),
    authService
);

export default ApiSingleton;