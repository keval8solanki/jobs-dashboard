import JobsReducer from './JobsReducer'
import CandidateReducer from './CandidatesReducer'
import AuthReducer from './AuthReducer'
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
    jobsData: JobsReducer,
    candidateData: CandidateReducer,
    authData: AuthReducer
})

export default RootReducer;