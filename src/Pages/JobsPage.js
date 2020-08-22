import React, { useState, useEffect } from 'react'
import ContentContainer from '../Components/ContentContainer'
import Table from '../Components/Table'
import { API_URI } from '../Endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllJobs, searchJobs, saveCurrentJob } from '../Actions/JobsActions'
import axios from 'axios'
import { Card, StyledButton } from '../Common/Styles/StyledComponents'
import { useGetData, useSearch, useResetState } from '../Hooks/getData'
import { getAndSaveData } from '../Common/Functions/helperFunctions'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { saveAllCandidates } from '../Actions/CandidateActions'

function JobsPage() {
	const dispatch = useDispatch()

	useResetState(saveCurrentJob)
	useResetState(saveAllCandidates)
	const { data } = useSelector((state) => state.authData)
	const permissions = data && data.role_id.permissions

	const [searchVal, setSearchVal] = useState()

	useGetData(API_URI, saveAllJobs)
	useSearch(searchVal, searchJobs)

	const { jobs, filteredJobs } = useSelector((state) => state.jobsData)

	const currentData = searchVal === undefined ? jobs : filteredJobs

	const params = {
		data: currentData,
		route: 'job',
		titles: ['Job Title', 'Company', 'Location', 'Posted on'],
		fields: ['title', 'company', 'location'],
		setSearchVal,
	}

	return (
		<ContentContainer
			title='Jobs'
			value2={
				permissions && permissions.job.create ? (
					<InputJob to='/job/post'>Post New Job</InputJob>
				) : null
			}
			justify='space-between'>
			<Card>
				<Table {...params} />
			</Card>
		</ContentContainer>
	)
}

export default JobsPage

const InputJob = styled(NavLink)`
	${StyledButton}
	padding: 5px 10px;
	width: fit-content;
	text-decoration: none;
	border-radius: 0px;
`
