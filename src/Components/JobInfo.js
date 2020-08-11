import React from 'react'
import styled, { css } from 'styled-components'
import { Card } from '../Common/Styles/StyledComponents'
import LocationSVG from '../Assets/Icons/location.svg'

function JobInfo({ job }) {

    const renderList = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(item => <li key={item}>{item}</li>)
            }
            return 'No data'
        }
    }

    return (
        <>
            <FlexHeader>
                <div>
                    <Heading>Company</Heading>
                    <Company>{job && job.company}</Company>
                </div>
                <Location><img src={LocationSVG} /> {job && job.location}</Location>
            </FlexHeader>

            <Section>
                <Heading>Description</Heading>
                <p>{job && job.description}</p>
            </Section>
            <Section>
                <p><Heading>Salary:</Heading> {job && job.salary}</p>
                <p><Heading>Experience:</Heading> {job && job.experience}</p>

            </Section>
            <Section>
                <Heading>Eligibilities</Heading>
                <Ul>
                    {renderList(job && job.eligibility)}
                </Ul>
            </Section>

            <Section>
                <Heading>Responsiblities</Heading>
                <Ul>
                    {renderList(job && job.responsibilities)}
                </Ul>
            </Section>

            <Section>
                <Heading>About</Heading>
                <p>{job && job.aboutCompany}</p>
            </Section>
        </>
    )
}

export default JobInfo


const FlexHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #0000001a;
`

const RemoveSpacing = css`
    margin: 0px;
    padding: 0px;
`

const Section = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid #0000001a;
`

const Heading = styled.p`
    ${RemoveSpacing}
    font-weight: bold;
    font-size: 0.8em;
    color: #00000063;

`

const Company = styled.p`
    ${RemoveSpacing}
        font-weight: bold;
    font-size: 1.5em;

`

const Location = styled.p`
    ${RemoveSpacing}
    opacity: 0.5;
`

const Ul = styled.ul`
    padding: 0px;
    margin: 10px 0px 0px 15px;

`
