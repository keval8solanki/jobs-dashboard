import React, { useState, useEffect } from 'react'
import CheckBox from '../Components/CheckBox'
import ContentContainer from '../Components/ContentContainer'
import { Card, EditNav, EditBtn, DeleteBtn } from '../Common/Styles/StyledComponents'
import { API_URI } from '../Endpoint'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useGetData, useHeaders, useSearch } from '../Hooks/getData'
import { saveCurrentRole } from '../Actions/RoleActions'
import { useSelector, useDispatch } from 'react-redux'
import Tabs from '../Components/Tabs'
import RoleInfo from '../Components/RoleInfo'
import Table from '../Components/Table'
import { searchAdmins, saveAllAdmins } from '../Actions/AdminActions'
import {toast} from '../Components/Toast'
import Loader from '../Components/Loader'


function RolePage({match}) {
    const dispatch = useDispatch()
    const headers = useHeaders()
    const [addJob, setAddJob] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const id = match.params.id
    const {data} = useSelector(state => state.authData)
    const permissions = data && data.authData.role_id.permissions

    const [searchVal, setSearchVal] = useState()


    useGetData(`${API_URI}role/${id}`, saveCurrentRole)
    useSearch(searchVal,searchAdmins)


    const {role} = useSelector(state => state.rolesData)


    useEffect(() => {
        if (role) {
            
            dispatch(saveAllAdmins(role.admins))
        }
    }, [role]);
    
    const { admins, filteredAdmin } = useSelector(state => state.adminsData)
    const currentData = searchVal === undefined ?admins : filteredAdmin

    console.log(role)
    const deleteHandler = async () => {
        if(role && role.admins.length === 0){
            try {
                await axios.delete(`${API_URI}role/${id}`, {headers})
                setIsDeleted(true)
            } catch (err) {
                console.log(err)
                setIsDeleted(false)
            }
        } else {
        toast.error(<p style={{margin: '0px', padding:'0px'}}>Cannot Delete Role<br/>as it is assigned to admin(s)<br/>Please unassign and try again</p>)

        }

        
    }

    const Buttons = (
        <div>
            {permissions && permissions.role.update ? <EditNav to={`/role/edit/${id}`}><EditBtn>Edit</EditBtn></EditNav> : null}
            {permissions && permissions.role.delete ? <DeleteBtn onClick={deleteHandler} >Delete</DeleteBtn> : null}
        </div>
    )

    const params = {
        data: currentData,
        route: 'candidate',
        titles: ['Username', 'Created on'],
        fields: ['username'],
        setSearchVal,
        stop: true
    }

    const tabData = [
        {
            title: 'Admin Assigned',
            component:<Table {...params} />
        },
        {
            title: 'Role Info',
            component: <RoleInfo role={role}/>
        }
    ]

    
    return (
        <ContentContainer
            title={role ? role.name : <Loader/>}
            value2={Buttons}
            justify="space-between"
        >
            
            <Tabs data={tabData} /> 
            
            
            {isDeleted && <Redirect to="/roles" />}
        </ContentContainer>
    )
}

export default RolePage
