import React from 'react'
import styled, { css } from 'styled-components'
import { API_URI } from '../Endpoint'
import { themeColor, StyledButton } from '../Common/Styles/StyledComponents'

function CandidateInfo({ candidate }) {
    return (
        <>
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
        </>
    )
}

export default CandidateInfo

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

const DownloadLink = styled.a`
    ${StyledButton}
    padding: 5px 20px;
    text-decoration: none;
`


