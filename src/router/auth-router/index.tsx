import {Navigate, RouterProps} from "react-router-dom";
import {memo} from "react";

const getToken = () => {
    return localStorage.getItem("token")
}


// 创建高阶组件

const AuthRouter = ({children}) => {
    const token = getToken()
    if (token) {
        return <>
            {children}
        </>
    }
    return <Navigate to={'/login'}></Navigate>

}

export default memo(AuthRouter)