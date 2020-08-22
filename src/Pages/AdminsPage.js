import React, { useState, useEffect } from 'react'
import ContentContainer from '../Components/ContentContainer'
import Table from '../Components/Table'
import { API_URI } from '../Endpoint'
import { useDispatch, useSelector } from 'react-redux'
import {
	saveAllAdmins,
	searchAdmins,
	saveCurrentAdmin,
} from '../Actions/AdminActions'
import { Card, StyledButton } from '../Common/Styles/StyledComponents'
import { useGetData, useSearch, useResetState } from '../Hooks/getData'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { saveAllRoles } from '../Actions/RoleActions'

function AdminsPage() {
	useResetState(saveCurrentAdmin)
	useResetState(saveAllRoles)

	const [searchVal, setSearchVal] = useState()
	useGetData(`${API_URI}admins`, saveAllAdmins)
	useSearch(searchVal, searchAdmins)

	const { admins, filteredAdmins } = useSelector((state) => state.adminsData)
	const currentData = searchVal === undefined ? admins : filteredAdmins
	const params = {
		data: currentData,
		route: 'admin',
		titles: ['Username', 'Role Assigned', 'Posted on'],
		fields: ['username', 'role'],
		setSearchVal,
	}
	// useEffect(() => {
	//     dispatch(saveCurrentAdmin(null))

	// }, [currentData])

	return (
		<ContentContainer
			title='Admins'
			value2={<Link to='/admin/add'>Add Admin</Link>}
			justify='space-between'>
			<Card>
				<Table {...params} />
			</Card>
		</ContentContainer>
	)
}

export default AdminsPage

const Link = styled(NavLink)`
	${StyledButton}
	padding: 5px 10px;
	width: fit-content;
	text-decoration: none;
	border-radius: 0px;
`
