import React, { useState } from 'react'
import { Container, Title, FlexDiv, Card, CardTitle, Status, statuscolors, themeColor } from '../Common/Styles/StyledComponents'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import { statusColor } from '../Common/Functions/helperFunctions'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, useHistory } from 'react-router-dom'
import { changeStatus } from '../Actions/CandidateActions'
toast.configure()



function ApplicantDetailsPage() {
    const dispatch = useDispatch()

    const [isStatusChanged, setIsStatusChanged] = useState(false)
    const history = useHistory()
    const { candidate } = useSelector(state => state.candidateData)
    const { job } = useSelector(state => state.jobsData)

    console.log(candidate)
    console.log(job)

    const changeStatusHandler = async (status) => {
        const URL = `${API_URI}status/${candidate && candidate._id}?status=${status}`
        try {
            await axios.patch(URL)
            setIsStatusChanged(true)
            dispatch(changeStatus(status))
            toast.success('Status Updated', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (err) {
            toast.error('Error in status updation', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }


    const downloadHandler = async () => {
        const URL = `${API_URI}download/${candidate && candidate._id}`
        console.log(URL)
        try {
            const data = await axios.get(URL)
            const blob = await data.blob()
            const URL = window.URL.createObjectURL(blob)

        } catch (err) {

        }

    }


    //"5f1ab1ed439e2d0017643a58"
    return (
        <Container>
            <FlexDiv style={{ justifyContent: 'flex-start' }}>
                <Title style={{ marginRight: '10px' }}>{candidate && candidate.name}</Title>
                <Status {...statusColor(candidate && candidate.jobs[0].status)}>
                    {candidate && candidate.jobs[0].status}
                </Status>
            </FlexDiv>

            <ControlCard>
                <CardTitle>Controls</CardTitle>
                <div>
                    {candidate && candidate.jobs[0].status !== 'Rejected' && <Btn color={statuscolors.failed} onClick={() => changeStatusHandler(3)}>Reject</Btn>}
                    {candidate && candidate.jobs[0].status !== 'Selected' && <Btn color={statuscolors.success} onClick={() => changeStatusHandler(2)}>Select</Btn>}
                    {((candidate && candidate.jobs[0].status !== 'Called For Interview') && (candidate && candidate.jobs[0].status !== 'Selected')) ? <Btn color={statuscolors.review} onClick={() => changeStatusHandler(1)}>Call for interview</Btn> : null}

                </div>

            </ControlCard>
            <Card>
                <Section>
                    <Heading>Skills</Heading>
                    <Content>{candidate && candidate.skills}</Content>
                </Section>

                <Section>
                    <Heading>Education</Heading>
                    <Content>{candidate && candidate.education}</Content>
                </Section>

                <Section>
                    <Heading>Contact No.</Heading>
                    <Content>{candidate && candidate.number}</Content>
                </Section>

                <Section>
                    <Heading>Email</Heading>
                    <Content>{candidate && candidate.email}</Content>
                </Section>

                <Section>
                    <Heading>Resume</Heading>
                    <DownloadLink href={`${API_URI}download/${candidate && candidate._id}`} target="_blank" color={themeColor}>Download</DownloadLink>
                </Section>

            </Card>


            {/* {isStatusChanged && <Redirect to={`${API_URI}jobs/${job._id}`} />} */}
        </Container>
    )
}

export default ApplicantDetailsPage


//Common ------------------------------------------
const Section = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid #0000001a;
`

const RemoveSpacing = css`
    margin: 0px;
    padding: 0px;
`
const Heading = styled.p`
    ${RemoveSpacing}
    font-weight: bold;
    font-size: 0.8em;
    color: #00000063;
    margin-bottom: 10px;
`

const Content = styled.p`
    ${RemoveSpacing}
        font-weight: bold;
    font-size: 1.3em;
`





const StyledBtn = css`
    border-style: none;
    padding: 7px 10px;
    width: 130px;
    margin-right: 10px;
    color: white;
    background-color: ${props => props && props.color};
    &:focus{
        outline: none;
    }
`



const DownloadLink = styled.a`
    ${StyledBtn}
    text-decoration: none;
`

const ControlCard = styled(Card)`
position: sticky;
top: 10px;
    display: flex;
    justify-content: space-between;
    height: 30px;

`

const Btn = styled.button`
    border-style: none;
    padding: 7px 10px;
    width: 130px;
    margin-right: 10px;
    color: white;
    border: 1px solid ${props => props && props.color};
    background-color: ${props => props && props.color};
    &:hover{
        background-color: transparent;
        color: ${props => props && props.color};
    }
    &:focus{
        outline: none;
    }

    &:disabled{
        opacity: 0.3;
        cursor: not-allowed;
    }
`
