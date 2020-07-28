import React, { useEffect, useState } from 'react'
import { Card, Title, FlexDiv, StyledButton, Status, LoadingIcon } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URI } from '../Endpoint'

import SearchComponent from '../Components/SearchComponent'
import TableComponent from '../Components/TableComponent'
import DetailsTable from '../Components/DetailsTable'
import { NavLink } from 'react-router-dom'
import { searchCandidates, saveAllCandidates, saveCurrentCandidate } from '../Actions/CandidateActions'
import { statusColor } from '../Common/Functions/helperFunctions'
import Loader from '../Assets/Icons/loader.svg'

function CandidatesListPage() {
    const dispatch = useDispatch()
    const [searchVal, setSearchVal] = useState(undefined)
    useEffect(() => {
        const URL = `${API_URI}all/candidate`
        axios.get(URL)
            .then(({ data }) => {
                dispatch(saveAllCandidates(data))
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        if (searchVal !== undefined) {
            dispatch(searchCandidates(searchVal))
        }
    }, [searchVal])



    const { candidates, filteredcandidates } = useSelector(state => state.candidateData)
    const currentData = searchVal === undefined ? candidates : filteredcandidates

    const getDataHandler = async (id) => {

        const currentCandidate = candidates.find(item => item._id === id)
        dispatch(saveCurrentCandidate(currentCandidate))

    }

    const renderItemList = () => {
        if (currentData) {
            const list = currentData.map(item => {

                const date = new Date(item.createdAt).toDateString()
                return <StyledNavlink key={item._id} to={`/applied-job/${item._id}`}>
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
                return <List>
                    <Element><LoadingIcon src={Loader} /></Element>
                    <Element><LoadingIcon src={Loader} /></Element>
                    <Element><LoadingIcon src={Loader} /></Element>
                    <Element><LoadingIcon src={Loader} /></Element>
                </List>
            }
        }
    }


    const renderTable = () => {
        if (filteredcandidates && filteredcandidates.length === 0) {
            return <p>No Result found for {searchVal}.</p>
        }

        return <UnorderedList>
            <List>
                <HeadingElement>Name</HeadingElement>
                <HeadingElement>Contact No</HeadingElement>
                <HeadingElement>Status</HeadingElement>
                <HeadingElement>Applied on</HeadingElement>
            </List>

            {renderItemList()}
        </UnorderedList>

    }


    return (
        <Container>

            <FlexDiv>
                <Title>Candidate List</Title>
            </FlexDiv>

            <CustomCard>
                <SearchComponent setValue={setSearchVal} />
                {renderTable()}
            </CustomCard>
        </Container>
    )
}

export default CandidatesListPage

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

