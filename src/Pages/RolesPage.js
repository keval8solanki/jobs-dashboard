import React, { useState, useEffect } from 'react'
import ContentContainer from '../Components/ContentContainer'
import Table from '../Components/Table'
import { API_URI } from '../Endpoint'
import { useDispatch, useSelector } from 'react-redux'
import {
	saveAllRoles,
	searchRoles,
	saveCurrentRole,
} from '../Actions/RoleActions'
import { Card, StyledButton } from '../Common/Styles/StyledComponents'
import { useGetData, useSearch, useResetState } from '../Hooks/getData'
import { getAndSaveData } from '../Common/Functions/helperFunctions'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { saveAllAdmins } from '../Actions/AdminActions'

function RolesPage() {
	useResetState(saveCurrentRole)
	useResetState(saveAllAdmins)
	const [searchVal, setSearchVal] = useState()
	useGetData(`${API_URI}roles`, saveAllRoles)
	useSearch(searchVal, searchRoles)
	const { data } = useSelector((state) => state.authData)
	const permissions = data && data.role_id.permissions
	const { roles, filteredRoles } = useSelector((state) => state.rolesData)

	const currentData = searchVal === undefined ? roles : filteredRoles

	const params = {
		data: currentData,
		route: 'role',
		titles: ['Role Name', 'Posted on'],
		fields: ['name'],
		setSearchVal,
	}

	return (
		<ContentContainer
			title='Roles'
			value2={
				permissions && permissions.role.create ? (
					<Link to='/role/add'>Add Role</Link>
				) : null
			}
			justify='space-between'>
			<Card>
				<Table {...params} />
			</Card>
		</ContentContainer>
	)
}

export default RolesPage

const Link = styled(NavLink)`
	${StyledButton}
	padding: 5px 10px;
	width: fit-content;
	text-decoration: none;
	border-radius: 0px;
`
