import { async } from '@firebase/util'
import { Button, Card, DatePicker, Image, message, PageHeader, Radio, Select, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import AuthLayout from '../../../modules/auth/AuthLayout'
import useCurrentUserId from '../../../modules/hooks/useCurrentUserId'
import useFormatDate from '../../../modules/hooks/useFormatDate'
import { apiConfig } from '../../../services'
import { Client } from '../../../services/services'
function AttendanceScreen({ }: props) {
    const tid = useCurrentUserId()
    const [classId, setclassId] = useState()
    const [subjectId, setsubjectId] = useState()
    const [date, setDate] = useState(moment())

    const [lsclass, setlsclass] = useState([])
    const [lssubject, setlssubject] = useState([])

    const [data, setData] = useState([])

    const { t } = useTranslation('common')
    const { dateFormat, datetimeFormat } = useFormatDate()
    //handle
    const handleSubmit = () => {
        getlsStudent()
    }
    const handleChange = async (status, id) => {
        const service = new Client(apiConfig)
        try {
            await service.updateAttendUsingPOST(id, status)
        } catch (error: any) {
            message.error("Có lỗi xảy ra, vui lòng thử lại")
        }
    }
    //start
    const columns: ColumnsType = [
        { key: 1, title: 'STT', dataIndex: 'index', align: 'center' },
        { key: 2, title: 'Tên đầy đủ', dataIndex: 'fullname', align: 'center' },
        {
            key: 3, title: 'Avatar', dataIndex: 'avatar', align: 'center', render: value => <Image width={100} src={value} />
        },
        {
            key: 5, title: 'Điểm danh', align: 'center', dataIndex: 'status', render: (val, record) => <Radio.Group defaultValue={val} onChange={e => handleChange(e.target.value, record.attendId)}>
                <Radio value={1}>attend</Radio>
                <Radio value={0}>absent</Radio>
            </Radio.Group>
        },
    ]
    const getlsSubject = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getListSubjectUsingGET(tid)
            setlssubject(res)
            setsubjectId(res[0])
        } catch (error: any) {
        }
    }
    const getlsClass = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getListClassUsingGET(subjectId, tid)
            setlsclass(res)
            setclassId(res[0]?.id)
        } catch (error: any) {
        }
    }
    const getlsStudent = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.listAttendStudentUsingGET(classId, date.format('yyyyMMDD'), subjectId, date.format('yyyyMMDD'))
            setData(res.map((e, index) => ({ ...e, index: index + 1 })))
        } catch (error: any) {
        }
    }
    useEffect(() => {
        getlsSubject()
    }, [tid])
    useEffect(() => {
        getlsClass()
    }, [subjectId])
    return <>
        <AuthLayout>
            <PageHeader onBack={() => Router.back()} title="Check Attendance"></PageHeader>
            <Card>
                <Select value={subjectId} onChange={(e: any) => setsubjectId(e)}>
                    {lssubject.map(e => <Select.Option key={e} value={e}>{e}</Select.Option>)}
                </Select>
                <Select value={classId} onChange={(e: any) => setclassId(e)}>
                    {lsclass.map(e => <Select.Option key={e} value={e.id}>{e?.className}</Select.Option>)}
                </Select>
                <DatePicker value={date} format={dateFormat} onChange={e => setDate(e)} />
                <Button type='primary' onClick={handleSubmit}>Search</Button>
                <Table
                style={{marginTop:24}}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                // loading={loading}
                />
            </Card>
        </AuthLayout>
    </>
}

interface props {
}
export default AttendanceScreen