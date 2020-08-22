// [CODE CLEANED ✔]

import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import DashboardSVG from '../Assets/Icons/dashboard.svg'
import AdminSVG from '../Assets/Icons/admin.svg'
import JobSVG from '../Assets/Icons/job-dashboard.svg'
import CandidateSVG from '../Assets/Icons/candidate.svg'
import RoleSVG from '../Assets/Icons/role.svg'
import ProfileSVG from '../Assets/Icons/profile.svg'
import { useSelector } from 'react-redux'
import { themeColor } from '../Common/Styles/StyledComponents'
import { motion } from 'framer-motion'

const activeStyles = {
	backgroundColor: '#f1f1f1',
	borderRight: `5px solid ${themeColor}`,
	paddingRight: '15px',
	// boxShadow: 'inset 1px 1px 4px 1px #00000024'
}

function SideBar({ variants }) {
	const { data } = useSelector((state) => state.authData)
	const permissions = data && data.role_id.permissions

	return (
		<SidebarContainer variants={variants}>
			<Routes activeStyle={activeStyles} exact to='/'>
				<RouteIcon src={DashboardSVG} />
				<RouteText>Dashboard</RouteText>
			</Routes>

			{permissions && permissions.job.read ? (
				<Routes activeStyle={activeStyles} to='/jobs'>
					<RouteIcon src={JobSVG} />
					<RouteText>Jobs</RouteText>
				</Routes>
			) : null}

			{permissions && permissions.candidate.read ? (
				<Routes activeStyle={activeStyles} exact to='/candidates'>
					<RouteIcon src={CandidateSVG} />
					<RouteText>Candidates</RouteText>
				</Routes>
			) : null}

			{permissions && permissions.role.read ? (
				<Routes activeStyle={activeStyles} exact to='/roles'>
					<RouteIcon src={RoleSVG} />
					<RouteText>Roles</RouteText>
				</Routes>
			) : null}

			{permissions && permissions.admin.read ? (
				<Routes activeStyle={activeStyles} exact to='/admins'>
					<RouteIcon src={AdminSVG} />
					<RouteText>Admins</RouteText>
				</Routes>
			) : null}

			<Routes activeStyle={activeStyles} exact to='/profile'>
				<RouteIcon src={ProfileSVG} />
				<RouteText>Profile</RouteText>
			</Routes>
		</SidebarContainer>
	)
}

export default SideBar

const SidebarContainer = styled(motion.div)`
	background-color: white;
	width: 15%;
	display: flex;
	flex-direction: column;
	border-right: 1px solid #00000017;
`

const RouteIcon = styled.img`
	margin-right: 10px;
`
const RouteText = styled.p`
	margin: 0px;
	padding: 0px;
	@media (max-width: 900px) {
		display: none;
	}
`

const Routes = styled(NavLink)`
	display: flex;
	text-decoration: none;
	color: grey;
	/* font-weight: bold; */
	text-align: left;
	padding: 10px 30px 10px 20px;
	transition: all 0.5s;
	&:hover {
		text-decoration: none;
		background-color: white;
	}

	&:active {
		text-decoration: none;
	}
`
