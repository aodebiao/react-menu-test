import {Button, Flex, Form, Input, message, Modal, Select, Space} from "antd";
import React, {memo, useState} from "react";
import session from "@/api/sys/session";
interface Props  {
    visible: boolean
    rowData?: Record<string, any> | null
    onSuccess: () => void
    onCancel: () => void
}



const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

interface IRole {
    parentId:number
    authorityId:number
    authorityName:string

}

const AddRole: React.FC<Props> = ({
                               visible,
                               onSuccess,
                               onCancel,
                                rowData
                           }:Props) => {


    const [form] = Form.useForm<IRole>();

    const [roleInfo, setRoleInfo] = useState<Record<string, any> | null>(null);

    const onFinish = (values: any) => {
        console.log(values);

    };

    const confirmModal = async () => {
        try {
            const values = await form.validateFields()
            const params = {
                parentId: values.parentId,
                authorityId: Number(values.authorityId),
                authorityName: values.authorityName
            }
            session.addRole(params).then(res => {
                if (res.code === 0){
                    message.info('添加角色成功')
                    onSuccess()
                    return
                }
                message.error(`添加角色失败，原因：${res.msg}`)
            })
        } catch (e) {
            console.error(e)
        }
    }
    return <div>
        <Modal
            title="添加角色信息"
            centered
            open={visible}
            onCancel={onCancel}
            onOk={confirmModal}
            destroyOnClose
        >
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            initialValues={{parentId:0, authorityId:0,authorityName:'',}}
            style={{ maxWidth: 600,textAlign:'left' }}
            clearOnDestroy

        >

            <Form.Item name='parentId' label={'父级角色'} rules={[{required:true,message:''}]}>
                <Select
                    style={{ width: 120 }}
                    disabled
                    options={[{ value: 0, label: '根角色' }]}
                />
            </Form.Item>
            <Form.Item name='authorityId'  label={'角色ID'} rules={[{required:true,pattern:/^[1-9]\d*$/}]}>
                <Input/>
            </Form.Item>
            <Form.Item name='authorityName' label={'角色名称'} rules={[{required:true}]}>
                <Input/>
            </Form.Item>
        </Form>

        </Modal>

    </div>

}

export default memo(AddRole)