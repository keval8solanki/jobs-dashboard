import React, { useEffect, useState } from 'react'
import { Card, Title, FlexDiv, StyledButton } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import { saveAllJobs, searchJobs, saveCurrentJob } from '../Actions/JobsActions'
import SearchComponent from '../Components/SearchComponent'
import TableComponent from '../Components/TableComponent'
import DetailsTable from '../Components/DetailsTable'
import { NavLink } from 'react-router-dom'
import Loader from '../Assets/Icons/loader.svg'

function JobsListPage() {
    const dispatch = useDispatch()
    const [searchVal, setSearchVal] = useState(undefined)
    useEffect(() => {

        axios.get(API_URI)
            .then(({ data }) => {
                dispatch(saveAllJobs(data))
            })
            .catch(err => console.log(err))


    }, []);

    useEffect(() => {
        if (searchVal !== undefined) {
            dispatch(searchJobs(searchVal))
        }
    }, [searchVal])

    const { jobs, filteredJobs } = useSelector(state => state.jobsData)
    const currentData = searchVal === undefined ? jobs : filteredJobs

    const getDataHandler = async (id) => {
        const URI = `${API_URI}job/${id}`
        try {
            console.log('running')
            const { data } = await axios.get(URI)
            dispatch(saveCurrentJob(data))
        } catch (err) {
            console.log(err)
        }
    }


    const renderItemList = () => {
        if (currentData) {
            const list = currentData.map(item => {
                const date = new Date(item.createdAt).toDateString()
                return <StyledNavlink key={item._id} to={`/job/${item._id}`}>
                    <List onClick={() => getDataHandler(item._id)} >
                        <Element>{item.title}</Element>
                        <Element>{item.company}</Element>
                        <Element>{item.location}</Element>
                        <Element>{date}</Element>
                    </List>
                </StyledNavlink>
            })

            if (list.length > 0) {
                return list
            } else {
                return <List>
                    <Element><LoadingIcon src={Loader} /></Element>
                    <Element><LoadingIcon src={Loader} /></Element>
                    <Element><LoadingIcon src={Loader} /></Element>
                    <Element><LoadingIcon src={Loader} /></Element>
                </List>
            }
        } else {
            return 'Empty'
        }
    }


    const renderTable = () => {
        if (filteredJobs && filteredJobs.length === 0) {
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


    return (
        <Container>

            <FlexDiv>
                <Title>Jobs List</Title>
                <PostJob to="/postjob">Post New Job</PostJob>
            </FlexDiv>

            <CustomCard>
                <SearchComponent setValue={setSearchVal} />
                {renderTable()}
            </CustomCard>
        </Container>
    )
}

export default JobsListPage

const Container = styled.div`
    flex: 2;
`

const CustomCard = styled(Card)`
    flex: 1;   
`

const PostJob = styled(NavLink)`
    ${StyledButton}
    padding: 5px 10px;
    width: fit-content;
    text-decoration: none;
    border-radius: 0px;

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

const LoadingIcon = styled.img`
    width: 30px;
`