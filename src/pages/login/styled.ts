import styled from "styled-components";


export const LoginWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    width:400px;
    .login-layout {
        position: relative;
        flex-direction: column;
        overflow: hidden;
        min-width: 380px;
        width: 400px;
        height: 600px;

        > .login-form {
            width: 368px;
            margin: 0 auto;
        }
        .logo-box {
            margin-top: 100px;
        }
    }

    .logo {
        display: inline-block;
        height: 55px;
        width: 55px;
        margin-right: 8px;
        margin-bottom: 30px;
    }

    .logo-name {
        position: relative;
        margin-bottom: 10px;
        color: #999;
        font-weight: 600;
        font-size: 26px;
    }
    
    .login-form-button{
        width: 100%;
    }
    

`