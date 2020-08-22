import React, { useState } from 'react'
import {
	Card,
	Btn,
	statuscolors,
	Status,
} from '../Common/Styles/StyledComponents'
import ContentContainer from '../Components/ContentContainer'
import Controls from '../Components/Controls'
import { useGetData, useHeaders } from '../Hooks/getData'
import { API_URI } from '../Endpoint'
import { saveCurrentCandidate, changeStatus } from '../Actions/CandidateActions'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import CandidateInfo from '../Components/CandidateInfo'
import {
	statusColor,
	statusFinder,
	statusIndex,
} from '../Common/Functions/helperFunctions'

import { toast } from '../Components/Toast'
import Loader from '../Components/Loader'
import { candidateTypes } from '../ActionTypes/ActionTypes'

function CandidatePage(props) {
	const { candidate } = useSelector((state) => state.candidateData)

	const headers = useHeaders()
	const { data } = useSelector((state) => state.authData)
	const permissions = data && data.role_id.permissions
	const dispatch = useDispatch()
	const [isStatusChanged, setIsStatusChanged] = useState(false)
	const id = props.match.params.id
	const { job } = useSelector((state) => state.jobsData)
	const URI = `${API_URI}user/${id}`
	useGetData(URI, saveCurrentCandidate)

	const changeStatusHandler = async (status) => {
		const URL = `${API_URI}status/${
			candidate && candidate._id
		}?status=${status}`
		try {
			await axios.patch(URL, { jobID: job._id }, { withCredentials: true })
			setIsStatusChanged(true)
			const index = statusIndex(candidate, job)
			dispatch(changeStatus(status, index))
			toast.success('Status Updated', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		} catch (err) {
			toast.error('Error in status updation', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	const renderCard = () => {
		if (candidate) {
			return (
				<>
					{permissions && permissions.candidate.update ? (
						<Controls title='Status Controls'>
							<div>
								{statusFinder(candidate, job) !== 'Rejected' && (
									<Btn
										color={statuscolors.failed}
										onClick={() => changeStatusHandler(3)}>
										Reject
									</Btn>
								)}
								{statusFinder(candidate, job) !== 'Selected' && (
									<Btn
										color={statuscolors.success}
										onClick={() => changeStatusHandler(2)}>
										Select
									</Btn>
								)}
								{statusFinder(candidate, job) !== 'Called For Interview' &&
								statusFinder(candidate, job) !== 'Selected' ? (
									<Btn
										color={statuscolors.review}
										onClick={() => changeStatusHandler(1)}>
										Call for interview
									</Btn>
								) : null}
							</div>
						</Controls>
					) : null}
					<Card>
						<CandidateInfo candidate={candidate} />
					</Card>
				</>
			)
		}
	}

	return (
		<ContentContainer
			title={candidate ? candidate.name : <Loader />}
			value2={
				<Status {...statusColor(statusFinder(candidate, job))}>
					{statusFinder(candidate, job)}
				</Status>
			}
			justify='flex-start'>
			{renderCard()}
		</ContentContainer>
	)
}

export default CandidatePage
