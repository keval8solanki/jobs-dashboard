import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { searchJobs } from '../Actions/JobsActions'
import { searchCandidates } from '../Actions/CandidateActions'
import { themeColor } from '../Common/Styles/StyledComponents'

function SearchComponent({ setValue }) {

    const [val, setVal] = useState()
    const searchHandler = (e) => {
        e.preventDefault()

        setValue(val)



    }
    return (
        <SearchContainer onSubmit={searchHandler}>
            <SearchInput value={val} onChange={(e) => setVal(e.target.value)} type="text" placeholder="Search" />
            <SearchBtn>Search</SearchBtn>
        </SearchContainer>
    )
}

export default SearchComponent

const SearchContainer = styled.form`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`
const SearchInput = styled.input`
    flex: 1;
    border: 1px solid #cecece;
    padding: 6px 12px;
     &:focus{
        outline: none;
    }
`


const SearchBtn = styled.button`
    border-style: none;
    padding: 5px 11px;
    background-color: ${themeColor};
    border: 1px solid ${themeColor};
    color: white;
    transition: all 0.2s;
    &:hover{
        background-color: transparent;
        color: ${themeColor};
    }
    &:focus{
        outline: none;
    }

`
