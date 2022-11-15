import { Button, Card, Checkbox, Col, Form, Input, message, PageHeader, Row, Select, Typography } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import Router from 'next/router';
import React, { useState, useEffect } from 'react'
import {
    FcContacts, FcLock
} from "react-icons/fc";
import { apiConfig } from '../../services';
import { Client } from '../../services/services';
const { Option } = Select
function RegisterScreen({ }: props) {
    const { t } = useTranslation('common')
    //handle
    const onFinish = async (values: any) => {
        const service = new Client(apiConfig)
        try {
            const res = await service.registerUsingGET(values.email, values.fullname, values.password, values.role)
            Router.push('/')
            message.success('Register successful!')
        } catch (error: any) {

            message.error(error.response)
        }
    };

    //start
    const listRole = [{ value: "student", label: "Student" }, { value: "teacher", label: "Teacher" }]
    useEffect(() => {

    }, [])
    return (
        <Row justify='center'
            style={{ height: "80vh" }} align='middle'  >
            <Col lg={{ span: 10 }}  >
                <Card >
                    <PageHeader onBack={() => Router.back()} title={t("c.register")}></PageHeader>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true, role: 'student' }}
                        onFinish={onFinish}
                        wrapperCol={{ span: 24 }}
                        labelCol={{ span: 4 }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                        >
                            <Input prefix={<FcContacts className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Fullname"
                            name="fullname"
                            rules={[{ required: true, message: 'Please input your fullname!' }]}
                        >
                            <Input prefix={<FcContacts className="site-form-item-icon" />} placeholder="Fullname" />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<FcLock className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item label="Role" name="role" >
                            <Select>
                                {listRole.map(e => {
                                    return <Option value={e.value}>{e.label}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}
interface props {
}
export default RegisterScreen