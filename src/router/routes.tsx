import AuthRouter from "@/router/auth-router";
import Login from "@/pages/login";
import {useRoutes} from "react-router-dom";

import AppLayout from "@/pages/layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Test1 from "@/pages/option/c-views/test1";
import Test2 from "@/pages/option/c-views/test2";
import {LoginWrapper} from "@/pages/login/styled";
import Role from "@/pages/role";
import User from "@/pages/user";


export function MainRoutes(){
    const _Login = (<AuthRouter children={<Login/>}/>)

    const elements = useRoutes([
        {
            path:'/',
            element:<Login/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/home',
            element:<AuthRouter children={<AppLayout/>}/>,
            children:[
                {
                    path:'index',
                    element:<AuthRouter children={<Home/>}/>
                },

                {
                    path:'about',
                    element:<AuthRouter children={<About/>}/>
                },
                {
                    path:'option',
                    children:[
                        {
                            path:'test1',
                            element:<AuthRouter children={<Test1/>}/>
                        },
                        {
                            path:'test2',
                            element:<AuthRouter children={<Test2/>}/>
                        }
                    ]
                },
                {
                    path:'role',
                    element:<AuthRouter children={<Role/>}/>
                },
                {
                    path:'user',
                    element:<AuthRouter children={<User/>}/>
                }

            ]
        }

    ])

    return elements
}