import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled, { css } from 'styled-components'

import { API_URI } from '../Endpoint'
import { NavLink } from 'react-router-dom'
import JobSVG from '../Assets/Icons/job.svg'
import PeopleSVG from '../Assets/Icons/people.svg'
import {
	Title,
	FlexDiv,
	Container,
	Card,
	statuscolors,
} from '../Common/Styles/StyledComponents'
import { useSelector } from 'react-redux'
import { useHeaders } from '../Hooks/getData'
import Loader from '../Components/Loader'

const contentVariant = {
	initial: {
		opacity: 0,
		x: '+5vw',
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.7,
			ease: 'easeOut',
		},
	},
}

function DashboardPage() {
	const headers = useHeaders()
	const [count, setCount] = useState()

	const { data } = useSelector((state) => state.authData)
	useEffect(() => {
		axios
			.get(`${API_URI}info/counts`, { withCredentials: true })
			.then(({ data }) => {
				setCount(data)
			})
			.catch((err) => console.log(err))
	}, [])

	const renderCountData = (field) => {
		if (count && count[field]) {
			return count[field]
		} else {
			return <Loader />
		}
	}

	return (
		<Container variants={contentVariant}>
			<FlexDiv>
				<Title>Dashboard</Title>
			</FlexDiv>
			<CardContainer>
				<StyledLink to='/jobs'>
					<InfoCard>
						<div>
							<InfoTitle>Jobs</InfoTitle>
							<InfoData>{renderCountData('jobsCount')}</InfoData>
						</div>
						<Icon color={statuscolors.reviewBg} src={JobSVG} />
					</InfoCard>
				</StyledLink>

				<StyledLink to='/candidates'>
					<InfoCard>
						<div>
							<InfoTitle>Candidates</InfoTitle>
							<InfoData>{renderCountData('usersCount')}</InfoData>
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
	&:hover {
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
	&:hover {
		transform: scale(1.05);
	}

	@media (max-width: 400px) {
		width: 200px;
	}
`

const Icon = styled.img`
	width: 50px;
	background-color: ${(props) => props && props.color};
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
