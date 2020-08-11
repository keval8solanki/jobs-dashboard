import { rolesTypes } from '../ActionTypes/ActionTypes'

export const saveCurrentRole = (payload) => {
    return {
        type: rolesTypes.SAVE_CURRENT_ROLE,
        payload
    }
}


export const saveAllRoles = (payload) => {
    return {
        type: rolesTypes.SAVE_ALL_ROLES,
        payload
    }
}

export const searchRoles = (payload) => {
    return {
        type: rolesTypes.FILTER_SEARCH_ROLES,
        payload
    }
}

