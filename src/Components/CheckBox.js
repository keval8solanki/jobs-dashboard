import React from 'react'
import CheckSVG from '../Assets/Icons/tick.svg'
import styled from 'styled-components'
import { themeColor } from '../Common/Styles/StyledComponents'
import TickMP3 from '../Assets/Sounds/tick.ogg'

function CheckBox({ val, setVal, disabled }) {
	const toggle = () => {
		if (!disabled) {
			setVal(!val)
		}
		return <audio src={TickMP3} autoPlay />
	}

	return (
		<CheckContainer disabled={disabled} isChecked={val} onClick={toggle}>
			{/* {val && <audio src={TickMP3} autoPlay/>}            */}
			{val && <Icon src={CheckSVG} />}
		</CheckContainer>
	)
}

export default CheckBox

const CheckContainer = styled.div`
	transition: all 0.3s;
	background-color: ${(props) => (props.isChecked ? themeColor : 'white')};
	display: flex;
	opacity: ${(props) => (props && props.disabled ? 0.5 : 1)};
	justify-content: center;
	align-items: center;
	border: 2px solid ${themeColor};
	width: 15px;
	height: 15px;
	border-radius: 5px;
`

const Icon = styled.img``
