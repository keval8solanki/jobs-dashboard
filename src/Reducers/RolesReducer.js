import { rolesTypes } from '../ActionTypes/ActionTypes'

const initialState = {
	roles: null,
	role: null,
	filteredRoles: undefined,
}

const RolesReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case rolesTypes.SAVE_ALL_ROLES:
			return {
				...state,
				roles: payload,
			}

		case rolesTypes.SAVE_CURRENT_ROLE:
			return {
				...state,
				role: payload,
			}

		case rolesTypes.FILTER_SEARCH_ROLES:
			const searchVal = payload.toLowerCase()
			const filterTemp = state.roles.filter((item) => {
				return item.name.toLowerCase().includes(searchVal)
			})
			return {
				...state,
				filteredRoles: filterTemp,
			}

		default:
			return state
	}
}

export default RolesReducer
