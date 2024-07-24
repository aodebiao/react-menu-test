import React, {ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {
    AreaChartOutlined,
    DesktopOutlined, EditOutlined,
    FileOutlined, LogoutOutlined, MoonOutlined,
    PieChartOutlined, SunOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Avatar, MenuProps, Popover} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {Link, NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import {MENU_LIST} from "@/router";
import './style.css'
import {useAppDispatch, useAppSelector} from "@/store/redux-hook";
import {selectUserInfo, setUserInfo, userInfo as EmptyUser} from "@/store/slices/userSlice";

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface Menu {
    key: string,
    icon?: ReactNode
    label: ReactNode,
    children?: Menu[]
}


const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const useInfo = useAppSelector(selectUserInfo);
    const [siderSelected, setSiderSelected] = useState('')
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [dark, setDark] = useState(false)
    const items: MenuProps['items'] = useMemo(() => {
        return MENU_LIST.map(item => {
            const data: Menu = {
                key: item.path || item.name,
                icon: item.icon,
                label: <NavLink to={item.path}>{item.name}</NavLink>
            }

            if (Array.isArray(item.children)) {
                data.children = item.children.map(submenu => {
                    return {
                        key: submenu.path,
                        label: <NavLink to={submenu.path}>{submenu.name}</NavLink>
                    }
                })
            }
            return data
        })
    }, MENU_LIST)
    const location = useLocation()


    useEffect(() => {
        console.log(location.pathname,'pathname')
        const pathname = location.pathname
        for (let i = 0; i < MENU_LIST.length;i++){
            if (Array.isArray(MENU_LIST[i].children)){
                const findIndex = MENU_LIST[i].children?.findIndex(menu => menu.path === pathname)
                if (findIndex !== -1){
                    setSiderSelected(pathname)
                    return
                }
            }
            if (MENU_LIST[i].path.indexOf(pathname) !== -1){
                setSiderSelected(MENU_LIST[i].path)
                break
            }


        }

    }, [location.pathname]);

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
    console.log('items', items)

    const handleClick = useCallback((item) => {
        navigate(item.key)
    }, [])

    const logoOut = async () => {
        localStorage.removeItem('token')
        dispatch(setUserInfo(EmptyUser))
        navigate('/login')
    }

    const popoverContent = (
        <div className='logo-out' onClick={logoOut}>
            <LogoutOutlined/>
            退出登录
        </div>
    )

    const handleThemeMode = () =>{
        setDark(!dark)
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu selectedKeys={[siderSelected]} onClick={handleClick} mode="inline" items={items}/>
            </Sider>
            <Layout>


                <Header style={{padding: 0, background: colorBgContainer, display: 'flex', justifyContent: "flex-end"}}>

                    <div className={'theme-mode'} onClick={handleThemeMode}>
                        {
                            dark ?  <MoonOutlined style={{width:'30px',alignItems:'center',justifyContent:'center',fontSize:'20px',height:'30px',display:'inline-block'}}/> :
                                <SunOutlined style={{width:'30px',alignItems:'center',justifyContent:'center',fontSize:'20px',height:'30px',display:'inline-block'}}/>
                        }

                    </div>
                    <Popover content={popoverContent} placement="bottomRight">
                        <div className={'avatar'}>
                            <Avatar shape='circle' alt={'test'} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"/>
                        </div>
                    </Popover>

                </Header>


                <Content style={{margin: '0 16px'}}>
                    <Breadcrumb items={[{title: 'User'}, {title: 'Bill'}]}/>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>


                <Footer style={{textAlign: 'center'}}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;