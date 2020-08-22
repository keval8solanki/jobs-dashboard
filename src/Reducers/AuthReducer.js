import { authTypes } from '../ActionTypes/ActionTypes'

const initialState = {
	isAuthenticated: null,
	data: null,
}

const AuthReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case authTypes.AUTH:
			return {
				...state,
				isAuthenticated: payload,
			}

		case authTypes.SAVE_DATA:
			return {
				...state,
				data: payload,
			}

		default:
			return state
	}
}

export default AuthReducer
