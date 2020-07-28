import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled, { css } from 'styled-components'

import { API_URI } from '../Endpoint'
import { NavLink } from 'react-router-dom'
import JobSVG from '../Assets/Icons/job.svg'
import Loader from '../Assets/Icons/loader.svg'
import PeopleSVG from '../Assets/Icons/people.svg'
import { Title, FlexDiv, Container, Card, statuscolors } from '../Common/Styles/StyledComponents'



function DashboardPage() {
    const [info, setInfo] = useState()

    useEffect(() => {
        axios.get(`${API_URI}info/counts`)
            .then(({ data }) => setInfo(data))
            .catch(err => console.log(err))

    }, [])


    console.log(info)



    return (
        <Container>
            <FlexDiv>
                <Title>Dashboard</Title>
            </FlexDiv>
            <CardContainer>
                <StyledLink to="/jobs">
                    <InfoCard>
                        <div>
                            <InfoTitle>Jobs</InfoTitle>
                            <InfoData>{info && info.jobsCount ? info.jobsCount : <LoadingIcon src={Loader} />}</InfoData>
                        </div>
                        <Icon color={statuscolors.reviewBg} src={JobSVG} />
                    </InfoCard>
                </StyledLink>

                <StyledLink to="/candidates">
                    <InfoCard>
                        <div>
                            <InfoTitle>Candidates</InfoTitle>
                            <InfoData>{info && info.usersCount ? info.usersCount : <LoadingIcon src={Loader} />}</InfoData>
                        </div>
                        <Icon color={statuscolors.pendingBg} src={PeopleSVG} />
                    </InfoCard>
                </StyledLink>

            </CardContainer>


        </Container>
    )
}

export default DashboardPage


const StyledLink = styled(NavLink)`
    color: black;
    text-decoration: none;
    &:hover{
        color: black;
    }
`

const NoSpacing = css`

    margin: 0px;
    padding: 0px;

`
const InfoTitle = styled.p`
    ${NoSpacing}
    
    opacity: 0.5;
    font-weight: bold;
    font-size: 0.9em;
`

const InfoData = styled.p`
    ${NoSpacing}
    font-weight: bold;
    font-size: 3em;
`

const InfoCard = styled(Card)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 250px;
    height: 100px;
    padding: 20px 30px;
    transition: all 0.3s;
    &:hover{
        transform:scale(1.05)
    }
`

const Icon = styled.img`
width: 50px;
    background-color: ${props => props && props.color};
    border-radius: 50px;
    padding: 6px;

`

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const LoadingIcon = styled.img`
    width: 30px;
`