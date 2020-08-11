import { candidateTypes } from '../ActionTypes/ActionTypes'
import { statusFinder } from '../Common/Functions/helperFunctions'

const initialState = {
	candidates: null,
	candidate: null,
	filteredcandidates: undefined,
}

const CandidatesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case candidateTypes.SAVE_ALL_CANDIDATES:
			return {
				...state,
				candidates: payload,
			}

		case candidateTypes.SAVE_CURRENT_CANDIDATE:
			return {
				...state,
				candidate: payload,
			}

		case candidateTypes.FILTER_SEARCH_CANDITATE:
			const searchVal = payload.toLowerCase()
			const filterTemp = state.candidates.filter((item) => {
				return item.name.toLowerCase().includes(searchVal)
			})

			return {
				...state,
				filteredcandidates: filterTemp,
			}

		case candidateTypes.CHANGE_STATUS:
			const { status, index } = payload
			let TEMP = { ...state.candidate }
			TEMP.jobs[index].status = status
			return {
				...state,
				candidate: TEMP,
			}

		default:
			return state
	}
}

export default CandidatesReducer
