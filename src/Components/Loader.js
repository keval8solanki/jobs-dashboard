import React from 'react'
import LoaderSVG from '../Assets/Icons/loader.svg'
import styled from 'styled-components'

const Loader = ({ size }) => {
	return <LoadingIcon size={size} src={LoaderSVG} />
}

export default Loader

const LoadingIcon = styled.img`
	width: ${(props) => (props && props.size ? props.size : '30px')};
`
