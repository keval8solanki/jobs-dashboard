import React, { useState } from 'react'
import { Card, Title, CardTitle, statuscolors, themeColor } from '../Common/Styles/StyledComponents'
import styled, { css } from 'styled-components'
import CloseSVG from '../Assets/Icons/close.svg'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'



import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function EditJobPage() {

    const { job } = useSelector(state => state.jobsData)
    console.log(job)

    const [isUpdated, setIsUpdated] = useState(false)

    const [title, setTitle] = useState(job && job.title)
    const [salary, setSalary] = useState(job && job.salary)
    const [description, setDescription] = useState(job && job.description)

    const [company, setCompany] = useState(job && job.company)
    const [aboutCompany, setAboutCompany] = useState(job && job.aboutCompany)
    const [location, setLocation] = useState(job && job.location)

    const [experience, setExperience] = useState(job && job.experience)

    const [eligibilitiesVal, setEligibilitiesVal] = useState()
    const [eligibilities, setEligibilities] = useState((job && job.eligibility) || [])

    const [responsibilitiesVal, setResponsibilitiesVal] = useState()
    const [responsibilities, setResponsibilities] = useState((job && job.responsibilities) || [])

    const isInputValid = title && description && company && aboutCompany && location && experience && eligibilities.length > 0 && responsibilities.length > 0

    const [updateText, setUpdateText] = useState('Update')


    const resetHandler = () => {
        setTitle(job && job.title)
        setSalary(job && job.salary)
        setDescription(job && job.description)
        setCompany(job && job.company)
        setLocation(job && job.location)
        setAboutCompany(job && job.aboutCompany)
        setExperience(job && job.experience)
        setEligibilities(job && job.eligibility)
        setEligibilitiesVal('')
        setResponsibilities(job && job.responsibilities)
        setEligibilitiesVal('')
        document.getElementById('update-title').focus()
    }

    const updateHandler = async () => {
        setUpdateText('Updating...')
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
            const response = await axios.put(`${API_URI}${job && job._id}`, data)
            setIsUpdated(true)
            toast.success('Job Updated succesfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setUpdateText('Update')
        } catch (err) {
            toast.error('Error in job  succesfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setUpdateText('Update')
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
        <div>
            <MainTitle>Update Job</MainTitle>
            <Form>
                <ControlCard>
                    <CardTitle>Controls</CardTitle>
                    <div>
                        <Btn color={statuscolors.failed} onClick={resetHandler} >Reset</Btn>
                        <Btn color={statuscolors.success} disabled={!isInputValid} onClick={updateHandler}>{updateText}</Btn>
                    </div>
                </ControlCard>
                {/* <InfoCardContainer> */}
                <Card>
                    <CardTitle>Job Details</CardTitle>
                    <InputContainer>
                        <Label>Job Title</Label>
                        <Input id="update-title" value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
                    </InputContainer>
                    <InputContainer>
                        <Label>Salary</Label>
                        <Input value={salary} onChange={(e) => setSalary(e.target.value)} type="text" />
                    </InputContainer>
                    <InputContainer>
                        <Label>Description</Label>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
                    </InputContainer>
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
                    <CardTitle>Requirements</CardTitle>
                    <InputContainer>
                        <Label>Experience</Label>
                        <Input value={experience} onChange={(e) => setExperience(e.target.value)} type="text" />
                    </InputContainer>
                    <InputContainer>
                        <Label>Eligibility</Label>
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

                    </RequirementCard>
                </InfoCardContainer> */}

            </Form>
            {isUpdated && <Redirect to="/jobs" />}
        </div>
    )
}

export default EditJobPage

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
    margin-top: 10px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    
`

const AddButton = styled.button`
    border-style: none;
    color: white;
    background-color: green;
    padding: 5px 8px;
    &:focus{
        outline: none;
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