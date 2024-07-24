import React, {memo, useMemo, useState} from "react";
import CustomTable from "@/components/table";
import session from "@/api/sys/session";
import {ColumnsType} from "antd/es/table";
import {Avatar} from "antd";

interface DataType {
    id: string
    headerImg: string
    userName:string
    nickName:string
    authorityId:string
    phone:string
    email:string
}

const columns:ColumnsType<DataType> = [
    {
        title:"头像",
        dataIndex:"headerImg",
        key:"headerImg",
        align:'center' as const,
        render:(text,record) => {
            return <Avatar src={text}/>
        }
    },
    {
        title:"用户id",
        dataIndex:"ID",
        key:"ID",
        align:'center' as const,
    },
    {
        title:"用户名",
        dataIndex:"userName",
        key:"userName",
        align:'center' as const,
    },
    {
        title:"用户昵称",
        dataIndex:"nickName",
        key:"nickName",
        align:'center' as const,
    },
    {
        title:"电话",
        dataIndex:"phone",
        key:"phone",
        align:'center' as const,
    },
    {
        title:"邮箱",
        dataIndex:"email",
        key:"email",
        align:'center' as const,
    }
]
const User:React.FC = () => {

    const [requestParam, setRequestParam] = useState({
        page:1,
        pageSize:10,
        search:[]
    });
    const memoParameter = useMemo(()=>({...requestParam}),[requestParam])

    return <div>
        <CustomTable
            fetchMethod={session.getUserList}
            dataKey={"data_list"}
            requestParam={memoParameter}
            onParamChange={(data:any) => {setRequestParam({...requestParam,...data})}}
            columns={columns}
            rowKey= {item => item.ID}
        />
    </div>
}

export default memo(User)