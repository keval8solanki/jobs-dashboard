import { authTypes } from '../ActionTypes/ActionTypes'

const initialState = {
    isAuthenticated: true
}

const AuthReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case authTypes.LOG_IN:
            return {
                ...state,
                isAuthenticated: payload
            }

        case authTypes.LOG_OUT:
            return {
                ...state,
                isAuthenticated: payload
            }

        default:
            return state
    }
}

export default AuthReducer