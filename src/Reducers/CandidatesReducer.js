import { candidateTypes } from '../ActionTypes/ActionTypes'

const initialState = {
    candidates: [],
    candidate: null,
    filteredcandidates: undefined
}

const CandidatesReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case candidateTypes.SAVE_ALL_CANDIDATES:
            console.log(payload)
            return {
                ...state,
                candidates: payload
            }

        case candidateTypes.SAVE_CURRENT_CANDIDATE:
            console.log(payload)
            return {
                ...state,
                candidate: payload
            }

        case candidateTypes.FILTER_SEARCH_CANDITATE:
            const searchVal = payload.toLowerCase()
            console.log(searchVal)
            const filterTemp = state.candidates.filter(item => {
                return item.name.toLowerCase().includes(searchVal)
            })
            console.log(filterTemp)

            return {
                ...state,
                filteredcandidates: filterTemp
            }

        case candidateTypes.CHANGE_STATUS:
            console.log(payload)
            let TEMP = { ...state.candidate }
            TEMP.jobs[0].status = payload
            return {
                ...state,
                candidate: TEMP
            }

        default:
            return state
    }
}

export default CandidatesReducer