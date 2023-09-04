import styled from 'styled-components'
import { Typography } from 'antd'
const { Title } = Typography

export const Wrapper = styled.div`
    /* background-color: ${({ backgroundColor }) =>
        backgroundColor ? backgroundColor : 'transparent'}; */
    padding: ${({ theme }) => theme.paddings.padding_title_1};
    margin-bottom: ${({ theme }) => theme.paddings.grid_gap_1};

    & h2 {
        margin: 0;
    }
`

export const PageTitleHeader = ({ title, backgroundColor }) => {
    return (
        <Wrapper backgroundColor={backgroundColor}>
            <Title level={2}>{title}</Title>
        </Wrapper>
    )
}
