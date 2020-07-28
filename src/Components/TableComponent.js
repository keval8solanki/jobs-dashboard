import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { API_URI } from '../Endpoint'
import { saveCurrentJob } from '../Actions/JobsActions'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'


function TableComponent({ data, type, saveCurrent }) {
    const dispatch = useDispatch()
    console.log(data)

    const getDataHandler = async (id) => {

        if (type === 'job') {
            const URI = `${API_URI}job/${id}`
            try {
                console.log('running')
                const { data } = await axios.get(URI)
                dispatch(saveCurrent(data))
            } catch (err) {
                console.log(err)
            }
        } else if (type === 'candidate') {
            console.log(type)


            dispatch(saveCurrent(data))
        }

    }


    const renderList = () => {
        if (data) {
            return data.map(item => {

                const date = new Date(item.createdAt).toDateString()

                return <StyledNavlink key={item._id} to={type === 'job' ? `/job/${item._id}` : `/candidate/${item._id}`}>
                    <List onClick={() => getDataHandler(item._id)} >
                        <Element>{type === 'job' ? item.title : item.name}</Element>
                        <Element>{type === 'job' ? item.company : item.number}</Element>
                        <Element>{type === 'job' ? item.location : item.jobs[0].status}</Element>
                        <Element>{date}</Element>
                    </List>
                </StyledNavlink>
            })
        }
    }


    return (

        <>
            {renderList()}
        </>
    )
}

export default TableComponent


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


const StyledNavlink = styled(NavLink)`
    text-decoration: none;
    color: black;
    &:hover{
        text-decoration: none;
    }

`