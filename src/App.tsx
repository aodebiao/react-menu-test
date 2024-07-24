import {HashRouter, Route, Routes, useRoutes} from "react-router-dom";
import Login from "@/pages/login";
import Layout from "@/pages/layout";
import AuthRouter from "@/router/auth-router";
import {MainRoutes} from "@/router/routes";


function App() {
    return <>
        <MainRoutes/>
    </>


}

export default App;
