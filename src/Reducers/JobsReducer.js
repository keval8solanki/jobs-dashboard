import { jobTypes } from '../ActionTypes/ActionTypes'

const initialState = {
	jobs: null,
	job: null,
	filteredJobs: undefined,
}

const JobsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case jobTypes.SAVE_ALL_JOBS:
			return {
				...state,
				jobs: payload,
			}

		case jobTypes.SAVE_CURRENT_JOB:
			return {
				...state,
				job: payload,
			}

		case jobTypes.FILTER_SEARCH_JOBS:
			const searchVal = payload.toLowerCase()
			const filterTemp = state.jobs.filter((item) => {
				return item.title.toLowerCase().includes(searchVal)
			})
			return {
				...state,
				filteredJobs: filterTemp,
			}

		default:
			return state
	}
}

export default JobsReducer
