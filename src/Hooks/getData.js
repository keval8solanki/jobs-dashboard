import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { decryptWithAES } from '../Common/Functions/helperFunctions'

export const useGetData = (endpoint, save) => {
	const dispatch = useDispatch()
	const headers = useHeaders()

	useEffect(() => {
		axios
			.get(endpoint, { withCredentials: true })
			.then(({ data }) => {
				dispatch(save(data))
			})
			.catch((err) => console.log('err', err))
	}, [])
}

export const useSearch = (searchVal, search) => {
	const dispatch = useDispatch()
	useEffect(() => {
		if (searchVal !== undefined) {
			dispatch(search(searchVal))
		}
	}, [searchVal])
}

export const useHeaders = () => {
	const token = Cookies.get('token')
	if (token) {
		// const jwt = decryptWithAES(token, 'SECRET')
		const headers = {
			authorization: `Bearer ${token}`,
		}
		return headers
	}
}

export const useResetState = (save) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(save(null))
	}, [])
}
