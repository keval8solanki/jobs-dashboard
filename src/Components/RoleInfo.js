import React from 'react'
import CheckBox from './CheckBox'
import styled from 'styled-components'
import { noSpaces } from '../Common/Styles/StyledComponents'
import {v4} from 'uuid'
function RoleInfo(props) {
    const {job, candidate, role , admin} = props.role && props.role.permissions



    const jobsInputData = [
        {
            control: 'Create',
            val:job.create,
            setVal:null,
            disabled: true
        },
        {
            control: 'Update',
            val:job.update,
            setVal:null,
            disabled: true
        },
        {
            control: 'Read',
            val:job.read,
            setVal:null,
            disabled: true
        },
        {
            control: 'Delete',
            val:job.delete,
            setVal:null,
            disabled: true
        }
    ]

    const candidatesInputData = [
        {
            control: 'Create',
            val:candidate.create,
            setVal:null,
            disabled: true
        },
        {
            control: 'Update',
            val:candidate.update,
            setVal:null,
            disabled: true
        },
        {
            control: 'Read',
            val:candidate.read,
            setVal:null,
            disabled: true
        },
        {
            control: 'Delete',
            val:candidate.delete,
            setVal:null,
            disabled: true
        }
    ]

    const adminsInputData = [
        {
            control: 'Create',
            val:admin.create,
            setVal:null,
            disabled: true
        },
        {
            control: 'Update',
            val:admin.update,
            setVal:null,
            disabled: true
        },
        {
            control: 'Read',
            val:admin.read,
            setVal:null,
            disabled: true
        },
        {
            control: 'Delete',
            val:admin.delete,
            setVal:null,
            disabled: true
        }
    ]

    const rolesInputData = [
        {
            control: 'Create',
            val:role.create,
            setVal:null,
            disabled: true
        },
        {
            control: 'Update',
            val:role.update,
            setVal:null,
            disabled: true
        },
        {
            control: 'Read',
            val:role.read,
            setVal:null,
            disabled: true
        },
        {
            control: 'Delete',
            val:role.delete,
            setVal:null,
            disabled: true
        }
    ]



    const renderTicks = (data) => {
        return data.map(item => {
            return <CheckBoxContainer key={v4()}>
                <CheckBox {...item}/>
                <CheckBoxText>{item.control}</CheckBoxText>
            </CheckBoxContainer>
        })
    }

    return (
        <div>
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
        </div>
    )
}

export default RoleInfo

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