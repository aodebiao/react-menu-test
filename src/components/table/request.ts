import {useEffect, useState} from "react";
import {message} from "antd";

interface TableData {
    [key: string]: any

    data_list: any[]
    total: number
    pageNo: number
}

interface Response {
    code: number,
    msg: string,
    data: any
}

export function useFetchTableData(
    fetchMethod: (params: {}) => Promise<any>
    , parameter
) {
    const [loading, setLoading] = useState<boolean>(false);
    const [tableData, setTableData] = useState<TableData>({
        data_list:[],
        total:0,
        pageNo:1
    });

    async function fetchTableData() {
        setLoading(true);
        try {
            const res: Response = await fetchMethod(parameter)
            console.log(res,'res')
            if (res.code === 0) {
                setTableData({total:res.data.total,pageNo:parameter.pageNo,data_list:res.data.list})
            }else {
                message.error(res.msg)
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTableData()
    }, [parameter]);

    return {loading, tableData}
}