import React, { useState } from 'react'
import ContentContainer from './ContentContainer'
import Controls from './Controls'
import {
	Btn,
	statuscolors,
	themeColor,
	Card,
	CardTitle,
	Title,
	noSpaces,
} from '../Common/Styles/StyledComponents'
import { toast } from '../Components/Toast'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import CloseSVG from '../Assets/Icons/close.svg'
import styled, { css } from 'styled-components'
import { Capitalize } from '../Common/Functions/helperFunctions'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CheckBox from './CheckBox'
import { useGetData, useHeaders } from '../Hooks/getData'
import { v4 } from 'uuid'

function InputRolesDetails({ match }) {
	const path = match.path
	const headers = useHeaders()
	const type = path.split('/')[2]
	const id = type === 'edit' ? match.params.id : ''
	useGetData(`${API_URI}role/${id}`)
	const { role } = useSelector((state) => state.rolesData)

	const text = Capitalize(type)

	const setValue = (field, defaultVal, field2) => {
		if (role && type === 'edit') {
			return role.permissions[field][field2]
		}

		return defaultVal
	}

	const [isDataChanged, setIsDataChanged] = useState(false)

	const [name, setName] = useState(role && role.name)
	const [jobCreate, setJobCreate] = useState(setValue('job', false, 'create'))
	const [jobUpdate, setJobUpdate] = useState(setValue('job', false, 'update'))
	const [jobRead, setJobRead] = useState(setValue('job', false, 'read'))
	const [jobDelete, setJobDelete] = useState(setValue('job', false, 'delete'))

	const [candidateCreate, setCandidateCreate] = useState(
		setValue('candidate', false, 'create')
	)
	const [candidateUpdate, setCandidateUpdate] = useState(
		setValue('candidate', false, 'update')
	)
	const [candidateRead, setCandidateRead] = useState(
		setValue('candidate', false, 'read')
	)
	const [candidateDelete, setCandidateDelete] = useState(
		setValue('candidate', false, 'delete')
	)

	const [adminCreate, setAdminCreate] = useState(
		setValue('admin', false, 'create')
	)
	const [adminUpdate, setAdminUpdate] = useState(
		setValue('admin', false, 'update')
	)
	const [adminRead, setAdminRead] = useState(setValue('admin', false, 'read'))
	const [adminDelete, setAdminDelete] = useState(
		setValue('admin', false, 'delete')
	)

	const [roleCreate, setRoleCreate] = useState(
		setValue('role', false, 'create')
	)
	const [roleUpdate, setRoleUpdate] = useState(
		setValue('role', false, 'update')
	)
	const [roleRead, setRoleRead] = useState(setValue('role', false, 'read'))
	const [roleDelete, setRoleDelete] = useState(
		setValue('role', false, 'delete')
	)

	const [btnText, setBtnText] = useState(text)

	const isInputValid = name

	const resetHandler = () => {
		setName(role && role.name)
		setJobCreate(setValue('job', false, 'create'))
		setJobUpdate(setValue('job', false, 'update'))
		setJobRead(setValue('job', false, 'read'))
		setJobDelete(setValue('job', false, 'delete'))

		setCandidateCreate(setValue('candidate', false, 'create'))
		setCandidateUpdate(setValue('candidate', false, 'update'))
		setCandidateRead(setValue('candidate', false, 'read'))
		setCandidateDelete(setValue('candidate', false, 'delete'))

		setAdminCreate(setValue('admin', false, 'create'))
		setAdminUpdate(setValue('admin', false, 'update'))
		setAdminRead(setValue('admin', false, 'read'))
		setAdminDelete(setValue('admin', false, 'delete'))

		setRoleCreate(setValue('role', false, 'create'))
		setRoleUpdate(setValue('role', false, 'update'))
		setRoleRead(setValue('role', false, 'read'))
		setRoleDelete(setValue('role', false, 'delete'))

		document.getElementById('name').focus()
	}

	const jobsInputData = [
		{
			control: 'Create',
			val: jobCreate,
			setVal: setJobCreate,
		},
		{
			control: 'Update',
			val: jobUpdate,
			setVal: setJobUpdate,
		},
		{
			control: 'Read',
			val: jobRead,
			setVal: setJobRead,
		},
		{
			control: 'Delete',
			val: jobDelete,
			setVal: setJobDelete,
		},
	]

	const candidatesInputData = [
		{
			control: 'Create',
			val: candidateCreate,
			setVal: setCandidateCreate,
		},
		{
			control: 'Update',
			val: candidateUpdate,
			setVal: setCandidateUpdate,
		},
		{
			control: 'Read',
			val: candidateRead,
			setVal: setCandidateRead,
		},
		{
			control: 'Delete',
			val: candidateDelete,
			setVal: setCandidateDelete,
		},
	]

	const adminsInputData = [
		{
			control: 'Create',
			val: adminCreate,
			setVal: setAdminCreate,
		},
		{
			control: 'Update',
			val: adminUpdate,
			setVal: setAdminUpdate,
		},
		{
			control: 'Read',
			val: adminRead,
			setVal: setAdminRead,
		},
		{
			control: 'Delete',
			val: adminDelete,
			setVal: setAdminDelete,
		},
	]

	const rolesInputData = [
		{
			control: 'Create',
			val: roleCreate,
			setVal: setRoleCreate,
		},
		{
			control: 'Update',
			val: roleUpdate,
			setVal: setRoleUpdate,
		},
		{
			control: 'Read',
			val: roleRead,
			setVal: setRoleRead,
		},
		{
			control: 'Delete',
			val: roleDelete,
			setVal: setRoleDelete,
		},
	]

	const renderTicks = (data) => {
		return data.map((item) => {
			return (
				<CheckBoxContainer key={v4()}>
					<CheckBox {...item} />
					<CheckBoxText>{item.control}</CheckBoxText>
				</CheckBoxContainer>
			)
		})
	}

	const sendDataHandler = async () => {
		setBtnText(`${text}ing...`)
		resetHandler()
		const data = {
			name,
			permissions: {
				job: {
					create: jobCreate,
					update: jobUpdate,
					read: jobRead,
					delete: jobDelete,
				},

				candidate: {
					create: candidateCreate,
					update: candidateUpdate,
					read: candidateRead,
					delete: candidateDelete,
				},
				admin: {
					create: adminCreate,
					update: adminUpdate,
					read: adminRead,
					delete: adminDelete,
				},
				role: {
					create: roleCreate,
					update: roleUpdate,
					read: roleRead,
					delete: roleDelete,
				},
			},
		}
		const request =
			type === 'edit'
				? axios.patch(`${API_URI}role/${id}`, data, { withCredentials: true })
				: axios.post(`${API_URI}role`, data, { withCredentials: true })
		try {
			const response = await request
			setIsDataChanged(true)
			toast.success('Role Added succesfully', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
			setBtnText(text)
		} catch (err) {
			toast.error('Error in adding role', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
			setBtnText(text)
		}
	}

	const Buttons = (
		<div>
			<Btn color={statuscolors.failed} onClick={resetHandler}>
				Reset
			</Btn>
			<Btn
				color={statuscolors.success}
				disabled={!isInputValid}
				onClick={sendDataHandler}>
				{btnText}
			</Btn>
		</div>
	)

	return (
		<ContentContainer title={`${text} Role`}>
			<Controls title={`${text} Controls`}>{Buttons}</Controls>

			<Card>
				<Section>
					<CardTitle>Role Details</CardTitle>
					<InputContainer>
						<Label>Role Name</Label>
						<Input
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							type='text'
						/>
					</InputContainer>

					<PermissionContainer>
						<InputContainer>
							<Label>Job Permissions</Label>
							{renderTicks(jobsInputData)}
						</InputContainer>

						<InputContainer>
							<Label>Candidate Permissions</Label>
							{renderTicks(candidatesInputData)}
						</InputContainer>

						<InputContainer>
							<Label>Admin Permissions</Label>
							{renderTicks(adminsInputData)}
						</InputContainer>

						<InputContainer>
							<Label>Role Permissions</Label>
							{renderTicks(rolesInputData)}
						</InputContainer>
					</PermissionContainer>
				</Section>
			</Card>

			{isDataChanged && <Redirect to='/roles' />}
		</ContentContainer>
	)
}

export default InputRolesDetails

const PermissionContainer = styled.div`
	display: flex;
`

const InputContainer = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	margin: 0px 0px 10px 0px;
`
const Label = styled.label`
	/* font-weight: bold; */
	color: grey;
`

const InputStyles = css`
	padding: 5px 12px;
	margin: 10px 0px 0px 0px;
	border: 1px solid #00000017;
	border-radius: 5px;
	&:focus {
		outline: none;
	}
`

const Textarea = styled.textarea`
	${InputStyles}
	font-size: 1.5em;

	font-weight: bold;
	padding: 3px 0px;
	border-radius: 0px;
	border-style: none;
	border-bottom: 1px solid #00000017;
	transition: all 0.5s;
	&:focus {
		border-bottom: 1px solid ${themeColor};
	}
`
const Input = styled.input`
	${InputStyles}
	font-size: 1.5em;
	font-weight: bold;
	padding: 3px 0px;
	border-radius: 0px;
	border-style: none;
	border-bottom: 1px solid #00000017;
	transition: all 0.5s;
	&:focus {
		border-bottom: 1px solid ${themeColor};
	}
`

const InfoCardContainer = styled.div`
	display: flex;
`

const Form = styled.div`
	display: flex;
	flex-direction: column;
`

const InputWithButton = styled.form`
	width: 100%;
	margin-top: 10px;
	display: flex;
	justify-content: stretch;
	align-items: center;
`

const AddButton = styled.button`
	border-style: none;
	color: white;
	border: 1px solid ${themeColor};
	background-color: ${themeColor};
	padding: 5px 8px;
	&:focus {
		outline: none;
	}

	&:hover {
		background-color: transparent;
		color: ${themeColor};
	}
	border-radius: 0px 5px 5px 0px;
`

const CustomInput = styled.input`
	${InputStyles}
	margin: 0px;
	flex: 1;
	font-size: 1.5em;
	font-weight: bold;
	padding: 3px 0px;
	border-radius: 0px;
	border-style: none;
	border-bottom: 1px solid #00000017;
	transition: all 0.5s;
	&:focus {
		border-bottom: 1px solid ${themeColor};
	}
`

const RequirementCard = styled(Card)`
	height: 270px;
	width: 200px;
	overflow-y: scroll;
`

const Ul = styled.ul`
	border: 1px dashed ${statuscolors.reviewBg};
	padding: 10px;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`

const Element = styled.li`
	display: flex;
	align-items: center;
	margin: 0px 10px 10px 0px;
	padding: 2px 10px;
	border-radius: 10px;
	border: 1px solid ${themeColor};
	color: ${themeColor};
	width: fit-content;
`

const ElementP = styled.p`
	margin: 0px;
	padding: 0px;
`

const Icon = styled.img`
	margin-left: 10px;
`

const CustomLabel = styled(CardTitle)`
	background-color: white;
	position: sticky;
	top: 0;
`

const MainTitle = styled(Title)`
	margin-top: 20px;
	margin-left: 20px;
`

const ControlCard = styled(Card)`
	position: sticky;
	top: 10px;
	display: flex;
	justify-content: space-between;
	height: 20px;
`

//added
const Section = styled.div`
	padding-bottom: 40px;
`

const EmptyMessage = styled.p`
	margin: 0px;
	padding: 0px;
	font-weight: bold;
	font-size: 0.8em;
	color: ${statuscolors.failed};
`

const CheckBoxText = styled.p`
	${noSpaces}
	font-weight: bold;
	margin-left: 10px;
`

const CheckBoxContainer = styled.div`
	padding: 3px 0px;
	width: fit-content;
	display: flex;
	align-items: center;
`
