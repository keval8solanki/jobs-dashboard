import React, { useState, useEffect } from 'react'
import ContentContainer from '../Components/ContentContainer'
import Table from '../Components/Table'
import { API_URI } from '../Endpoint'
import { useSelector, useDispatch } from 'react-redux'
import { Card, StyledButton } from '../Common/Styles/StyledComponents'
import { useGetData, useSearch, useResetState } from '../Hooks/getData'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import {
	saveAllCandidates,
	searchCandidates,
	saveCurrentCandidate,
} from '../Actions/CandidateActions'
import { saveAllJobs } from '../Actions/JobsActions'

function CandidatesPage() {
	useResetState(saveCurrentCandidate)
	useResetState(saveAllJobs)
	const [searchVal, setSearchVal] = useState()

	useGetData(`${API_URI}all/candidate`, saveAllCandidates)
	useSearch(searchVal, searchCandidates)

	const { candidates, filteredcandidates } = useSelector(
		(state) => state.candidateData
	)

	const currentData = searchVal === undefined ? candidates : filteredcandidates

	const params = {
		data: currentData,
		route: 'applied-jobs',
		titles: ['Name', 'Contact No.', 'Total Jobs Applied', 'Applied on'],
		fields: ['name', 'number', 'total'],
		setSearchVal,
	}

	return (
		<ContentContainer title='Candidates'>
			<Card>
				<Table {...params} />
			</Card>
		</ContentContainer>
	)
}

export default CandidatesPage

const InputJob = styled(NavLink)`
	${StyledButton}
	padding: 5px 10px;
	width: fit-content;
	text-decoration: none;
	border-radius: 0px;
`
