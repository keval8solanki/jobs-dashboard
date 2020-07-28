import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

export const themeColor = '#2B96DC'
export const highlightColor = '#40CD8A'

export const statuscolors = {
    pending: '#FFB223',
    pendingBg: '#FFF5C4',

    success: '#3EB93B',
    successBg: '#E9FAE8',

    failed: '#F1373A',
    failedBg: '#FFE1DF',

    review: '#0B7EE8',
    reviewBg: '#E6F4FD'
}


// CSS ------------------------------------------------------------------------------------------
export const noSpaces = css`
    margin: 0px;
    padding: 0px;
`



// Styled components -----------------------------------------------------------------------------

export const Card = styled.div`
    background-color: white;
    padding: 20px;
    text-align: left;
    box-shadow: 2px 2px 8px 3px #0000001c;
    margin: 20px 20px 0px 20px;
`

export const Grid = styled.div`
    background-color: #276eb012;
    display: grid;
	gap: 0rem;
	row-gap: 0rem;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    @media (max-width: 400px) {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
`

export const Title = styled.p`
    margin: 0px;
    padding: 0px;
    text-align: left;
    font-weight: bold;
    font-size: 1.3em;

`

export const StyledButton = css`
    background-color: ${themeColor};
    border: 1px solid ${themeColor};
    padding: 10px;
    width: 150px;
    color: white;
    font-weight: bold;
    transition: all 0.5s;
    &:focus{
        outline: none;
    }
    &:hover{
        background-color: transparent;
        color: ${themeColor};
    }
`

export const CardTitle = styled.p`
    font-weight: bold;
    margin: 0px 0px 20px 0px;
    padding: 0px;
    font-size: 1.2em;
    color: grey;
`

export const FlexDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0px 20px;
`

export const Container = styled.div`
    flex: 2;
`

export const CustomCard = styled(Card)`
    flex: 1;
`

export const StyledNavlink = styled(NavLink)`
    color: black;
    text-decoration: none;
    &:hover{
        color: black;
    text-decoration: none;

    }
    &:active{
        color: black;
        text-decoration: none;
    }
`

export const Status = styled.p`
    width: fit-content;
    padding: 3px 10px;

    border-radius: 50px;
    font-size: 0.9em;
    background-color: ${props => props && props.bgColor};
    margin: 0px;
    color: ${props => props && props.color};
`

export const LoadingIcon = styled.img`
    width: 30px;
`
