import {UserInfo} from '@/app_models/user'
import moRequest from "@/service";
import {AxiosError, AxiosHeaders} from "axios";
import {Role} from "@/pages/role";

export default {
    // 获取数据
    login(data: object): Promise<{ data: UserInfo, code: number, msg: string }> {
        return moRequest.post({
            url: '/api/base/login',
            interceptors: {
                requestFailFn: (error: AxiosError) => {
                    return error
                }
            },
            data: {
                "captchaId": "uKCe1aq1y6vKuqAv3MO0",
                ...data
            },
            headers: new AxiosHeaders()
        })
    },

    roleList<T = any>(data: object): Promise<T> {
        return moRequest.post({
            url: '/api/authority/getAuthorityList',
            data: {
                ...data,
            },
            headers: new AxiosHeaders().set('X-Token', localStorage.getItem('token'))
        })
    },

    addRole<T = any>(data: object): Promise<T> {
        return moRequest.post({
            url: '/api/authority/createAuthority',
            data: {
                ...data
            },
            headers: new AxiosHeaders().set('X-Token', localStorage.getItem('token'))
        })
    },
    delRole<T = any>(authorityId: object): Promise<T> {
        return moRequest.post({
            url: '/api/authority/deleteAuthority',
            data: {
                authorityId
            },
            headers: new AxiosHeaders().set('X-Token', localStorage.getItem('token'))
        })

    },
    getUserList<T = any>(data: object): Promise<T> {
        return moRequest.post({
            url: '/api/user/getUserList',
            data: data,
            headers: new AxiosHeaders().set('X-Token', localStorage.getItem('token'))
        })
    }

}
