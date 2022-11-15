import { Card, Col, PageHeader, Row, Table } from 'antd'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import useFormatDate from '../../../modules/hooks/useFormatDate'
import AuthLayout from '../../../modules/auth/AuthLayout'
import Filter from './component/Filter'
import { AttendDTO, Client, ScheduleDTO } from '../../../services/services'
import { apiConfig } from '../../../services'
import moment from 'moment'
function ViewAttendanceScreen({ }: props) {
    const [data, setData] = useState<AttendDTO[]>()
    const [filter, setFilter] = useState(null)
    const { dateFormat, datetimeFormat } = useFormatDate()

    //handle
    const renderStatus = (s: number) => {
        switch (s) {
            case 1:
                return <span style={{ color: 'green' }}>Attend</span>
            case 0:
                return <span style={{ color: 'red' }}>Absent</span>
            default:
                return <span >future</span>;
        }
    }
    //start
    const columns = [
        { key: 1, title: 'STT', dataIndex: 'index', align: 'center' },
        {
            key: 2, title: 'Ngày', dataIndex: 'day', align: 'center', render: (val: any) => <div>
                {moment(val).format(dateFormat)}<b>({moment(val).format('dddd')})</b>
            </div>
        },
        { key: 3, title: 'Slot', dataIndex: 'slot', align: 'center' },
        { key: 3, title: 'Trạng thái', dataIndex: 'status', align: 'center', render: (val: number) => renderStatus(val) },
    ]
    const getListAttend = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getListAttendUsingGET(filter.class, filter.student, filter.subject)
            setData(res.map((e, index) => ({ ...e, index: index + 1 })))
        } catch (error: any) {
        }
    }
    useEffect(() => {
        if (filter) getListAttend()
    }, [filter])
    return <AuthLayout>
        <Card>
            <PageHeader title='' onBack={() => Router.back()} />
            <Row justify='space-between' >
                <Col>
                    <Filter setFilter={setFilter} />
                </Col>
                <Col span={16}>
                    <Table
                        columns={columns} bordered
                        dataSource={data}
                        pagination={false}
                    />
                </Col>
            </Row>
        </Card>
    </AuthLayout>
}
interface props {
}
export default ViewAttendanceScreen