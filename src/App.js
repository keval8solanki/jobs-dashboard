import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import JobsPage from './Pages/JobsPage';
import CandidatePage from './Pages/CandidatePage';
import NavBar from './Components/NavBar';
import styled from 'styled-components'
import SideBar from './Components/SideBar';
import AddJobs from './Pages/PostJob';
import JobsListPage from './Pages/JobsListPage';
import JobDetailsPage from './Pages/JobDetailsPage';
import DashboardPage from './Pages/DashboardPage';
import PostJob from './Pages/PostJob';
import CandidateDetailsPage from './Pages/CandidateDetailsPage';
import ApplicantDetailsPage from './Pages/ApplicantDetailsPage';
import CandidatesListPage from './Pages/CandidatesListPage';
import AppliedJobList from './Pages/AppliedJobList';
import EditJobPage from './Pages/EditJobPage';
import SignInPage from './Pages/SignInPage';
import { useSelector } from 'react-redux';
import ProfilePage from './Pages/ProfilePage';

function App() {

  const { isAuthenticated } = useSelector(state => state.authData)



  const renderRoutes = () => {
    return <>

      <NavBar />
      <MainDiv>
        <SideBar />
        <RightSideBar>


          <Switch>
            <Route path="/" exact component={DashboardPage} />

            <Route path="/postjob" component={PostJob} />
            <Route path="/jobs" component={JobsListPage} />
            <Route path="/job/edit/:id" component={EditJobPage} />
            <Route path="/job/:id" component={JobDetailsPage} />

            <Route path="/candidate/:id" component={ApplicantDetailsPage} />
            <Route path="/applied-job/:id" component={AppliedJobList} />


            <Route path="/candidates" component={CandidatesListPage} />
            <Route path="/profile" component={ProfilePage} />
          </Switch>
        </RightSideBar>

      </MainDiv>
    </>
  }

  const renderSignin = () => {
    return <Route path="/" component={SignInPage} />
  }

  return (
    <div className="App">
      <HashRouter>
        {isAuthenticated ? renderRoutes() : renderSignin()}

      </HashRouter>
    </div>
  );
}

export default App;

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

const RightSideBar = styled.div`
  width:100%;
  overflow-y: scroll;
`