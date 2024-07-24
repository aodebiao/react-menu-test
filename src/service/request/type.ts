import {AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig} from "axios";

export interface CustomInterceptor<T = AxiosResponse>{
    requestSuccessFn?:(config:InternalAxiosRequestConfig) =>InternalAxiosRequestConfig
    requestFailFn?:(err:any)=>any
    responseSuccessFn?:(res:T) => T
    responseFailFn?:(err:any)=>any
}


export interface CustomRequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
    interceptors?:CustomInterceptor<T>
}

