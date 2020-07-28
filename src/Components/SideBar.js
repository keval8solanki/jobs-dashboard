// [CODE CLEANED ✔]

import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import DashboardSVG from '../Assets/Icons/dashboard.svg'
import ProfileSVG from '../Assets/Icons/profile.svg'
import JobSVG from '../Assets/Icons/job-dashboard.svg'
import CandidateSVG from '../Assets/Icons/candidate.svg'

const activeStyles = {
    backgroundColor: '#f1f1f1'
}

function SideBar() {

    const links = [
        {
            route: '/',
            icon: DashboardSVG,
            text: 'Dashboard'
        },
        {
            route: '/jobs',
            icon: JobSVG,
            text: 'Jobs'
        },
        {
            route: '/candidates',
            icon: CandidateSVG,
            text: 'Candidates'
        },
        {
            route: '/profile',
            icon: ProfileSVG,
            text: 'Profile'
        }
    ]

    const renderRoutes = links.map((item, index) => {
        return (
            <Routes activeStyle={activeStyles} exact={index === 0} to={item.route}>
                <RouteIcon src={item.icon} />
                <RouteText>{item.text}</RouteText>
            </Routes>
        )
    })

    return (
        <SidebarContainer>
            {renderRoutes}
        </SidebarContainer>
    )
}

export default SideBar

const SidebarContainer = styled.div`
    background-color: white;
    width: 15%;
    display: flex;
    flex-direction: column;
`

const RouteIcon = styled.img`
    margin-right: 10px;
`
const RouteText = styled.p`
    margin: 0px;
    padding: 0px;
    
`

const Routes = styled(NavLink)`
    display: flex;
    text-decoration: none;
    color: grey;
    font-weight: bold;
    text-align: left;
    padding: 10px 20px;
    &:hover{
        
        text-decoration: none;
        background-color: white;
    }

    &:active{
        text-decoration: none;
    }

    

    

`