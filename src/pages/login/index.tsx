import Logo from '@/assets/img/logo.png'


import React, {memo, useEffect, useState} from 'react';
import type {FC, ReactNode} from 'react';
import {Button, Form, Input,message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import {LoginWrapper} from "@/pages/login/styled";
import {useAppDispatch, useAppSelector} from "@/store/redux-hook";
import {selectUserInfo, setUserInfo} from "@/store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {setTabs} from "@/store/slices/tabSlice";
import session from "@/api/sys/session";

interface IProps {
    children?: ReactNode
}

const LoginForm: FC<IProps> = () => {

    const dispatch = useAppDispatch();
    const userInfo = useAppSelector(selectUserInfo)
    const history = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        console.log(userInfo,'2222222222')
        const {token} = userInfo
        if (token){
            localStorage.setItem('token',token)
            history('/home/index')
            return
        }
        dispatch(setTabs(['/']))
    }, [history,dispatch,userInfo]);

    const onFinish = async (values:CommonObjectType<string>)=> {
        setLoading(true)
        const {username,password} = values
        const result = await session.login({username,password})
        setLoading(false)
        if(result){
            dispatch(setUserInfo(result?.data))
            if (result?.data.token){
                localStorage.setItem('token',result?.data.token)
                 history('/home/index')
                console.log('页面跳到到/home/index')
                return;
            }
        }
        message.error('登录失败')


    }

    const FormView = (
        <Form
            initialValues={{username: 'admin', password: '123456'}}
            className='login-form'
            name='login-form'
            onFinish={onFinish}
        >
            <Form.Item name='username'
                       rules={[{required: true, message: '请输入用户名'}]}
            >
                <Input placeholder='用户名' prefix={<UserOutlined/>} size='large'/>
            </Form.Item>

            <Form.Item name='password'
                       rules={[{required: true, message: '请输入密码'}]}
                       extra='用户名：admin 密码：123456'
            >
                <Input.Password placeholder='密码' prefix={<LockOutlined/>} size='large'/>

            </Form.Item>
            <Form.Item>
                <Button className='login-form-button'
                        htmlType='submit'
                        size='large'
                        type='primary'
                        disabled={loading}
                >
                    {
                        loading ? '登录中...' : '登录'
                    }
                </Button>
            </Form.Item>

        </Form>
    )


    return (
        <LoginWrapper  id='login-layout'>
            <div className='login-layout'>
                <div className="logo-box">
                    <img src={Logo} alt="" className='logo'/>
                    <span className='logo-name'>React-Antd Multi-Tab</span>
                </div>

                {FormView}
            </div>
        </LoginWrapper>
    )

};

export default memo(LoginForm)