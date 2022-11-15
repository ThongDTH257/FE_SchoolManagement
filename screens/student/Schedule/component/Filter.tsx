import { Button, Col, Row, Select } from 'antd'
import moment from 'moment'
import useTranslation from 'next-translate/useTranslation'
import React, { useState, useEffect } from 'react'
import useFormatDate from '../../../../modules/hooks/useFormatDate'
import { getCurrentWeek, getRangeDateByWeek } from '../../../../modules/utils/utils'
const { Option } = Select

function Filter({ setFilter }: props) {
    const { t } = useTranslation('common')
    const [week, setWeek] = useState(getCurrentWeek())
    const [year, setYear] = useState(moment().year())
    const { dateFormat, datetimeFormat } = useFormatDate()
    //handle
    const onYearChange = (e: any) => {
        setYear(e)
    }
    const onWeekChange = (e: any) => {
        setWeek(e)
    }
    const onSubmit = () => {
        setFilter({ week, year })
    }
    //start
    const renderWeek = () => {
        const ls = []
        const totalWeek = moment(year + '-01-01').isoWeeksInYear()
        let i = 1
        for (i; i < totalWeek; i++) {
            ls.push({ label: getRangeDateByWeek(year, i, dateFormat).join(' to '), value: i })
        }
        return ls
    }
    const renderYear = () => {
        const currentYear = moment().year()
        const ls = []
        for (let i = currentYear - 2; i < currentYear + 3; i++) {
            ls.push({ label: i, value: i })
        }
        return ls
    }

    return <Row justify='start' gutter={16} >
        <Col>
            {t('time.y')}:<Select onChange={onYearChange} value={year} >
                {renderYear().map(e => <Option value={e.value}>{e.label}</Option>)}
            </Select>
        </Col>
        <Col>
            {t('time.time')}:  <Select onChange={onWeekChange} value={week} >
                {renderWeek().map(e => <Option value={e.value}>{e.label}</Option>)}
            </Select>
        </Col>
        <Button onClick={onSubmit} type='primary' >
            {t('c.search')}
        </Button>
    </Row>
}
interface props {
    setFilter: any
}
export default Filter