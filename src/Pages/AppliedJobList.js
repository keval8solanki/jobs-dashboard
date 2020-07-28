import React, { useState, useLayoutEffect } from 'react'
import { Container, FlexDiv, Title, Card, StyledNavlink, LoadingIcon, themeColor } from '../Common/Styles/StyledComponents'
import { useSelector, useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'
import { API_URI } from '../Endpoint'
import axios from 'axios'
import { saveAllJobs, searchJobs, saveAppliedJobs, searchAppliedJobs } from '../Actions/JobsActions'
import SearchComponent from '../Components/SearchComponent'
import Loader from '../Assets/Icons/loader.svg'


function AppliedJobList() {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(1)
    const [searchVal, setSearchVal] = useState()
    const { candidate } = useSelector(state => state.candidateData)

    console.log(candidate)

    useLayoutEffect(() => {
        const URL = `${API_URI}user/${candidate && candidate._id}`
        axios.get(URL)
            .then(({ data }) => {
                console.log(data)
                dispatch(saveAppliedJobs(data.jobs))
            })
            .catch(err => console.log(err))

        if (searchVal !== undefined) {
            dispatch(searchAppliedJobs(searchVal))
        }
    }, [searchVal, candidate])

    const { appliedJobs, filteredAppliedJobs } = useSelector(state => state.jobsData)
    console.log(appliedJobs)
    const currentData = searchVal === undefined ? appliedJobs : filteredAppliedJobs
    console.log(currentData)

    const downloadHandler = () => {
        const URL = `${API_URI}download/${candidate && candidate._id}`
        console.log(URL)
        axios.get(URL).then(data => console.log(data)).catch(err => console.log(err))
    }



    const renderItemList = () => {
        if (currentData) {
            console.log(currentData)
            // POPULATE PENDING//////////////////////////////////////////////
            const list = currentData.map(item => {
                console.log(item)
                const date = new Date(item.id.createdAt).toDateString()

                return <List>
                    <Element>{item.id.title}</Element>
                    <Element>{item.id.company}</Element>
                    <Element>{item.id.location}</Element>
                    <Element>{date}</Element>
                </List>

            })

            if (list.length > 0) {
                return list
            }

            return <List>
                <Element><LoadingIcon src={Loader} /></Element>
                <Element><LoadingIcon src={Loader} /></Element>
                <Element><LoadingIcon src={Loader} /></Element>
                <Element><LoadingIcon src={Loader} /></Element>
            </List>


        }



    }


    const renderTable = () => {
        if (filteredAppliedJobs && filteredAppliedJobs.length === 0) {
            return <p>No Result found for {searchVal}.</p>
        }
        return <UnorderedList>
            <List>
                <HeadingElement>Job Title</HeadingElement>
                <HeadingElement>Company</HeadingElement>
                <HeadingElement>Location</HeadingElement>
                <HeadingElement>Posted on</HeadingElement>
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

                    <Section>
                        <Heading>Skills</Heading>
                        <Content>{candidate && candidate.skills}</Content>
                    </Section>

                    <Section>
                        <Heading>Education</Heading>
                        <Content>{candidate && candidate.education}</Content>
                    </Section>

                    <Section>
                        <Heading>Contact No.</Heading>
                        <Content>{candidate && candidate.number}</Content>
                    </Section>

                    <Section>
                        <Heading>Email</Heading>
                        <Content>{candidate && candidate.email}</Content>
                    </Section>

                    <Section>
                        <Heading>Resume</Heading>
                        <DownloadLink href={`${API_URI}download/${candidate && candidate._id}`} target="_blank" color={'#088400'}>Download</DownloadLink>
                    </Section>

                </CustomCard>

            default:
                break;
        }
    }


    return (
        <Container>
            <FlexDiv>
                <Title>{candidate && candidate.name}</Title>

            </FlexDiv>

            <ButtonContainer>
                <Tab color={activeTab === 1 ? 'white' : '#ffffff66'} onClick={() => setActiveTab(1)}>Job List</Tab>
                <Tab color={activeTab === 2 ? 'white' : '#ffffff66'} onClick={() => setActiveTab(2)}>Candidate Details</Tab>
            </ButtonContainer>
            {renderTab()}

        </Container>
    )
}

export default AppliedJobList

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
    padding: 10px;
    border-style: none;
    background-color: ${props => props && props.color};
    box-shadow: -1px -1px 6px 0px #0000001f;
    &:focus{
        outline: none;
    }
`

const CustomCard = styled(Card)`
    margin: 0px 20px 20px 20px;
    flex: 1;   
`
const Section = styled.div`
    padding: 10px 0px;
    border-bottom: 1px solid #0000001a;
`



const RemoveSpacing = css`
    margin: 0px;
    padding: 0px;
`
const Heading = styled.p`
    ${RemoveSpacing}
    font-weight: bold;
    font-size: 0.8em;
    color: #00000063;
    margin-bottom: 10px;
`

const Content = styled.p`
    ${RemoveSpacing}
        font-weight: bold;
    font-size: 1.3em;

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

const StyledBtn = css`
    border-style: none;
    padding: 7px 10px;
    width: 130px;
    margin-right: 10px;
    color: white;
    background-color: ${props => props && props.color};
`

const Btn = styled.button`
    ${StyledBtn}
`

const DownloadLink = styled.a`

    ${StyledBtn}
    text-decoration: none;
    background-color: ${themeColor}
`