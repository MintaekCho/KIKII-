import { CommonResponseType } from '@/interface/api/commonType';
import { ls } from '@/utils/stroage';
import axios, {
    AxiosInstance,
    AxiosInterceptorManager,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios';

interface CustomInstance extends AxiosInstance {
    interceptors: {
        request: AxiosInterceptorManager<InternalAxiosRequestConfig<any>>;
        response: AxiosInterceptorManager<AxiosResponse<CommonResponseType<any>>>;
    };
    getUri(config?: AxiosRequestConfig): string;
    request<T>(config: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

const client: CustomInstance = axios.create({
    baseURL: 'http://168.126.147.134:18081',
    withCredentials: true, // cors origin 에러 방지
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

client.interceptors.request.use(
    (config) => {
        const token = ls.get('accessToken');

        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }

        // 토큰이 있을 경우 헤더에 추가
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    (res) => {
        // if (res.data.code === 401 && res.data.message === '기간이 만료된 토큰') {
        //     regenerateAccessTokenRequest().then((response) => {
        //         if (response.code === 200) {
        //             console.log('토큰 재발급 성공');
        //             localStorage.setItem('accessToken', response.data);
        //             res.config.headers['Authorization'] = `Bearer ${response.data}`;
        //             return client(res.config);
        //         }
        //         if (response.code === 401 || response.code === 404) {
        //             logoutRequest().then((res) => {
        //                 console.log('리프레시 토큰이 만료되서 로그아웃 처리되었습니다.');
        //                 localStorage.removeItem('accessToken');
        //             });
        //         }
        //     });
        // }
        return res;
    },
    (error) => {
        // 에러 형식에 따른 분기처리
        console.error(error);
        return Promise.reject(error);
    }
);

export const getApi = async (url: string, params?: any) => {
    const res: AxiosResponse<any> = await client.get(url, params);
    return res.data;
};
export const postApi = async (url: string, data: any, config?: any) => {
    const res: AxiosResponse<any> = await client.post(url, data, config);
    return res.data;
};
export const patchApi = async (url: string, data: any, config?: any) => {
    const res: AxiosResponse<any> = await client.patch(url, data, config);
    return res.data;
};
