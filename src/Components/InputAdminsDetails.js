import React, { useState } from 'react'
import ContentContainer from './ContentContainer'
import Controls from './Controls'
import { Btn, statuscolors, themeColor, Card, CardTitle, Title, noSpaces } from '../Common/Styles/StyledComponents'
import { toast } from '../Components/Toast'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import CloseSVG from '../Assets/Icons/close.svg'
import styled, { css } from 'styled-components'
import { Capitalize } from '../Common/Functions/helperFunctions'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CheckBox from './CheckBox'
import { useGetData, useSearch, useHeaders } from '../Hooks/getData'
import { saveAllAdmins, saveCurrentAdmin } from '../Actions/AdminActions'
import { saveAllRoles, searchRoles } from '../Actions/RoleActions'
import Table from './Table'


function InputAdminsDetails({ match }) {

    const path = match.path
    const [searchVal, setSearchVal] = useState()

    const type = path.split('/')[2]
    const id = type === 'edit' ? match.params.id : ''
    useGetData(`${API_URI}admin/${id}`, saveCurrentAdmin)
    useGetData(`${API_URI}roles`, saveAllRoles)
    useSearch(searchVal, searchRoles)

    const headers = useHeaders()

    const { admin } = useSelector(state => state.adminsData)
    console.log(admin)
    const { roles, filteredRoles } = useSelector(state => state.rolesData)
    let currentData = searchVal === undefined ? roles : filteredRoles

    console.log(roles)
    const [username, setUsername] = useState(admin && admin.username)
    const [password, setPassword] = useState(admin && admin.password)
    const text = Capitalize(type)

    const setValue = (field, defaultVal, field2) => {
        if(admin && type === 'edit'){
            // return role.permissions[field][field2]
        }

        return defaultVal
    }

    const [isDataChanged, setIsDataChanged] = useState(false)
    const [selectedRole, setSelectedRole] = useState(admin && admin.role_id)
 

    const [btnText, setBtnText] = useState(text)


    const isInputValid = username && password && selectedRole 

    const resetHandler = () => {
    
        document.getElementById('username').focus()
    }

    
    const sendDataHandler = async () => {
        setBtnText(`${text}ing...`)
        resetHandler()
        const data = {
            username,
            password,
            role_id: selectedRole
        }
        console.log(data)
        const request = type === 'edit' ? axios.patch(`${API_URI}admin/${id}`, data, {headers}) : axios.post(`${API_URI}admin`, data , {headers})
        try {
            const response = await request
            setIsDataChanged(true)
            toast.success('Admin Added succesfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setBtnText(text)
        } catch (err) {
            console.log(err)
            toast.error('Error in adding admin', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setBtnText(text)
        }

    }



    const Buttons = (
        <div>
            <Btn color={statuscolors.failed} onClick={resetHandler}>Reset</Btn>
            <Btn color={statuscolors.success} disabled={!isInputValid} onClick={sendDataHandler}>{btnText}</Btn>
        </div>
    )

    const params = {
        data: currentData,
        route: 'role',
        titles: ['Role Name', 'Posted on'],
        fields: ['name'],
        setSearchVal,
        stop: true,
        selected: setSelectedRole,
    }

    return (
        <ContentContainer title={`${text} Admin`}>

            <Controls title={`${text} Controls`}>
                {Buttons}
            </Controls>

            <Card>
                <Section>
                    <CardTitle>Admin Details</CardTitle>
                    <InputContainer>
                        <Label>Username</Label>
                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                        <Label>Password</Label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                    </InputContainer>
                </Section>
            </Card>
        
            <Card>
                <Table {...params} />
            </Card>

            {isDataChanged && <Redirect to="/admins" />}
        </ContentContainer>
    )
}



export default InputAdminsDetails

const PermissionContainer = styled.div`
    display: flex;
`

const InputContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    margin: 0px 0px 0px 0px;
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
    &:focus{
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
    &:focus{
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
    &:focus{
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
    display:flex;
    justify-content: stretch;
    align-items: center;
    
`


const AddButton = styled.button`
    border-style: none;
    color: white;
    border: 1px solid ${themeColor};
    background-color: ${themeColor};
    padding: 5px 8px;
    &:focus{
        outline: none;
    }

    &:hover{
        background-color: transparent;
        color: ${themeColor}
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
    &:focus{
    border-bottom: 1px solid ${themeColor};
        
    }
`

const RequirementCard = styled(Card)`
    height: 270px;
    width: 200px;
    overflow-y: scroll;
`

const Ul = styled.ul`
    border:1px dashed ${statuscolors.reviewBg};   
    padding: 10px;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const Element = styled.li`
    
    display: flex;
    align-items: center;
    margin: 0px 10px 10px 0px;
    padding:2px 10px;
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
    /* padding-bottom: 40px; */
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