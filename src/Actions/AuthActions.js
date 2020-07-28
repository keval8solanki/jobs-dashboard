import { authTypes } from '../ActionTypes/ActionTypes'

export const login = (payload) => {
    return {
        type: authTypes.LOG_IN,
        payload
    }
}

export const logout = (payload) => {
    return {
        type: authTypes.LOG_OUT,
        payload
    }
}

