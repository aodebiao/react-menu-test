import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
import App from '@/App';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from '@/store/index'
import zhCN from 'antd/es/locale/zh_CN'
import {ConfigProvider,theme,Layout } from "antd";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN} theme={{
            token: {
                colorPrimary: '#00b96b',

            },
            algorithm: theme.darkAlgorithm,
            components:{
                Layout:{
                    colorPrimary: '#00b96b',
                    siderBg:'#141414',
                    triggerBg:'#141414',
                    triggerColor:'#00b96b',
                    lightSiderBg:'#141414',
                    headerBg:'#141414',
                    backgroundColor:'#141414',
                },
                Menu: {
                    colorPrimary: '#00b96b',
                }
            }
        }}>
            <HashRouter>
                <App/>
            </HashRouter>
        </ConfigProvider>

    </Provider>
);

