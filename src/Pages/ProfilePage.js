import React from 'react'
import { Container, FlexDiv, Title, Card, statuscolors, CardTitle } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { logout } from '../Actions/AuthActions'

function ProfilePage() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logout(false))
    }
    return (
        <Container>
            <FlexDiv>
                <Title>Profile</Title>
                <LogoutBtn onClick={logoutHandler}>Logout</LogoutBtn>
            </FlexDiv>

            <Card>
                <CardTitle style={{ margin: '0px' }}>Username</CardTitle>
                <Content style={{ marginBottom: '20px' }}>admin</Content>
                <CardTitle style={{ margin: '0px' }}>Role</CardTitle>
                <Content>Super Admin</Content>

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