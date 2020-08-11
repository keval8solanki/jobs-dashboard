import { adminTypes } from '../ActionTypes/ActionTypes'

export const saveCurrentAdmin = (payload) => {
    return {
        type: adminTypes.SAVE_CURRENT_ADMIN,
        payload
    }
}


export const saveAllAdmins = (payload) => {
    return {
        type: adminTypes.SAVE_ALL_ADMINS,
        payload
    }
}

export const searchAdmins = (payload) => {
    return {
        type: adminTypes.FILTER_SEARCH_ADMINS,
        payload
    }
}

