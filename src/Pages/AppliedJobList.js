import React, { useState, useEffect } from 'react'
import ContentContainer from '../Components/ContentContainer'
import Table from '../Components/Table'
import { API_URI } from '../Endpoint'
import { useDispatch, useSelector } from 'react-redux'
import { saveAllJobs, searchJobs, saveCurrentJob } from '../Actions/JobsActions'
import {
	Card,
	EditBtn,
	EditNav,
	DeleteBtn,
} from '../Common/Styles/StyledComponents'
import { useGetData, useSearch } from '../Hooks/getData'
import {
	getAndSaveData,
	deleteJobHandler,
} from '../Common/Functions/helperFunctions'
import {
	saveAllCandidates,
	searchCandidates,
	saveCurrentCandidate,
} from '../Actions/CandidateActions'
import Tabs from '../Components/Tabs'
import JobInfo from '../Components/JobInfo'
import axios from 'axios'
import { toast } from '../Components/Toast'
import { Redirect } from 'react-router-dom'
import CandidateInfo from '../Components/CandidateInfo'
import Loader from '../Components/Loader'

function AppliedJobList(props) {
	const [searchVal, setSearchVal] = useState()
	const dispatch = useDispatch()
	const id = props.match.params.id
	const URI = `${API_URI}user/${id}`

	// Saving job by id in Redux
	useGetData(URI, saveCurrentCandidate)
	useSearch(searchVal, searchCandidates)

	// Getting single job
	const { candidate } = useSelector((state) => state.candidateData)

	useEffect(() => {
		if (candidate) {
			const jobs = candidate.jobs.map((item) => item.id)
			dispatch(saveAllJobs(jobs))
		}
	}, [candidate])

	const { jobs, filteredJobs } = useSelector((state) => state.jobsData)
	const currentData = searchVal === undefined ? jobs : filteredJobs
	const params = {
		data: currentData,
		route: 'candidate',
		titles: ['Job Title', 'Company', 'Location', 'Posted on'],
		fields: ['title', 'company', 'location'],
		setSearchVal,
		stop: true,
	}

	const tabData = [
		{
			title: 'Applied Jobs',
			component: <Table {...params} />,
		},
		{
			title: 'Candidate Details',
			component: <CandidateInfo candidate={candidate} />,
		},
	]

	return (
		<ContentContainer title={candidate ? candidate.name : <Loader />}>
			<Tabs data={tabData} />
		</ContentContainer>
	)
}

export default AppliedJobList
