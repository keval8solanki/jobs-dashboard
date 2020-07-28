import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { saveCurrentJob } from '../Actions/JobsActions'
import { Card, StyledButton, StyledNavlink } from '../Common/Styles/StyledComponents'
import ExpSVG from '../Assets/Icons/exp.svg'
import LocationSVG from '../Assets/Icons/location.svg'
import SalarySVG from '../Assets/Icons/salary.svg'
import { daysAgoCalculator } from '../Common/Functions/helperFunctions'
import InputComponent from './InputComponent'
import { API_URI } from '../Endpoint'
import axios from 'axios'

//name
//email,
//number
//education,
//skills,
//resume


function JobCard({ job, canApply }) {

    const [modal, setModal] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [education, setEducation] = useState('')
    const [skills, setSkills] = useState('')
    const [resume, setResume] = useState()

    const dispatch = useDispatch()

    const toggle = () => setModal(!modal);
    const { title, company, experience, salary, location, createdAt } = job

    const openDetailsHandler = () => {
        dispatch(saveCurrentJob(job))
    }

    // const isInputValid = name && email && contactNumber && education && skills

    const applyHandler = async () => {

        const data = {
            name,
            email,
            number: contactNumber,
            education,
            skills,
            jobs: {
                id: job._id,
                status: 'Applied'
            }
        }
        // console.log(resume)

        // // if (isInputValid) {
        // //     toggle()
        // // }

        // console.log(data)
        // console.log(formData)



    }



    const postMessage = () => {
        const date = new Date(createdAt)
        const days = daysAgoCalculator(date)
        if (days === 1) {
            return 'Yesterday'
        } else if (days === 0) {
            return 'Today'
        } else {
            return `${days} days ago`
        }
    }

    return (
        <Card onClick={openDetailsHandler}>
            <StyledNavlink to={`/job/${job._id}`}>
                <FlexDiv>
                    <DetailsContainer>
                        <JobTitle>{title}</JobTitle>
                        <Company>{company}</Company>
                        <Details><Icon src={ExpSVG} />  {experience}</Details>
                        <Details><Icon src={SalarySVG} /> {salary}</Details>
                        <Details><Icon src={LocationSVG} /> {location}</Details>
                    </DetailsContainer>


                </FlexDiv>
                <Posted>Posted: <MessageSpan>{postMessage()}</MessageSpan></Posted>
            </StyledNavlink>
        </Card>
    )
}

export default JobCard


// Styled Components


const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media (max-width: 500px){
        flex-direction: column;  
        align-items: flex-start; 
    }
`

const DetailsContainer = styled.div`

`

const ApplyButton = styled.button`
    ${StyledButton};
     @media (max-width: 500px){
        margin-top: 20px;
    }
`

const ButtonContainer = styled.div`

`


const MessageSpan = styled.span`
    color: black;
`

const Posted = styled.p`    
    margin: 10px 0px 0px 0px;
    padding: 10px 0px 0px 0px;
    color: grey;
    border-top: 1px solid #0000001f;
   
`

const Company = styled.p`
    margin: 10px 0px;
    padding: 0px;
    font-weight: bold;
`

const Icon = styled.img`
    margin-right: 10px;
`

const JobTitle = styled.h1`
    margin: 0px;
    padding: 0px;
`


const Details = styled.p`
opacity: 0.6;
    width: fit-content;
    text-align: left;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const CancelBtn = styled.button`
    color: red;
    padding: 5px 8px;
    width: 100px;
    border-radius: 0px;
        background-color:transparent;
    
    border: 1px solid red;

    transition: all 0.3s;

    &:hover{
        background-color: red;
        color: white;
    }
`

const SendBtn = styled.button`
    color: white;
    padding: 5px 8px;

    width: 100px;
    border-radius: 0px;
    background-color: green;
    border: 1px solid green;
     transition: all 0.3s;
    &:hover{
        background-color:transparent;
        color: green;
    }

    &:disabled{
        opacity: 0.3
    }
`

