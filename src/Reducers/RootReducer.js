import JobsReducer from './JobsReducer'
import CandidateReducer from './CandidatesReducer'
import AuthReducer from './AuthReducer'
import { combineReducers } from 'redux'
import RolesReducer from './RolesReducer'
import AdminsReducer from './AdminsReducer'

const RootReducer = combineReducers({
    jobsData: JobsReducer,
    candidateData: CandidateReducer,
    authData: AuthReducer,
    rolesData: RolesReducer,
    adminsData:AdminsReducer 
})

export default RootReducer;