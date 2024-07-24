import React, {ReactNode} from "react";
import {RouteObject, Route as RRoute, Navigate} from "react-router-dom";
import AuthRouter from "@/router/auth-router";
import Option from "@/pages/option";
import Test1 from "@/pages/option/c-views/test1";
import Test2 from "@/pages/option/c-views/test2";
import About from "@/pages/about";
import Home from "@/pages/home";
import {
    EyeTwoTone,
    HomeOutlined,
    HomeTwoTone,
    LockTwoTone,
    NotificationTwoTone,
    PhoneTwoTone,
    UserOutlined
} from "@ant-design/icons";


const Login = React.lazy(()=>import('@/pages/login/index'))
const AppLayout = React.lazy(()=>import('@/pages/layout/index'))

export const MENU_LIST =  [
    {
      path:'/home/index',
        icon:<HomeTwoTone />,
      name:'首页'
    },
    {
        path:'/home/about',
        icon:<EyeTwoTone/>,
        name:'关于',
    },
    {
      path: '/home/role',
        icon:<UserOutlined />,
        name:'角色列表'
    },

    {
        path:'/home/option',
        name:'option',
        icon: <LockTwoTone />,
        children:[
            {
                path:'/home/option/test1',
                name:'test1',
                icon:<PhoneTwoTone />
            },
            {
                path:'/home/option/test2',
                name:'test2',
                icon:<NotificationTwoTone />
            }
        ]
    },
    {
        path: '/home/user',
        name:'用户',
    }
]


