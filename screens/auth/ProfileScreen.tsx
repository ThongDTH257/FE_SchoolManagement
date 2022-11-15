import { Button, Card, Col, DatePicker, Form, Input, message, PageHeader, Progress, Radio, Row, Upload, UploadFile, UploadProps } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import React, { useState, useEffect } from 'react'
import AuthLayout from '../../modules/auth/AuthLayout'
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
    FcContacts, FcLock
} from "react-icons/fc";
import { apiConfig } from '../../services'
import { Client } from '../../services/services'
import useFormatDate from '../../modules/hooks/useFormatDate'
import { RcFile } from 'antd/lib/upload'
import { v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../../firebase'
import { useForm } from 'antd/lib/form/Form'
import moment from 'moment'
function ProfileScreen({ }: props) {
    const { t } = useTranslation('common')

    const [image, setImage] = useState('');
    const [file, setFile] = useState<any>();
    const [progressPercent, setProgresspercent] = useState<any>(0);
    const [loading, setLoading] = useState(false);

    const [form] = useForm()
    const { dateFormat, datetimeFormat } = useFormatDate()
    //handle

    const onFinish = async (values: any) => {

        const service = new Client(apiConfig)
        try {
            const res = await service.updateInfoUsingPOST(values.address, image, values.dob.format('yyyy-MM-DD'), values.fullname, values.gender, values.phone)
            message.success('Update profile successful!')
        } catch (error: any) {
            message.error(error.response)
        }
    }
    const handleUpload = () => {
        const storageRef = ref(storage, `images/avatar/${file.name + v4()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                alert(error);
            },
            () => {
                message.success('Upload avatar successful!')
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImage(downloadURL)
                });
            }
        );
    }
    //start
    const getInit = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getInfoUsingGET()
            form.setFieldsValue({ ...res, dob: moment(res.dob) })
            setImage(res.avatar)

        } catch (error: any) {
            message.error(error.response)
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const props: UploadProps = {
        onRemove: file => {
            setFile(undefined);
        },
        beforeUpload: file => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('Image must smaller than 2MB!');
                return false
            }
            setFile(file);
            return false;
        },
        file,
    };

    useEffect(() => {
        getInit()
    }, [])
    return <>
        <AuthLayout>
            <Card>
                <PageHeader onBack={() => Router.back()} title={t("c.in4")}></PageHeader>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input disabled prefix={<FcContacts className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        label={t('in4.name')}
                        name="fullname"
                        rules={[{ required: true, message: 'Please input your fullname!' }]}
                    >
                        <Input prefix={<FcContacts className="site-form-item-icon" />} placeholder="Fullname" />
                    </Form.Item>
                    <Form.Item
                        label={t('in4.gen')}
                        name="gender"
                        rules={[{ required: true, message: 'Please choose your gender!' }]}
                    >
                        <Radio.Group>
                            <Radio.Button value={true}>{t('in4.m')}</Radio.Button>
                            <Radio.Button value={false}>{t('in4.f')}</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name='phone'
                        label={t('in4.phone')}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="dob" label={t('in4.dob')}>
                        <DatePicker format={dateFormat} />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label={t('in4.addr')}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
                <Row >
                    <Col span={4}>
                    </Col>
                    <Col>
                        <img width={100} src={image} />
                    </Col>
                </Row>
                <Row >
                    <Col span={4}></Col>
                    <Col>
                        <Progress style={{ width: 140 }} percent={progressPercent} size="small" />

                        <Upload
                            {...props}
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                        >
                            {file === undefined && uploadButton}
                        </Upload>
                        <Button
                            type="primary"
                            onClick={handleUpload}
                            disabled={file == undefined}
                            loading={loading}
                            style={{ marginTop: 16 }}
                        >
                            {loading ? 'Uploading' : 'Start Upload'}
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginTop: 10 }} justify='space-between'>
                    <Col>
                        <Button type="primary" onClick={() => form.submit()} className="login-form-button">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Card>
        </AuthLayout>
    </>
}
interface props {
}
export default ProfileScreen