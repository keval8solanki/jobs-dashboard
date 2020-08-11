import React, { useState } from 'react'
import styled from 'styled-components'
import SearchComponent from './SearchComponent'
import { NavLink } from 'react-router-dom'
import { Status, statuscolors } from '../Common/Styles/StyledComponents'
import { statusColor, statusFinder } from '../Common/Functions/helperFunctions'
import Loader from './Loader'

function Table({
	data,
	route,
	fields,
	titles,
	setSearchVal,
	stop,
	selected,
	extra,
}) {
	const [currentID, setCurrentID] = useState()
	const setId = (id) => {
		if (selected) {
			selected(id)
			setCurrentID(id)
		}
	}

	const renderfield = (item, field) => {
		switch (field) {
			case 'status':
				return (
					<Status {...statusColor(statusFinder(item, extra))}>
						{statusFinder(item, extra)}
					</Status>
				)

			case 'role':
				return item.role_id.name

			case 'total':
				return item.jobs.length
			default:
				return item[field]
		}
	}

	const renderElement = (item) => {
		return fields.map((field) => (
			<Element key={field}>{renderfield(item, field)}</Element>
		))
	}

	const renderTitle = () => {
		return titles.map((item) => (
			<HeadingElement key={item}>{item}</HeadingElement>
		))
	}

	function renderLoader() {
		return titles.map((el) => (
			<Element key={el}>
				<Loader />
			</Element>
		))
	}

	const renderList = () => {
		if (data) {
			const list = data.map((item) => {
				const Link = !stop && `/${route}/${item._id}`
				const date = new Date(item.createdAt).toDateString()

				return (
					<StyledNavlink
						onClick={() => stop && setId(item._id)}
						key={item._id}
						to={Link}>
						<List
							style={
								currentID === item._id
									? {
											backgroundColor: statuscolors.successBg,
									  }
									: null
							}>
							{renderElement(item)}
							<Element>{date}</Element>
						</List>
					</StyledNavlink>
				)
			})

			if (list.length > 0) {
				return list
			}

			return 'No Data'
		} else {
			return <List>{renderLoader()}</List>
		}
	}

	const renderTable = () => {
		return (
			<UnorderedList>
				<List>{renderTitle()}</List>
				{renderList()}
			</UnorderedList>
		)
	}

	return (
		<div>
			<SearchComponent setValue={setSearchVal} />
			{renderTable()}
		</div>
	)
}

export default Table

const List = styled.li`
	display: flex;
	justify-content: space-between;
	padding: 10px 10px;
	border-bottom: 1px solid #0000001f;
	transition: all 0.4s;
	cursor: pointer;
`

const Element = styled.div`
	flex: 1;
	margin: 0px;
	padding: 0px;
`

const StyledNavlink = styled(NavLink)`
	text-decoration: none;
	color: black;
	&:hover {
		text-decoration: none;
	}
`

const UnorderedList = styled.ul`
	list-style: none;
	margin: 0px;
	margin-top: 10px;
	padding: 0px;
`

const HeadingElement = styled(Element)`
	font-weight: bold;
	opacity: 0.7;
`
