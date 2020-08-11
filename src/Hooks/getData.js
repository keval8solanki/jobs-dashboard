import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

export const useGetData = (endpoint, save) => {
	const dispatch = useDispatch()
	const headers = useHeaders()

	useEffect(() => {
		axios
			.get(endpoint, { headers })
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
	const { data } = useSelector((state) => state.authData)
	if (data) {
		const headers = {
			username: data.authData.username,
			password: data.authData.password,
		}
		return headers
	}
	return null
}

export const useResetState = (save) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(save(null))
	}, [])
}
