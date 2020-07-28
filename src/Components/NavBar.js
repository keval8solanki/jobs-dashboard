// [CODE CLEANED ✔]

import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

import { themeColor } from '../Common/Styles/StyledComponents'
import CompanyLogo from '../Assets/Icons/fistbump-logo-white.svg'

function NavBar() {
    return (
        <Header>
            <StyledNavLink to="/"><BrandLogo src={CompanyLogo} /></StyledNavLink>
        </Header>
    )
}

export default NavBar

const BrandLogo = styled.img`
    width: 80px;
`
const Header = styled.header`
    position: sticky;
    top: 0;
    color: white;
    background-color: ${themeColor};
    display: flex;
    justify-content: space-between;
`

const StyledNavLink = styled(NavLink)`
    padding: 10px 20px;
`