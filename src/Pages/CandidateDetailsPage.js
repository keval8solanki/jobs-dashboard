import React, { useEffect, useState } from 'react'
import { Card, Title } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import { saveAllCandidates } from '../Actions/CandidateActions'
import SearchComponent from '../Components/SearchComponent'
import TableComponent from '../Components/TableComponent'


function CandidateDetailsPage() {
    // const { jobs } = useSelector(state => state.jobsdata)
    const dispatch = useDispatch()
    const [searchVal, setSearchVal] = useState()
    console.log(searchVal)
    useEffect(() => {

        axios.get(API_URI)
            .then(({ data }) => {
                dispatch(saveAllCandidates(data))
            })
            .catch(err => console.log(err))


    }, []);

    const { candidates, filteredcandidates } = useSelector(state => state.candidateData)
    console.log(searchVal)
    const currentData = searchVal !== undefined ? filteredcandidates : candidates
    console.log(currentData)

    return (
        <Container>
            <CustomCard>
                <SearchComponent setValue={setSearchVal} />
                <Title>Jobs Detail</Title>
                <TableComponent data={currentData} />
            </CustomCard>
        </Container>
    )
}

export default CandidateDetailsPage

const Container = styled.div`
    flex: 2;
`

const CustomCard = styled(Card)`
    flex: 1;   
`