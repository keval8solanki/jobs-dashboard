import React, { useState, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Title, Card, FlexDiv, StyledButton, Status, LoadingIcon } from '../Common/Styles/StyledComponents'
import SearchComponent from '../Components/SearchComponent'
import { saveAllCandidates, searchCandidates, saveCurrentCandidate } from '../Actions/CandidateActions'
import TableComponent from '../Components/TableComponent'
import styled, { css } from 'styled-components'
import { NavLink, useLocation, Redirect } from 'react-router-dom'
import JobCard from '../Components/JobCard'
import LocationSVG from '../Assets/Icons/location.svg'
import { saveCurrentJob } from '../Actions/JobsActions'
import { API_URI } from '../Endpoint'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../Assets/Icons/loader.svg'
import 'react-toastify/dist/ReactToastify.css';
import { statusColor } from '../Common/Functions/helperFunctions'
toast.configure()



function JobDetailsPage(props) {
    const [searchVal, setSearchVal] = useState()
    const [activeTab, setActiveTab] = useState(1)
    const [allCandidates, setAllCandidates] = useState()
    const [isJobDeleted, setIsJobDeleted] = useState(false)
    const dispatch = useDispatch()
    const { job } = useSelector(state => state.jobsData)





    useLayoutEffect(() => {
        dispatch(saveAllCandidates(job && job.user))
        if (searchVal !== undefined) {
            dispatch(searchCandidates(searchVal))
        }
    }, [searchVal, job])

    const { candidates, filteredcandidates } = useSelector(state => state.candidateData)
    console.log(candidates)
    const currentData = searchVal === undefined ? candidates : filteredcandidates

    console.log(currentData)
    const id = props.match.params.id
    const editURL = `edit/${id}`

    const deleteJobHandler = async () => {
        try {
            await axios.delete(`${API_URI}${job && job._id}`)
            setIsJobDeleted(true)
            toast.success('Job deleted succesfully', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        } catch (err) {
            toast.error('Error in job deletion', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }
    }


    const getDataHandler = async (id) => {

        console.log(job.user)

        const currentCandidate = job.user.find(item => {
            return item._id === id
        })

        console.log(currentCandidate)
        dispatch(saveCurrentCandidate(currentCandidate))
    }

    const renderList = (data) => {
        if (data) {
            if (data.length > 0) {
                return data.map(item => <li key={item}>{item}</li>)
            }
            return 'No data'
        }
    }



    const renderItemList = () => {
        if (currentData) {
            const list = currentData.map(item => {

                const date = new Date(item.createdAt).toDateString()

                return <StyledNavlink key={item._id} to={`/candidate/${item._id}`}>
                    <List onClick={() => getDataHandler(item._id)} >
                        <Element>{item.name}</Element>
                        <Element>{item.number}</Element>
                        <Element><Status {...statusColor(item.jobs[0].status)}>{item.jobs[0].status}</Status> </Element>
                        <Element>{date}</Element>
                    </List>
                </StyledNavlink>
            })

            if (list.length > 0) {
                return list
            } else {
                return <p style={{ margin: '0px', padding: '0px', marginTop: '10px' }}>No Data</p>
            }
        }
        return <List>
            <Element><LoadingIcon src={Loader} /></Element>
            <Element><LoadingIcon src={Loader} /></Element>
            <Element><LoadingIcon src={Loader} /></Element>
            <Element><LoadingIcon src={Loader} /></Element>
        </List>
    }

    const renderTable = () => {
        if (filteredcandidates && filteredcandidates.length === 0) {
            return <p>No Result found for {searchVal}.</p>
        }
        return <UnorderedList>
            <List>
                <HeadingElement>Name</HeadingElement>
                <HeadingElement>Contact No.</HeadingElement>
                <HeadingElement>Status</HeadingElement>
                <HeadingElement>Applied on</HeadingElement>
            </List>


            {renderItemList()}

        </UnorderedList>

    }


    const renderTab = () => {

        switch (activeTab) {
            case 1:
                return <CustomCard>
                    <SearchComponent setValue={setSearchVal} />

                    {renderTable()}

                </CustomCard>

            case 2:
                return <CustomCard>

                    <FlexHeader>
                        <div>
                            <Heading>Company</Heading>
                            <Company>{job && job.company}</Company>
                        </div>
                        <Location><img src={LocationSVG} /> {job && job.location}</Location>
                    </FlexHeader>

                    <Section>
                        <Heading>Description</Heading>
                        <p>{job && job.description}</p>
                    </Section>
                    <Section>
                        <p><Heading>Salary:</Heading> {job && job.salary}</p>
                        <p><Heading>Experience:</Heading> {job && job.experience}</p>

                    </Section>
                    <Section>
                        <Heading>Eligibilities</Heading>
                        <Ul>
                            {renderList(job && job.eligibility)}
                        </Ul>
                    </Section>

                    <Section>
                        <Heading>Responsiblities</Heading>
                        <Ul>
                            {renderList(job && job.responsibilities)}
                        </Ul>
                    </Section>

                    <Section>
                        <Heading>About</Heading>
                        <p>{job && job.aboutCompany}</p>
                    </Section>
                </CustomCard>

            default:
                break;
        }
    }
    const renderTitle = () => {
        if (job) {
            return job.title
        }

        return <LoadingIcon src={Loader} />
    }

    return (
        <Container>

            <FlexDiv>
                <Title>{renderTitle()}</Title>
                <Div>
                    <EditNav to={editURL}><EditBtn>Edit</EditBtn></EditNav>
                    <DeleteBtn onClick={deleteJobHandler} >Delete</DeleteBtn>
                </Div>
            </FlexDiv>

            <ButtonContainer>
                <Tab color={activeTab === 1 ? 'white' : '#ffffff66'} onClick={() => setActiveTab(1)}>Applicant List</Tab>
                <Tab color={activeTab === 2 ? 'white' : '#ffffff66'} onClick={() => setActiveTab(2)}>Job Details</Tab>
            </ButtonContainer>
            {renderTab()}



            {isJobDeleted && <Redirect to="/jobs" />}
        </Container >
    )
}

export default JobDetailsPage

const Container = styled.div`
    flex: 2;
`

const CustomCard = styled(Card)`
    margin: 0px 20px 20px 20px;
    flex: 1;   
`
const Div = styled.div`

`

const EditNav = styled(NavLink)`
   text-decoration: none;
   color: white;

`

const EditBtn = styled.button`
    ${StyledButton}
    margin-left: 10px;
    padding: 5px 10px;
    width: fit-content;
    border-radius: 0px;
`

const DeleteBtn = styled.button`
    font-weight: bold;
    border-style: none;
    border: 1px solid red;
    color: red;
    background-color: transparent;
    margin-left: 10px;
    padding: 5px 10px;
    width: fit-content;
    &:hover{
        background-color: red;
        color: white;
    }

    &:focus{
        outline: none;
    }
`

const ButtonContainer = styled.div`
    text-align: left;
    padding: 0px 0px 0px 20px;
    margin: 20px 0px 0px 0px;
`

const Tab = styled.button`
    font-weight: bold;
    width: 150px;
    padding: 10px 10px;
    border-style: none;
    background-color: ${props => props && props.color};
    box-shadow: -1px -1px 6px 0px #0000001f;
    &:focus{
        outline: none;
    }
`
const RemoveSpacing = css`
    margin: 0px;
    padding: 0px;
`
const FlexHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-bottom: 10px;
    border-bottom: 1px solid #0000001a;
`

const Section = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid #0000001a;
`

const Heading = styled.p`
    ${RemoveSpacing}
    font-weight: bold;
    font-size: 0.8em;
    color: #00000063;

`

const Company = styled.p`
    ${RemoveSpacing}
        font-weight: bold;
    font-size: 1.5em;

`

const Location = styled.p`
    ${RemoveSpacing}
    opacity: 0.5;
`

const Ul = styled.ul`
    padding: 0px;
    margin: 10px 0px 0px 15px;

`



const UnorderedList = styled.ul`

    list-style: none;
    margin: 0px;
    margin-top: 10px;
    padding: 0px;
`
const List = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    border-bottom: 1px solid #0000001f;
    cursor: pointer;
`


const Element = styled.p`
    flex: 1;
    margin: 0px;
    padding: 0px;
`
const HeadingElement = styled(Element)`
    font-weight: bold;
    opacity: 0.7;
`

const StyledNavlink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &:hover{
        text-decoration: none;
    }

`

