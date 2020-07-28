import { candidateTypes } from '../ActionTypes/ActionTypes'

export const saveCurrentCandidate = (payload) => {
    return {
        type: candidateTypes.SAVE_CURRENT_CANDIDATE,
        payload
    }
}

export const saveAllCandidates = (payload) => {
    return {
        type: candidateTypes.SAVE_ALL_CANDIDATES,
        payload
    }
}

export const searchCandidates = (payload) => {
    return {
        type: candidateTypes.FILTER_SEARCH_CANDITATE,
        payload
    }
}

export const changeStatus = (status) => {
    let payload = ''
    if (status === 0) {
        payload = 'Applied'
    } else if (status === 1) {
        payload = 'Called For Interview'
    } else if (status === 2) {
        payload = 'Selected'
    } else if (status === 3) {
        payload = 'Rejected'
    }
    return {
        type: candidateTypes.CHANGE_STATUS,
        payload
    }
}