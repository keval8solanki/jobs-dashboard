import { candidateTypes } from '../ActionTypes/ActionTypes'

export const saveCurrentCandidate = (payload) => {
	return {
		type: candidateTypes.SAVE_CURRENT_CANDIDATE,
		payload,
	}
}

export const saveAllCandidates = (payload) => {
	return {
		type: candidateTypes.SAVE_ALL_CANDIDATES,
		payload,
	}
}

export const searchCandidates = (payload) => {
	return {
		type: candidateTypes.FILTER_SEARCH_CANDITATE,
		payload,
	}
}

export const changeStatus = (val, index) => {
	const statusArr = ['Applied', 'Called For Interview', 'Selected', 'Rejected']
	const status = statusArr[val]
	return {
		type: candidateTypes.CHANGE_STATUS,
		payload: { status, index },
	}
}
