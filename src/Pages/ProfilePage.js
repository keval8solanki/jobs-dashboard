import React from 'react'
import { Container, FlexDiv, Title, Card, statuscolors, CardTitle } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../Actions/AuthActions'

const contentVariant = {
    initial: {
        opacity: 0,
        x:'+5vw'
       
    },
    animate:{
        opacity: 1,
        x: 0,
        transition:{
            duration: 0.7,
            ease: 'easeOut'
            
        }
    }
}

function ProfilePage() {
    const dispatch = useDispatch()
    const {data} = useSelector(state => state.authData)
    const username = data && data.authData.username
    const name = data && data.authData.role_id.name
    
    const logoutHandler = () => {
        dispatch(auth(false))
    }
    return (
        <Container variants={contentVariant}>
            <FlexDiv>
                <Title>Profile</Title>
                <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
            </FlexDiv>

            <Card>
                <CardTitle style={{ margin: '0px' }}>Username</CardTitle>
    <Content style={{ marginBottom: '20px' }}>{username}</Content>
    <CardTitle style={{ margin: '0px' }}>Role</CardTitle>
                <Content>{name}</Content>

            </Card>

        </Container>

    )
}

export default ProfilePage


const LogoutBtn = styled.button`
    border-style: none;
    text-decoration: underline;
    color: ${statuscolors.review};
    cursor: pointer;
    background-color: transparent;
    &:hover{
    color: ${statuscolors.failed};

    }


`

const Content = styled.p`
    font-weight: bold;
    font-size: 2.5em;
    margin: 0px;
    padding: 0px;

`