import React, { useState } from 'react'
import { Card, Title, CardTitle, Container, statuscolors, themeColor } from '../Common/Styles/StyledComponents'
import styled, { css } from 'styled-components'
import CloseSVG from '../Assets/Icons/close.svg'
import axios from 'axios'
import { API_URI } from '../Endpoint'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom'
toast.configure()


/*
title text
description textarea
salary text

experience text
responsibilities array
eligibility array

company text
aboutCompany text
location text

*/



function PostJob() {

    const [isJobPosted, setIsJobPosted] = useState(false)

    const [title, setTitle] = useState()
    const [salary, setSalary] = useState()
    const [description, setDescription] = useState()

    const [company, setCompany] = useState()
    const [aboutCompany, setAboutCompany] = useState()
    const [location, setLocation] = useState()

    const [experience, setExperience] = useState()

    const [eligibilitiesVal, setEligibilitiesVal] = useState()
    const [eligibilities, setEligibilities] = useState([])

    const [responsibilitiesVal, setResponsibilitiesVal] = useState()
    const [responsibilities, setResponsibilities] = useState([])
    const [postText, setPostText] = useState('Post')
    const isInputValid = title && description && company && aboutCompany && location && experience && eligibilities.length > 0 && responsibilities.length > 0


    const resetHandler = () => {
        setTitle('')
        setSalary('')
        setDescription('')
        setCompany('')
        setLocation('')
        setAboutCompany('')
        setExperience('')
        setEligibilities([])
        setEligibilitiesVal('')
        setResponsibilities([])
        setEligibilitiesVal('')
        document.getElementById('title').focus()
    }

    const postHandler = async () => {
        setPostText('Posting...')
        resetHandler()
        const data = {
            title,
            salary: salary ? salary : 'Not disclosed',
            description,
            company,
            aboutCompany,
            location,
            experience,
            eligibility: eligibilities,
            responsibilities
        }
        console.log(data)
        try {
            const response = await axios.post(`${API_URI}create`, data)
            setIsJobPosted(true)
            toast.success('Job Posted succesfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setPostText('Post')
        } catch (err) {
            console.log(err)
            toast.error('Error in posting job', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setPostText('Post')
        }

    }

    const deleteItemHandler = (data, item, setCurrState) => {
        const FilteredData = data.filter(el => el !== item)
        setCurrState(FilteredData)
    }

    const renderList = (data, setCurrState) => {
        const list = data.map(item => {
            return <Element key={item}>
                <ElementP>{item}</ElementP>
                <Icon onClick={() => deleteItemHandler(data, item, setCurrState)} src={CloseSVG} />
            </Element>
        })

        return list.length > 0 ? list : <EmptyMessage>Empty</EmptyMessage>
    }

    const addHandler = (currState, setCurrState, item) => {
        const TEMP = [...currState]
        TEMP.push(item)
        setCurrState(TEMP)
        setEligibilitiesVal('')
        setResponsibilitiesVal('')
    }


    return (

        <Container>
            <Form>

                <MainTitle>Post Job</MainTitle>
                <ControlCard>
                    <CardTitle>Controls</CardTitle>
                    <div>
                        <Btn color={statuscolors.failed} onClick={resetHandler}>Reset</Btn>
                        <Btn color={statuscolors.success} disabled={!isInputValid} onClick={postHandler}>{postText}</Btn>
                    </div>
                </ControlCard>
                {/* <InfoCardContainer> */}
                <Card>
                    <Section>
                        <CardTitle>Job Details</CardTitle>
                        <InputContainer>
                            <Label>Job Title</Label>
                            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Label>Salary</Label>
                            <Input value={salary} onChange={(e) => setSalary(e.target.value)} type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Label>Description</Label>
                            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
                        </InputContainer>
                    </Section>

                    <Section>
                        <CardTitle>Company Details</CardTitle>
                        <InputContainer>
                            <Label>Name</Label>
                            <Input value={company} onChange={(e) => setCompany(e.target.value)} type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Label>Location</Label>
                            <Input value={location} onChange={(e) => setLocation(e.target.value)} type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Label>About</Label>
                            <Textarea value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)} type="text" />
                        </InputContainer>
                    </Section>

                    <Section>
                        <CardTitle>Requirements</CardTitle>
                        <InputContainer>
                            <Label>Experience</Label>
                            <Input value={experience} onChange={(e) => setExperience(e.target.value)} type="text" />
                        </InputContainer>
                        <InputContainer>
                            <Label>Minimum qualifications</Label>
                            <InputWithButton onSubmit={(e) => {
                                e.preventDefault()
                                addHandler(eligibilities, setEligibilities, eligibilitiesVal)
                            }}
                            >
                                <CustomInput value={eligibilitiesVal} onChange={(e) => setEligibilitiesVal(e.target.value)} type="text" />
                                <AddButton >Add</AddButton>
                            </InputWithButton>
                            <Ul>
                                {renderList(eligibilities, setEligibilities)}
                            </Ul>
                        </InputContainer>
                        <InputContainer>
                            <Label>Responsibilities</Label>
                            <InputWithButton onSubmit={(e) => {
                                e.preventDefault()
                                addHandler(responsibilities, setResponsibilities, responsibilitiesVal)
                            }}>
                                <CustomInput value={responsibilitiesVal} onChange={(e) => setResponsibilitiesVal(e.target.value)} type="text" />
                                <AddButton>Add</AddButton>
                            </InputWithButton>
                            <Ul>

                                {renderList(responsibilities, setResponsibilities)}

                            </Ul>

                        </InputContainer>
                    </Section>
                </Card>
                {/* <RequirementCard>
                        <CardTitle>Eligibility</CardTitle>
                        <Ul>
                            {renderList(eligibilities, setEligibilities)}
                        </Ul>
                        <CustomLabel>Responsibilities</CustomLabel>
                        <Ul>

                            {renderList(responsibilities, setResponsibilities)}

                        </Ul>

                    </RequirementCard> */}
                {/* </InfoCardContainer> */}

            </Form>
            {isJobPosted && <Redirect to="/jobs" />}

        </Container>
    )
}

export default PostJob

const InputContainer = styled.div`
    display: flex;
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
//Changes
const Btn = styled.button`
    border-style: none;
    padding: 7px 10px;
    width: 130px;
    margin-right: 10px;
    color: white;
    border: 1px solid ${props => props && props.color};
    background-color: ${props => props && props.color};
    &:hover{
        background-color: transparent;
        color: ${props => props && props.color};
    }
    &:focus{
        outline: none;
    }

    &:disabled{
        opacity: 0.3;
        cursor: not-allowed;
    }
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
    color: ${statuscolors.failed}
`