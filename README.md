
# 使用craco
## npm i -D @craco/craco

- 如果您希望在配置文件中进行类型检查和 IDE 自动完成，则可以使用该 CRACO 官方类型：
## npm i -D @craco/types  

## 修改package.json中的启动脚本

```
"scripts": {
-  "start": "react-scripts start"
+  "start": "craco start"
-  "build": "react-scripts build"
+  "build": "craco build"
-  "test": "react-scripts test"
+  "test": "craco test"
}
```

## 初始化tsconfig.json文件
### tsc --init 


## reducer持久化
### npm i redux-persist

## 如果需要在tsx中引入图片，如下
> import Logo from '@/assets/img/logo.png'

需要创建`react-app-env.d.ts`文件，内容如下

```
// react-scripts 文件中声明了各种图片模块
/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv{
        readonly REACT_APP_BASE_URL:string
    }
}

```

或者

```
/// <reference types="react-scripts" />

declare module '*.css'
declare module '*.less'
declare module '*.scss'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'

```


## antd 图标
### npm install @ant-design/icons --save