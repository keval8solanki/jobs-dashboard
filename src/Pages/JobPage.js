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
import {
	useGetData,
	useSearch,
	useHeaders,
	useResetState,
} from '../Hooks/getData'
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
import Loader from '../Components/Loader'

function JobPage(props) {
	useResetState(saveCurrentCandidate)
	const { data } = useSelector((state) => state.authData)
	const permissions = data && data.role_id.permissions

	const [searchVal, setSearchVal] = useState()
	const headers = useHeaders()
	const [isJobDeleted, setIsJobDeleted] = useState(false)
	const dispatch = useDispatch()

	const id = props.match.params.id
	const URI = `${API_URI}job/${id}`
	const editURL = `edit/${id}`

	// Saving job by id in Redux
	useGetData(URI, saveCurrentJob)
	useSearch(searchVal, searchCandidates)

	// Getting single job
	const { job } = useSelector((state) => state.jobsData)

	useEffect(() => {
		if (job) {
			dispatch(saveAllCandidates(job.user))
		}
	}, [job])

	const { candidates, filteredcandidates } = useSelector(
		(state) => state.candidateData
	)
	const currentData = searchVal === undefined ? candidates : filteredcandidates

	const params = {
		data: currentData,
		route: 'candidate',
		titles: ['Name', 'Contact No.', 'Status', 'Applied on'],
		fields: ['name', 'number', 'status'],
		setSearchVal,
		extra: job,
	}

	const tabData = [
		{
			title: 'Candidate List',
			component: <Table {...params} />,
		},
		{
			title: 'Job Details',
			component: <JobInfo job={job} />,
		},
	]

	const deleteJobHandler = async (job, setState) => {
		try {
			await axios.delete(`${API_URI}${job && job._id}`, {
				withCredentials: true,
			})
			setState(true)
			toast.success('Job deleted succesfully', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		} catch (err) {
			toast.error('Error in job deletion', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	const Buttons = (
		<div>
			{permissions && permissions.job.update ? (
				<EditNav to={editURL}>
					<EditBtn>Edit</EditBtn>
				</EditNav>
			) : null}
			{permissions && permissions.job.delete ? (
				<DeleteBtn onClick={() => deleteJobHandler(job, setIsJobDeleted)}>
					Delete
				</DeleteBtn>
			) : null}
		</div>
	)

	return (
		<ContentContainer
			title={job ? job.title : <Loader />}
			value2={Buttons}
			justify='space-between'>
			<Tabs data={tabData} />
			{isJobDeleted && <Redirect to='/jobs' />}
		</ContentContainer>
	)
}

export default JobPage
