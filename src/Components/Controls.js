import React from 'react'
import { Card, CardTitle } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'

function Controls({ title, children }) {
    return (
        <ControlCard>
            <CardTitle>{title}</CardTitle>
            {children}
        </ControlCard>
    )
}

export default Controls

const ControlCard = styled(Card)`
    position: sticky;
    top: 10px;
    display: flex;
    justify-content: space-between;
    height: 20px;

`