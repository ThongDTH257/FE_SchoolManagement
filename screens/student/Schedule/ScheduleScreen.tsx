import { Badge, Button, Card, Col, message, PageHeader, Row, Select, Table } from 'antd'
import Router from 'next/router'
import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import React, { useState, useEffect, useRef } from 'react'
import useFormatDate from '../../../modules/hooks/useFormatDate'
import AuthLayout from '../../../modules/auth/AuthLayout'
import useTranslation from 'next-translate/useTranslation'
import { getCurrentWeek, getRangeDateByWeek } from '../../../modules/utils/utils'
import Filter from './component/Filter'
import { Client } from '../../../services/services'
import { apiConfig } from '../../../services'
import useCurrentUserId from '../../../modules/hooks/useCurrentUserId'
const defaultFilter = { week: moment().isoWeek(), year: moment().year() }

function ScheduleScreen() {
    const userid = useCurrentUserId()
    const { dateFormat, datetimeFormat } = useFormatDate()
    const { t } = useTranslation('common')

    const [data, setData] = useState<any[]>([])
    const [filter, setFilter] = useState(defaultFilter)
    const range = getRangeDateByWeek(filter.year, filter.week, 'YYYY-MM-DD')

    const [loading, setLoading] = useState(false)
    //handle
    const getData = async () => {
        setLoading(true)
        const service = new Client(apiConfig)
        try {

            const range = getRangeDateByWeek(filter.year, filter.week, 'YYYYMMDD')
            const res = await service.scheduleUsingGET(range[0], range[1], userid)
            setData(res)
        } catch (error) {
            message.error('Không thể lấy dữ liệu từ mấy chủ, vui lòng thử lại !')
        } finally {
            setLoading(false)
        }
    }
    const renderStatusColor = (s: number) => {
        switch (s) {
            case 1:
                return ["Attend", "blue"]
            case 0:
                return ["Absent", "red"]
            default:
                return ["Not Yet", "purple"]
        }
    }
    let i = 1
    const columns: ColumnsType<any> = [
        { key: 1, title: 'Slot', dataIndex: '', align: 'center', render: () => "Slot " + (i++) },
        {
            key: 2, title: <>{t('day.2')}<p>{moment(range[0]).format('DD/MM')}</p></>, dataIndex: 'Monday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">

                        (<span>{e.className}</span>)
                        <Badge dot>
                            <a href="#">Meet</a>
                        </Badge>
                        <p> {e.time}</p>
                    </Card>
                </Badge.Ribbon > : "-"
            },
        },
        {
            key: 3, title: <>{t('day.3')}<p>{moment(range[0]).add(1, 'days').format('DD/MM')}</p></>, dataIndex: 'Tuesday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">
                        <div style={{ textAlign: 'center' }}>
                            (<span>{e.className}</span>)
                            <Badge dot>
                                <a href="#">Meet</a>
                            </Badge>
                            <p> {e.time}</p>
                        </div>
                    </Card>
                </Badge.Ribbon> : "-"
            },
        },
        {
            key: 4, title: <>{t('day.4')}<p>{moment(range[0]).add(2, 'days').format('DD/MM')}</p></>, dataIndex: 'Wednesday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">
                        <div style={{ textAlign: 'center' }}>
                            (<span>{e.className}</span>)
                            <Badge dot>
                                <a href="#">Meet</a>
                            </Badge>
                            <p> {e.time}</p>
                        </div>
                    </Card>
                </Badge.Ribbon> : "-"
            },
        },
        {
            key: 5, title: <>{t('day.5')}<p>{moment(range[0]).add(3, 'days').format('DD/MM')}</p></>, dataIndex: 'Thursday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">
                        <div style={{ textAlign: 'center' }}>
                            (<span>{e.className}</span>)
                            <Badge dot>
                                <a href="#">Meet</a>
                            </Badge>
                            <p> {e.time}</p>
                        </div>
                    </Card>
                </Badge.Ribbon> : "-"
            },
        },
        {
            key: 7, title: <>{t('day.6')}<p>{moment(range[0]).add(4, 'days').format('DD/MM')}</p></>, dataIndex: 'Friday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">
                        <div style={{ textAlign: 'center' }}>
                            (<span>{e.className}</span>)
                            <Badge dot>
                                <a href="#">Meet</a>
                            </Badge>
                            <p> {e.time}</p>
                        </div>
                    </Card>
                </Badge.Ribbon> : "-"
            },
        },
        {
            key: 8, title: <>{t('day.7')}<p>{moment(range[0]).add(5, 'days').format('DD/MM')}</p></>, dataIndex: 'Saturday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">
                        <div style={{ textAlign: 'center' }}>
                            (<span>{e.className}</span>)
                            <Badge dot>
                                <a href="#">Meet</a>
                            </Badge>
                            <p> {e.time}</p>
                        </div>
                    </Card>
                </Badge.Ribbon> : "-"
            },
        },
        {
            key: 9, title: <>{t('day.8')}<p>{moment(range[0]).add(6, 'days').format('DD/MM')}</p></>, dataIndex: 'Sunday', align: 'center', render(e, record, index) {
                const s = renderStatusColor(e?.statusAttend)
                return e ? <Badge.Ribbon text={s[0]} color={s[1]}>
                    <Card title={<div style={{ textAlign: 'left' }}>{e.subjectName}</div>} size="small">
                        <div style={{ textAlign: 'center' }}>
                            (<span>{e.className}</span>)
                            <Badge dot>
                                <a href="#">Meet</a>
                            </Badge>
                            <p> {e.time}</p>
                        </div>
                    </Card>
                </Badge.Ribbon> : "-"
            },
        },
    ]


    //
    useEffect(() => {
        if (userid) getData()
    }, [filter, userid])
    return <AuthLayout>
        <Card>
            <PageHeader title={t('day.tit')} onBack={() => Router.back()} />
            <Filter setFilter={setFilter} />

        </Card>
        <Table
            columns={columns} bordered
            dataSource={data}

            loading={loading}
        />
    </AuthLayout>
}

export default ScheduleScreen