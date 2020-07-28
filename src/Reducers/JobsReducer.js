import { jobTypes } from '../ActionTypes/ActionTypes'

const initialState = {
    jobs: [],
    appliedJobs: [],
    job: null,
    filteredJobs: undefined,
    filteredAppliedJobs: undefined
}

const JobsReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case jobTypes.SAVE_ALL_JOBS:
            console.log(payload)
            return {
                ...state,
                jobs: payload
            }

        case jobTypes.SAVE_APPLIED_JOBS:
            console.log(payload)
            return {
                ...state,
                appliedJobs: payload
            }

        case jobTypes.SAVE_CURRENT_JOB:
            console.log(payload)
            return {
                ...state,
                job: payload
            }

        case jobTypes.FILTER_SEARCH_JOBS:

            const searchVal = payload.toLowerCase()
            console.log(searchVal)
            const filterTemp = state.jobs.filter(item => {
                return item.title.toLowerCase().includes(searchVal)
            })
            return {
                ...state,
                filteredJobs: filterTemp
            }

        case jobTypes.FILTER_APPLIED_JOBS:

            const searchAppliedJob = payload.toLowerCase()
            console.log(searchAppliedJob)
            const filterAppliedTemp = state.appliedJobs.filter(item => {
                return item.title.toLowerCase().includes(searchAppliedJob)
            })
            return {
                ...state,
                filteredAppliedJobs: filterAppliedTemp
            }

        default:
            return state
    }
}

export default JobsReducer