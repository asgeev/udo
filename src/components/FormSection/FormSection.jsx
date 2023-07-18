import { Typography, Row, Col } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
    /* background-color: ${({ backgroundColor }) =>
        backgroundColor ? backgroundColor : 'white'}; */
    border-radius: 10px;
    padding: ${({ theme }) => theme.paddings.padding_tilt_1};
    margin: 24px 0;
`

export const FormSection = ({
    children,
    sectionName,
    backgroundColor,
    subTitle,
}) => {
    const { Title, Text } = Typography

    return (
        <>
            <Wrapper backgroundColor={backgroundColor}>
                <Row>
                    <Col span={5} offset={1}>
                        <Title level={5}>{sectionName}</Title>
                        {subTitle && <Text type="secondary">{subTitle}</Text>}
                    </Col>
                    <Col span={10} offset={2}>
                        {children}
                    </Col>
                </Row>
            </Wrapper>
        </>
    )
}
