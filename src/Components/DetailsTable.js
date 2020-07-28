import React, { useEffect, useState } from 'react'
import { Card, Title } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { saveAllJobs } from '../Actions/JobsActions'
import { saveAllCandidates } from '../Actions/CandidateActions'
import SearchComponent from '../Components/SearchComponent'
import TableComponent from '../Components/TableComponent'


function DetailsTable({ data }) {
    const { jobs, filteredJobs } = useSelector(state => state.jobsData)
    const { candidates, filteredcandidates } = useSelector(state => state.candidateData)

    const allData = jobs.len
    console.log(jobs)
    console.log(candidates)

    const dispatch = useDispatch()
    const [searchVal, setSearchVal] = useState()





    // console.log(type)
    // const allData = type === 'job' ? jobs : candidates

    // console.log(allData)
    // const filteredData = type === 'job' ? filteredJobs : filteredcandidates
    // const currentData = searchVal !== undefined ? filteredData : allData

    // console.log(currentData)

    return (
        <CustomCard>
            {/* <SearchComponent setValue={setSearchVal} />
            {filteredData && filteredData.length === 0 ? <p>No Result found for {searchVal}.</p> : <TableComponent data={currentData} />} */}
            {/* {filteredData && filteredData.length === 0 ? <p>No Result found for {searchVal}.</p> : <TableComponent data={currentData} />} */}
        </CustomCard>
    )
}

export default DetailsTable

const Container = styled.div`
    flex: 2;
`

const CustomCard = styled(Card)`
    flex: 1;   
`
