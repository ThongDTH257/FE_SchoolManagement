import { async } from '@firebase/util';
import { Button, Card, Col, Form, Input, message, PageHeader, Row } from 'antd';
import useTranslation from 'next-translate/useTranslation';
import Router from 'next/router';
import React, { useState, useEffect } from 'react'
import AuthLayout from '../../modules/auth/AuthLayout';
import { apiConfig } from '../../services';
import { Client } from '../../services/services';
function ChangePasswordScreen({ }: props) {
    const { t } = useTranslation('common')
    const [form] = Form.useForm()
    //handle
    const onFinish = async (values: any) => {
        const service = new Client(apiConfig)
        try {
            const res = await service.changePasswordUsingPOST(values.oldpass, values.password)
            message.success('Change password successful!')
        } catch (error: any) {

            message.error(error.response)
        }
    };

    //start

    useEffect(() => {

    }, [])
    return <>
        <AuthLayout>
            <Card>
                <PageHeader onBack={() => Router.back()} title={t("c.cpass")}></PageHeader>

                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form} name="changepass" onFinish={onFinish} scrollToFirstError>
                    <Form.Item
                        name="oldpass"
                        label="Old Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
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
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </AuthLayout>

    </>
}
interface props {
}
export default ChangePasswordScreen