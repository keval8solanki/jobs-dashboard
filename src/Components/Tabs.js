import React, { useState } from 'react'
import styled from 'styled-components'
import { Card } from '../Common/Styles/StyledComponents'


function Tabs({ data }) {

    const [activeTab, setActiveTab] = useState(0)

    const renderTabTitle = data.map(({ title }, index) => {
        return <Tab color={activeTab === index ? 'white' : '#ffffff66'} onClick={() => setActiveTab(index)}>{title}</Tab>
    })

    return (
        <div>
            <ButtonContainer>
                {renderTabTitle}
            </ButtonContainer>
            <CustomCard>
                {data[activeTab].component}
            </CustomCard>
        </div>
    )
}

export default Tabs

const Tab = styled.button`
    font-weight: bold;
    width: 150px;
    padding: 10px 10px;
    border-style: none;
    background-color: ${props => props && props.color};
    box-shadow: -1px -1px 6px 0px #0000001f;
    &:focus{
        outline: none;
    }
`

const ButtonContainer = styled.div`
    text-align: left;
    padding: 0px 0px 0px 20px;
    margin: 20px 0px 0px 0px;
`

const CustomCard = styled(Card)`
    margin: 0px 20px 20px 20px;
    flex: 1;   
`