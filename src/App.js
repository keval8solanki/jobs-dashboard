import React from 'react'
import { HashRouter, Switch, Route, useLocation } from 'react-router-dom'
import JobsPage from './Pages/JobsPage'
import CandidatePage from './Pages/CandidatePage'
import NavBar from './Components/NavBar'
import styled from 'styled-components'
import SideBar from './Components/SideBar'
import DashboardPage from './Pages/DashboardPage'
import AppliedJobList from './Pages/AppliedJobList'
import SignInPage from './Pages/SignInPage'
import { useSelector } from 'react-redux'
import ProfilePage from './Pages/ProfilePage'
import JobPage from './Pages/JobPage'
import InputJobDetails from './Components/InputJobDetails'
import CandidatesPage from './Pages/CandidatesPage'
import RolesPage from './Pages/RolesPage'
import RolePage from './Pages/RolePage'
import InputRolesDetails from './Components/InputRolesDetails'
import AdminsPage from './Pages/AdminsPage'
import InputAdminsDetails from './Components/InputAdminsDetails'
import AdminPage from './Pages/AdminPage'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
	const { isAuthenticated } = useSelector((state) => state.authData)

	let inDev = false

	const mainContainerVariants = {
		initial: {},
		animate: {
			transition: {},
		},
	}

	const navVariants = {
		initial: {
			y: '-100vh',
		},
		animate: {
			y: 0,
			transition: {
				duration: 0.5,
				// type: 'spring',
				// mass: 0.4,
			},
		},
	}

	const sidebarVariants = {
		initial: {
			x: '-100vw',
		},
		animate: {
			x: 0,
			transition: {
				duration: 0.5,
			},
		},
	}

	const rightSidebarVariants = {
		initial: {
			x: '+100vw',
		},
		animate: {
			x: 0,
			transition: {
				duration: 0.5,
			},
		},
	}

	const renderRoutes = () => {
		return (
			<motion.div
				variants={mainContainerVariants}
				initial='initial'
				animate='animate'>
				<NavBar variants={navVariants} />

				<MainDiv>
					<SideBar variants={sidebarVariants} />

					<RightSideBar variants={rightSidebarVariants}>
						<Switch>
							<Route path='/' exact component={DashboardPage} />

							<Route path='/job/post' component={InputJobDetails} />
							<Route path='/job/edit/:id' component={InputJobDetails} />

							<Route path='/role/add' component={InputRolesDetails} />
							<Route path='/role/edit/:id' component={InputRolesDetails} />

							<Route path='/admin/add' component={InputAdminsDetails} />
							<Route path='/admin/edit/:id' component={InputAdminsDetails} />

							<Route path='/jobs' component={JobsPage} />
							<Route path='/job/:id' component={JobPage} />
							<Route path='/candidate/:id' component={CandidatePage} />

							<Route path='/applied-jobs/:id' component={AppliedJobList} />

							<Route path='/candidates' component={CandidatesPage} />
							<Route path='/profile' component={ProfilePage} />
							<Route path='/roles' component={RolesPage} />
							<Route path='/role/:id' component={RolePage} />
							<Route path='/admins' component={AdminsPage} />
							<Route path='/admin/:id' component={AdminPage} />
						</Switch>
					</RightSideBar>
				</MainDiv>
			</motion.div>
		)
	}

	const renderSignin = () => {
		return <Route path='/' component={SignInPage} />
	}

	const hideRightClick = (e) => {
		if (!inDev) {
			e.preventDefault()
		}
	}

	return (
		<div onContextMenu={hideRightClick} className='App'>
			<HashRouter>
				{isAuthenticated ? renderRoutes() : renderSignin()}
			</HashRouter>
		</div>
	)
}

export default App

const MainDiv = styled.div`
	background-color: #276eb012;
	display: flex;
	width: 100%;
	height: 92vh;
	overflow: auto;
`
const ComponentContainer = styled.div`
	padding: 15px;
`

const RightSideBar = styled(motion.div)`
	width: 100%;
	overflow-y: scroll;
`
