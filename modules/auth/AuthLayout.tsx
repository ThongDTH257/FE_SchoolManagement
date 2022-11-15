import { Avatar, Col, Divider, Dropdown, Image, Layout, Menu, Row } from 'antd'
import useTranslation from 'next-translate/useTranslation';
import Router from 'next/router';
import React, { useState, useEffect, useRef } from 'react'
import { BiAlarm, BiUser, BiTrophy, BiBriefcase, BiMessageSquareDots, BiSupport, BiWallet } from "react-icons/bi";
import { FcPlanner, FcSettings } from "react-icons/fc";
import { apiConfig } from '../../services';
import LanguageBtn from './LanguageBtn';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

function AuthLayout({ children }: props) {
    const [img, setImg] = useState('')
    const [path, setPath] = useState('')

    const [collapsed, setCollapsed] = useState(true)
    const { t } = useTranslation('common')
    //handle

    const handleAuth = () => {
        const user = JSON.parse(localStorage.getItem("user") ?? "")
        setImg(user.img)
        apiConfig.setAuthorization(user.token)
        if (!user) {
            Router.push('/?return=' + Router.asPath)
        }
    }
    const signOut = () => {
        localStorage.removeItem("user")
        Router.push('/')
    }
    //start
    const menu = () => <Menu>
        <Menu.Item onClick={() => Router.push("/auth/change-password")} >
            {t("c.cpass")}
        </Menu.Item>
        <Menu.Item onClick={() => Router.push("/auth/profile")} >
            {t("c.in4")}
        </Menu.Item>
        <Menu.Item onClick={() => signOut()} >
            {t("c.out")}
        </Menu.Item>
    </Menu>
    useEffect(() => {

        handleAuth()
        setPath(Router.asPath)
    }, [])


    return <>
        <Layout hasSider style={{ minHeight: '100vh' }}>
            <Sider style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }} theme='light' collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <Row justify='center'>
                    <Col>
                        <Image style={{ maxWidth: 100 }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/800px-FPT_logo_2010.svg.png' preview={false} />
                    </Col>
                </Row>
                <Divider />
                <Menu mode="inline"
                    theme="light" selectedKeys={[path]} >
                    <SubMenu icon={<BiUser />} title={t('menu.student')}>
                        <Menu.Item onClick={() => Router.push("/student/schedule")} key="/student/schedule" icon={<FcPlanner />} >
                            {t('student.schedule')}
                        </Menu.Item>
                        <Menu.Item onClick={() => Router.push("/student/view-attendance")} key="/teacher/view-attendance" icon={<FcPlanner />} >
                            View Attendance
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu icon={<BiBriefcase />} title={t('menu.teacher')}>
                        <Menu.Item onClick={() => Router.push("/teacher/check-attendance")} key="/teacher/check-attendance" icon={<FcPlanner />} >
                            Check Attendance
                        </Menu.Item>

                    </SubMenu>
                    <SubMenu icon={<BiWallet />} title={t('menu.admin')}>
                        <Menu.Item onClick={() => Router.push("/admin/account-management")} key="/admin/account-management" icon={<FcPlanner />} >
                            Account management
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu icon={<BiSupport />} title={t('menu.contact')}>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }} className="site-layout">
                <Header className="site-layout-background">
                    <Row align='middle' >
                        <Col span={12} >  </Col>
                        <Col span={12} style={{ justifyContent: "flex-end", display: "flex", alignItems: 'center', gap: 10 }}>
                            <LanguageBtn />
                            <Dropdown overlay={menu()} >
                                <Avatar src={img} alt="Avatar" />
                            </Dropdown>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '24px 16px' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 Created by Do Tong Hoang Thong</Footer>
            </Layout>
        </Layout>
    </>
}
interface props {
    children: any
}
export default AuthLayout