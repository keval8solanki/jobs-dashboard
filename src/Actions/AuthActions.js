import { authTypes } from '../ActionTypes/ActionTypes'

export const auth = (payload) => {
    return {
        type: authTypes.AUTH,
        payload
    }
}

export const saveData = (payload) => {
    return {
        type: authTypes.SAVE_DATA,
        payload
    }
}


