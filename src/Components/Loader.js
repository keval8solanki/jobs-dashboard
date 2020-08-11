import React from 'react'
import LoaderSVG from '../Assets/Icons/loader.svg'
import styled from 'styled-components'

const Loader = () => {
    return <LoadingIcon src={LoaderSVG} />
}

export default Loader

const LoadingIcon = styled.img`
    width: 30px;
`
