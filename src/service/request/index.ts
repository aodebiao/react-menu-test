import axios, {AxiosInstance} from "axios";
import {CustomRequestConfig} from "@/service/request/type";


class MoRequest{
    instance:AxiosInstance

    constructor(config:CustomRequestConfig){
        this.instance = axios.create(config)
        this.instance.interceptors.request.use(config => {
            return config
        },error => {
            return error
        })

        this.instance.interceptors.response.use(res =>{
            return res.data
        },err => {
            return err
        })

        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailFn
        )

        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailFn
        )
    }


    request<T=any>(config:CustomRequestConfig<T>){
        if (config.interceptors?.requestSuccessFn){
            config = config.interceptors.requestSuccessFn(config)
        }
        return new Promise<T>((resolve,reject) => {
            this.instance.request<any,T>(config)
                .then(res => {
                    if (config.interceptors?.responseSuccessFn){
                        res = config.interceptors.responseSuccessFn(res)
                    }
                    resolve(res)
                }).catch(err => {
                    reject(err)
            })
        })
    }


    get<T =any>(config:CustomRequestConfig<T>) {
        return this.request({...config,method:"GET"})
    }
    post<T = any>(config:CustomRequestConfig<T>){
        return this.request({...config,method:"POST"})
    }

    delete<T = any>(config:CustomRequestConfig<T>){
        return this.request({...config,method:"DELETE"})
    }

    put<T =any>(config:CustomRequestConfig<T>){
        return this.request({...config,method:"PUT"})
    }

    patch<T =any>(config:CustomRequestConfig<T>){
        return this.request({...config,method:"PATCH"})
    }
}

export default MoRequest