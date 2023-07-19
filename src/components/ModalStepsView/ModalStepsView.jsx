import { StepsView } from '../StepsView/Steps'
import { messageResponse } from '../../helpers/messageResponse'
import styled from 'styled-components'
import { Divider, Typography } from 'antd'

export const Wrapper = styled.div`
    margin: 0 0 50px 0;
`
export const ModalStepsView = ({ stepsItems = [] }) => {
    const { Text } = Typography

    return (
        <>
            <Text>{messageResponse(stepsItems)}</Text>
            <Divider />
            <Wrapper>
                <StepsView stepsItems={stepsItems} />
            </Wrapper>
        </>
    )
}
