import { adminTypes } from '../ActionTypes/ActionTypes'

const initialState = {
	admins: null,
	admin: null,
	filteredAdmin: undefined,

	assignedRoles: [],
	assignedRole: null,
}

const AdminsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case adminTypes.SAVE_ALL_ADMINS:
			return {
				...state,
				admins: payload,
			}

		case adminTypes.SAVE_CURRENT_ADMIN:
			return {
				...state,
				admin: payload,
			}

		case adminTypes.FILTER_SEARCH_ADMINS:
			const searchVal = payload.toLowerCase()
			const filterTemp = state.admins.filter((item) => {
				return item.username.toLowerCase().includes(searchVal)
			})
			return {
				...state,
				filteredAdmins: filterTemp,
			}

		default:
			return state
	}
}

export default AdminsReducer
