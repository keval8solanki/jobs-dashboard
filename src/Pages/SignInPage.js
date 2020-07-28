// [CODE CLEANED ✔]

// React Imports
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'

// User Imports
import { Card, themeColor, StyledButton, statuscolors, LoadingIcon, noSpaces } from '../Common/Styles/StyledComponents'
import { API_URI } from '../Endpoint'
import { login } from '../Actions/AuthActions'

// Assets
import CompanyLogo from '../Assets/Icons/fistbump-logo.svg'
import User from '../Assets/Icons/user.svg'
import Password from '../Assets/Icons/password.svg'

function SignInPage() {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [LoginText, setLoginText] = useState('Login')

    const isInputValid = name && password

    const reset = () => {
        setName('')
        setPassword('')
    }

    const changeHandler = (e, setData) => {
        setData(e.target.value)
        setErrorMessage(null)
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        const URL = `${API_URI}login`
        setLoginText('Verifying...')
        reset()

        try {
            const data = { name, password }
            await axios.post(URL, data)
            dispatch(login(true))
            setLoginText('Login')
        } catch (err) {
            dispatch(login(false))
            reset()
            setLoginText('Login')
            setErrorMessage('Invalid Credentials')
        }
    }
    return (
        <SiginContainer>

            <SigninSubContainer>
                <BrandLogo src={CompanyLogo} />
                <SigninCard>
                    <SiginTitle>Admin</SiginTitle>
                    <SigninForm onSubmit={loginHandler}>
                        <InputContainer>
                            <Icon src={User} />
                            <Input value={name} onChange={(e) => changeHandler(e, setName)} type="text" placeholder="Username" />
                        </InputContainer>

                        <InputContainer>
                            <Icon src={Password} />
                            <Input value={password} onChange={(e) => changeHandler(e, setPassword)} type="password" placeholder="Password" />
                        </InputContainer>

                        <Login disabled={!isInputValid}>{LoginText}</Login>
                    </SigninForm>
                    <Message>{errorMessage}</Message>
                </SigninCard>

            </SigninSubContainer>
        </SiginContainer>
    )
}

export default SignInPage



const SiginTitle = styled.h2`
    ${noSpaces}
    color: ${themeColor};
    font-weight: bold;
    margin-bottom: 20px;
    `

const SiginContainer = styled.div`
    background-color: #f4f4f4;
    height: 100vh;
`

const BrandLogo = styled.img`
    width: 250px;
    margin-bottom: 20px;
`

const SigninSubContainer = styled.div`
    padding-top: 70px;
`

const SigninCard = styled(Card)`
    margin: auto;
    width: 300px;
`

const SigninForm = styled.form`
    display: flex;
    flex-direction: column;
`

const Login = styled.button`
    border-style: none;
    width: 100%;
    margin: 10px 0px;
    padding: 6px 12px;
    background-color: ${themeColor};
    color: white;
    &:focus{
        outline: none;
    }
    &:disabled{
        opacity: 0.3
    }
`
const Icon = styled.img`
    margin-right: 10px;
`

const InputContainer = styled.div`
    width: 100%;
    display: flex;
`

const Input = styled.input`
    width: 100%;
    margin: 10px 0px;
    padding: 6px 12px;
    border-style: none;
    border-bottom: 1px solid #0000001f;
    transition: all 0.5s;
    &:focus{
        outline: none;
        border-bottom: 1px solid ${themeColor};
    }
`
const Message = styled.p`
    ${noSpaces}
    font-size: 0.8em;
    color: ${statuscolors.failed}
`