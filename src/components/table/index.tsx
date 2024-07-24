import React, {memo, useMemo} from 'react';
import type {FC, ReactNode} from 'react';
import {Table, TableProps} from "antd";
import {useFetchTableData} from "@/components/table/request";

interface Props {
    dataKey?: string
    fetchMethod: (params: {}) => Promise<any>
    requestParam: { pageSize: number, search: {}[] }
    onParamChange: (data: any) => void

    [key: string]: any
}

interface DataType {
}

const CustomTable: FC<Props> = ({
                              dataKey = 'data',
                              fetchMethod,
                              requestParam,
                              onParamChange,
                              ...resetTableProps
                          }: Props) => {

    const memoParams = useMemo(() => {
        return {...requestParam}
    }, [requestParam])

    const {loading, tableData} = useFetchTableData(fetchMethod, memoParams)
    console.log(tableData[dataKey],'123123')
    // Record<string, FilterValue | null>
    const onTableChange: TableProps<DataType>["onChange"] = (
        {current, pageSize}
        , filters
        , _sorter
        , extra) => {
            let params
        if (extra.action === 'filter'){
            let search:{}[] = []
            for (let key in filters){
                if (filters[key]){
                    search.push({[key]:filters[key]})
                }
            }
            params = {...requestParam,pageNo:current,pageSize,search}
        }else {
            params = {
                ...requestParam,
                pageNo:current,
                pageSize,
            }
        }
        onParamChange(params)
    }


    return (

            <Table
                   onChange={onTableChange}
                   loading={loading}
                   dataSource={tableData[dataKey]}
                   pagination={{
                       total:tableData.total,
                       showSizeChanger:false,
                       current:tableData.pageNo,
                       pageSize:requestParam.pageSize,
                       showTotal: t => <span>共{t}条</span>
                   }}
                   {...resetTableProps}
            />


    );
};

export default memo(CustomTable)