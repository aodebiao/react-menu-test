import React, {memo, useCallback, useEffect, useState} from "react"
import session from "@/api/sys/session";
import {Button, message, PaginationProps, Popconfirm, Space, Table, Tooltip} from "antd";
import {DeleteOutlined, UserAddOutlined} from "@ant-design/icons";
import AddRole from "@/pages/role/addRole";
import {current} from "@reduxjs/toolkit";

export interface Role {
    authorityName: string,
    authorityId: number,
    createdAt: string,
    parentId?: number
}

interface IState {

}


interface SearchParams {
    pageSize: number
    page: number
}


const initialSearchParams: SearchParams = {
    pageSize: 10,
    page: 1
}
const Role: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddRoleModal, setShowAddRoleModal] = useState(false)
    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageNo: 1,
        total: 0,
        showSizeChanger: true,
        showTotal: total => `共有${total}条数据`,
        pageSizeOptions: ['5', '10', '20', '30', '50'],
    })
    useEffect(() => {
        setLoading(true)
        getRoles(initialSearchParams)

    }, []);


    async function getRoles(searchParams: SearchParams = {page: 1, pageSize: 10}) {
        const res = await session.roleList(searchParams);
        const roles = res?.data.list?.map(item => {
            return {
                authorityId: item.authorityId,
                authorityName: item.authorityName,
                createdAt: item.CreatedAt,
            };
        });
        setRoles(roles)
        setPagination({...pagination,total: res?.data.total,pageNo: searchParams.page,pageSize: searchParams.pageSize})
        setLoading(false)
    }


    const openModal = () => {
        setShowAddRoleModal(!showAddRoleModal)
    }
    const handleSuccess = useCallback(async () => {
        setShowAddRoleModal(false)
        await getRoles(initialSearchParams)
    }, [showAddRoleModal, roles])
    const handleCancel = () => {
        setShowAddRoleModal(false)
    }


    const delRole = async (row: any) => {
        console.log(row, 'row')
        session.delRole(row.authorityId).then(res => {
            if (res.code === 0) {
                message.info(`${res.msg}`)
                getRoles(initialSearchParams)

            } else {
                message.error(`${res.msg}`)
            }
        })

    }


    const reload = async (pagination: any, filters: any, sorter: any) => {
        console.log(pagination,filters,sorter)
        await getRoles({pageSize:pagination.pageSize,page:pagination.current})

    }


    const columns = [
        {
            title: '角色ID',
            dataIndex: 'authorityId',
            key: 'authorityId',
            align: 'center' as const,

        },
        {
            title: '角色名称',
            dataIndex: 'authorityName',
            key: 'authorityName',
            align: 'center' as const,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center' as const,

        },
        {
            title: '操作',
            dataIndex: 'op',
            key: 'operation',
            align: 'center' as const,

            render: (text, record) => (
                <Space size={4}>
                    <Popconfirm
                        title="删除角色"
                        description={`你确定要永久的删除${record.authorityName}角色`}
                        onConfirm={(row) => delRole(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    return <div>
        {
            <div>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={openModal} loading={loading} icon={<UserAddOutlined/>}>
                        新增角色
                    </Button>
                    <span style={{marginLeft: 8}}>
        </span>
                </div>
                <div>

                </div>
                <Table
                    rowKey={(item) => item.authorityId}
                    pagination={{...pagination, position: ['bottomRight']}}
                    onChange={reload}
                    loading={loading} dataSource={roles} columns={columns}/>
            </div>

        }

        <AddRole visible={showAddRoleModal}
                 onSuccess={handleSuccess}
                 onCancel={handleCancel}
                 rowData={null}
        />

    </div>
}

export default memo(Role)