// [CODE CLEANED ✔]

// React Imports
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'

// User Imports
import {
	Card,
	themeColor,
	statuscolors,
	noSpaces,
} from '../Common/Styles/StyledComponents'
import { API_URI } from '../Endpoint'
import { auth, saveData } from '../Actions/AuthActions'

// Assets
import CompanyLogo from '../Assets/Icons/fistbump-logo-white.svg'
import User from '../Assets/Icons/user.svg'
import Password from '../Assets/Icons/password.svg'
import AnimatedLogo from '../Components/AnimatedLogo'

import { motion, AnimatePresence } from 'framer-motion'

function SignInPage() {
	const dispatch = useDispatch()

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState(null)
	const [LoginText, setLoginText] = useState('Login')

	const { isAuthenticated } = useSelector((state) => state.authData)
	const isInputValid = username && password

	const reset = () => {
		setUsername('')
		setPassword('')
	}

	const changeHandler = (e, setData) => {
		setData(e.target.value)
		setErrorMessage(null)
	}

	const loginHandler = async (e) => {
		e.preventDefault()
		const URL = `${API_URI}info/counts`
		setLoginText('Verifying...')
		reset()

		try {
			const { data } = await axios.get(URL, {
				headers: {
					username: username,
					password: password,
				},
			})

			dispatch(auth(true))
			dispatch(saveData(data))
			setLoginText('Login')
		} catch (err) {
			dispatch(auth(false))
			reset()
			setLoginText('Login')
			setErrorMessage('Invalid Credentials')
		}
	}

	// Variants
	const mainDivVariant = {
		initial: {
			x: '-10vw',
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.7,
				ease: 'easeOut',
				// type: 'spring',
				// mass: 0.4,
			},
		},
	}
	const mainExitDivVariant = {
		initial: {
			x: 0,
		},
		animate: {
			x: '+100vw',
			transition: {
				duration: 0.5,
				// type: 'spring',
				// mass: 0.4,
			},
		},
	}

	//--------------

	return (
		<motion.div
			variants={isAuthenticated ? mainExitDivVariant : mainDivVariant}
			initial='initial'
			animate='animate'
			exit='exit'>
			<SiginContainer>
				<SigninSubContainer>
					{/* <BrandLogo src={<AnimatedLogo/>} /> */}
					<AnimatedLogo />
					<SigninCard>
						<SiginTitle>Admin</SiginTitle>
						<SigninForm onSubmit={loginHandler}>
							<InputContainer>
								<Icon src={User} />
								<Input
									value={username}
									onChange={(e) => changeHandler(e, setUsername)}
									type='text'
									placeholder='Username'
								/>
							</InputContainer>

							<InputContainer>
								<Icon src={Password} />
								<Input
									value={password}
									onChange={(e) => changeHandler(e, setPassword)}
									type='password'
									placeholder='Password'
								/>
							</InputContainer>

							<Login disabled={!isInputValid}>{LoginText}</Login>
						</SigninForm>
						<Message>{errorMessage}</Message>
					</SigninCard>
				</SigninSubContainer>
			</SiginContainer>
		</motion.div>
	)
}

export default SignInPage

// Styles

const SiginTitle = styled.h2`
    ${noSpaces}
    color: ${themeColor};
    font-weight: bold;
    margin-bottom: 20px;
    `

const SiginContainer = styled.div`
	background-color: ${themeColor};
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
	&:focus {
		outline: none;
	}
	&:disabled {
		opacity: 0.3;
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
	&:focus {
		outline: none;
		border-bottom: 1px solid ${themeColor};
	}
`
const Message = styled.p`
	${noSpaces}
	font-size: 0.8em;
	color: ${statuscolors.failed};
`

// Motion
