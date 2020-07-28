import { jobTypes } from '../ActionTypes/ActionTypes'

export const saveCurrentJob = (payload) => {
    return {
        type: jobTypes.SAVE_CURRENT_JOB,
        payload
    }
}

export const saveAppliedJobs = (payload) => {
    return {
        type: jobTypes.SAVE_APPLIED_JOBS,
        payload
    }
}


export const saveAllJobs = (payload) => {
    return {
        type: jobTypes.SAVE_ALL_JOBS,
        payload
    }
}

export const searchJobs = (payload) => {
    return {
        type: jobTypes.FILTER_SEARCH_JOBS,
        payload
    }
}

export const searchAppliedJobs = (payload) => {
    return {
        type: jobTypes.FILTER_APPLIED_JOBS,
        payload
    }
}