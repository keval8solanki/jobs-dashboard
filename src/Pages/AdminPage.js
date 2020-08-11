import React, { useState } from 'react'
import CheckBox from '../Components/CheckBox'
import ContentContainer from '../Components/ContentContainer'
import { Card, EditNav, EditBtn, DeleteBtn, CardTitle } from '../Common/Styles/StyledComponents'
import { API_URI } from '../Endpoint'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { useGetData, useHeaders } from '../Hooks/getData'
import { useSelector } from 'react-redux'
import Tabs from '../Components/Tabs'
import RoleInfo from '../Components/RoleInfo'
import { saveCurrentAdmin } from '../Actions/AdminActions'
import Loader from '../Components/Loader'

function AdminPage({match}) {
    const headers = useHeaders()
    const [isDeleted, setIsDeleted] = useState(false)
    const id = match.params.id
    const {data} = useSelector(state => state.authData)
    const permissions = data && data.authData.role_id.permissions

    useGetData(`${API_URI}admin/${id}`, saveCurrentAdmin)
    const {admin} = useSelector(state => state.adminsData)
    if(admin){
        console.log(admin.role_id)
    }

    const deleteHandler = async () => {
        try {
            await axios.delete(`${API_URI}admin/${id}`, {headers})
            setIsDeleted(true)
        } catch (err) {
            console.log(err)
            setIsDeleted(false)
        }
    }

    const Buttons = (
        <div>
            {permissions && permissions.role.update ? <EditNav to={`/admin/edit/${id}`}><EditBtn>Edit</EditBtn></EditNav> : null}
            {permissions && permissions.role.delete ? <DeleteBtn onClick={deleteHandler} >Delete</DeleteBtn> : null}
        </div>
    )


    return (
        <ContentContainer
            title={admin ? admin.username : <Loader/>}
            value2={Buttons}
            justify="space-between"
        >


           {admin && <Card>
            
                <CardTitle>{admin.role_id.name}</CardTitle>
                <RoleInfo role={admin.role_id}/>

            </Card>}
            
            {isDeleted && <Redirect to="/admins" />}
        </ContentContainer>
    )
}

export default AdminPage

