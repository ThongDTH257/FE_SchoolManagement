import { Button, Card, Col, Input, message, PageHeader, Row } from 'antd'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import { apiConfig } from '../../services'
import { Client } from '../../services/services'
function ResetPasswordScreen({ }: props) {
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [newpass, setNewpass] = useState('')

    const [visible, setVisible] = useState(false)
    const [vnewpass, setvnewpass] = useState(false)
    //handle
    const handleGetToken = async () => {
        const service = new Client(apiConfig)
        try {
            await service.genTokenUsingGET(email)
            setVisible(true)
            message.success('Please check your email to receive token!')
        } catch (error: any) {
            message.error(error.response)
        }
    }
    const verifyToken = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.verifyTokenUsingGET(email, token)
            if (res) setvnewpass(true)
            else {
                message.error('Wrong token')
            }
        } catch (error: any) {
            message.error("Wrong token!")
        }
    }
    const handleResetPassword = async () => {

        const service = new Client(apiConfig)
        try {
            const res = await service.resetPasswordUsingPOST(email, newpass, token)
            if (res) {
                message.success("Reset Password successfully!")
                Router.push('/')
            }
        } catch (error: any) {
            message.error("Something wrong!")
        }
    }

    //start
    useEffect(() => {

    }, [])
    return <>
        <Row justify='center'>
            <Col span={10}>
                <PageHeader onBack={() => Router.back()} title="Reset Password"></PageHeader>
                <Card>
                    <Row gutter={24} justify='start' align='middle'>
                        <Col span={2}> Email</Col>
                        <Col span={12}>
                            <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='enter your email' />
                        </Col>
                        <Col>
                            <Button onClick={handleGetToken} disabled={!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)} >Get token</Button>
                        </Col>
                    </Row>
                    {visible && <Row style={{ marginTop: 10 }} gutter={24} justify='start' align='middle'>
                        <Col span={2}> Token</Col>
                        <Col span={12}>
                            <Input value={token} onChange={e => setToken(e.target.value)} placeholder='enter token' />
                        </Col>
                        <Col>
                            <Button type='primary' onClick={verifyToken}>Verify token</Button>
                        </Col>
                        <Col>
                            <Button>Send again</Button>
                        </Col>
                    </Row>}
                    {vnewpass &&
                        <Row style={{ marginTop: 10 }} gutter={24} justify='start' align='middle'>
                            <Col span={2}> New password</Col>
                            <Col span={12}>
                                <Input.Password value={newpass} onChange={e => setNewpass(e.target.value)} placeholder="input new password" />
                            </Col>
                            <Col span={24}>
                                <Button type='primary' onClick={handleResetPassword}>Reset Password</Button>
                            </Col>
                        </Row>
                    }
                </Card>
            </Col>
        </Row>
    </>
}
interface props {
}
export default ResetPasswordScreen