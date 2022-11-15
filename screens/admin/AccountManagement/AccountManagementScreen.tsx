import { PageHeader, Radio, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import AuthLayout from '../../../modules/auth/AuthLayout'
import useFormatDate from '../../../modules/hooks/useFormatDate'
import { apiConfig } from '../../../services'
import { Client } from '../../../services/services'
import Filter from './component/Filter'
function AccountManagementScreen({ }: props) {
    const [data, setData] = useState([])
    const [filter, setFilter] = useState({})
    const { dateFormat, datetimeFormat } = useFormatDate()
    //handle
    const handleChange = async (status, id) => {
        const service = new Client(apiConfig)
        try {
            const res = await service.updateStatusUsingPOST(id, status)
        } catch (error: any) {
        }
    }

    //start
    const columns: ColumnsType<any> = [
        { key: 1, title: 'STT', dataIndex: 'index', align: 'center' },
        { key: 2, title: 'Email', dataIndex: 'email', align: 'center' },
        { key: 2, title: 'Fullname', dataIndex: 'fullname', align: 'center' },
        { key: 3, title: 'Role', dataIndex: 'role', align: 'center' },
        {
            key: 4, title: 'Action', dataIndex: 'status', align: 'center', render(val, record) {
                return <><Radio.Group onChange={e => handleChange(e.target.value, record.id)} defaultValue={val}>
                    <Radio.Button value={2}>Pending</Radio.Button>
                    <Radio.Button value={0}>Inactive</Radio.Button>
                    <Radio.Button value={1}>Active</Radio.Button>
                </Radio.Group></>
            }
        },
    ]
    const getlsAccount = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getListAccountUsingGET(filter?.email, filter?.role, filter?.status)
            setData(res.map((e, index) => ({ ...e, index: index + 1 })))
        } catch (error: any) {
        }
    }
    useEffect(() => {
        getlsAccount()
    }, [filter])
    return <>
        <AuthLayout>
            <PageHeader onBack={() => Router.back()} title="Account Management"></PageHeader>
            <Filter setFilter={setFilter} />
            <Table dataSource={data} columns={columns} />
        </AuthLayout>
    </>
}
interface props {
}
export default AccountManagementScreen