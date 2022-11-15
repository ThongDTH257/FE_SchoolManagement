import { Button, Col, DatePicker, Input, Radio, Row, Select } from 'antd';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import React, { useState, useEffect, memo } from 'react'
const { RangePicker } = DatePicker;
const defaultRange = [moment().subtract(2, "days"), moment()]
const formatOut = 'yyyy-MM-DD'
const formatRange = 'DD/MM/yyyy'
const { Option } = Select;


function Filter({ setFilter }: props) {
    const { t } = useTranslation('common')
    const [email, setEmail] = useState()
    const [status, setStatus] = useState(null)
    const [role, setRole] = useState(null)

    const onSubmit = () => {
        const filter = {
            email, role, status
        };
        setFilter(filter);
    };
    const onClear = () => {

        const filter = {
        };
        setFilter(filter);
    }

    useEffect(() => {

    }, [])
    return <Row gutter={8}>
        <Col>
            <Input value={email} placeholder='Email' onChange={((e: any) => setEmail(e.target.value))} />
        </Col>
        <Col>
            <Select style={{ width: 100 }} onChange={e => setRole(e)} value={role} >
                <Option value={null}>All</Option>
                <Option value="student">Student</Option>
                <Option value="teacher">Teacher</Option>
            </Select>
        </Col>
        <Col>
            <Select style={{ width: 100 }} value={status} onChange={e => setStatus(e)} >
                <Option value={null} >All</Option>
                <Option value={0}>Inactive</Option>
                <Option value={1}>Active</Option>
                <Option value={2}>Pending</Option>
            </Select>
        </Col>
        <Col>
            <Button style={{ marginLeft: 16 }} type="primary" onClick={onSubmit}>
                {t("apply")}
            </Button>
        </Col>
        <Col>
            <Button style={{ marginLeft: 16 }} type="primary" onClick={onClear}>
                {t("refresh")}
            </Button>
        </Col>
    </Row>
}
interface props {
    setFilter: any
}
export default memo(Filter)