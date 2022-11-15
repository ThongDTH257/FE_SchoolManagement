import { Button, Col, message, Row } from 'antd'
import React, { useState, useEffect } from 'react'
import useCurrentUserId from '../../../../modules/hooks/useCurrentUserId'
import { apiConfig } from '../../../../services'
import { Client, SubjectDTO, Term } from '../../../../services/services'
function Filter({ setFilter }: props) {
    const userid = useCurrentUserId()

    const [data, setData] = useState([])
    const [subjectId, setSubjectid] = useState<string>()
    const [termId, setTermid] = useState<number>()
    const [lsSubject, setlsSubject] = useState<SubjectDTO[]>([])
    const [lsterm, setlsTerm] = useState<Term[]>([])

    //handle

    const getListTerm = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getListTermUsingGET()
            setlsTerm(res)
        } catch (error: any) {
        }
    }
    const getListSubject = async () => {
        const service = new Client(apiConfig)
        try {
            const res = await service.getListSubjectByTermUsingGET(userid, termId)
            setlsSubject(res)
        } catch (error: any) {
        }
    }
    //start
    useEffect(() => {
        getListTerm()
    }, [])
    useEffect(() => {
        getListSubject()
    }, [userid, termId])

    return <Row justify='space-between'>
        <Col>
            {lsterm.map(e => <Row><Button disabled={e.termId == termId} type='link' onClick={() => {
                setTermid(e.termId)
                setFilter({})
            }}>{e.termName}</Button></Row>)}
        </Col>
        <Col>
            {lsSubject.map(e => <Row><Button disabled={e.subjectId == subjectId} type='link' onClick={() => {
                setSubjectid(e.subjectId)
                setFilter({ class: e.classId, student: userid, subject: e.subjectId })
            }}>{`${e.des}(${e.className})`}</Button></Row>)}
        </Col>
    </Row>
}
interface props {
    setFilter: any
}
export default Filter