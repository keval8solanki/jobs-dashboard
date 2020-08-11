import React from 'react'
import { Container, Title } from '../Common/Styles/StyledComponents'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const contentVariant = {
    initial: {
        opacity: 0,
        x:'+5vw'
       
    },
    animate:{
        opacity: 1,
        x: 0,
        transition:{
            duration: 0.7,
            ease: 'easeOut'
            
        }
    }
}

function ContentContainer({ title, value2, children, justify }) {
    return (
        <Container variants={contentVariant}>
            <FlexDiv justify={justify}>
                <Title>{title}</Title>
                {value2}
            </FlexDiv>
            {children}
        </Container>


    )
}

export default ContentContainer


export const FlexDiv = styled.div`
    display: flex;
    justify-content: ${props => props && props.justify};
    align-items: center;
    padding: 20px 20px 0px 20px;
`
