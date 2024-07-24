import MoRequest from "@/service/request";
import {BASE_URL, TIMEOUT} from "@/service/config";
import {AxiosHeaders} from "axios";

const moRequest = new MoRequest({
    baseURL:BASE_URL,
    timeout:TIMEOUT,
    interceptors:{
        requestSuccessFn:(config) => {
            return config
        },
        responseSuccessFn:(res) => {
            return res
        }
    },
    data:undefined,
    headers:new AxiosHeaders()
})

export default moRequest