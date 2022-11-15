import { Col, Image, Row } from 'antd'
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation'

import React, { useState, useEffect } from 'react'
function LanguageBtn({ }: props) {
    const { t, lang } = useTranslation("common");


    const [language, setlanguage] = useState(lang);
    const router = useRouter();
    const { pathname, asPath, query } = router;

    const handleChangeLanguage = (value: string) => {
        setlanguage(value);
        router.push({ pathname, query }, asPath, { locale: value });
    };



    return <>
        <Row justify='start'>
            <Col >
                <Image onClick={() => handleChangeLanguage('en')} style={{
                    opacity: language === "en" ? 1 : 0.6, borderRadius: "50%", maxWidth: 40
                }} src='/en.jpg' alt="en" preview={false} />
                <Image onClick={() => handleChangeLanguage('vi')} style={{
                    opacity: language === "vi" ? 1 : 0.6, borderRadius: "50%", maxWidth: 40
                }} src='/vn.jpg' alt="vn" preview={false} />
            </Col>
        </Row>
    </>
}
interface props {
}
export default LanguageBtn