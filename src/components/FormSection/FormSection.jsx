import { Typography, Row, Col, Space } from 'antd'
import styled from 'styled-components'

export const Wrapper = styled.div`
    border-radius: 10px;
    padding: ${({ theme }) => theme.paddings.padding_tilt_1};
    margin: ${({ editMode }) => (editMode ? '0' : '24px 0')};
`
export const HeaderWrapper = styled.div`
    margin-bottom: 40px;
`

export const FormSection = ({
    editMode,
    children,
    sectionName,
    backgroundColor,
    subTitle,
}) => {
    const { Title, Text } = Typography

    return (
        <Wrapper editMode backgroundColor={backgroundColor}>
            {editMode ? (
                <>
                    <HeaderWrapper>
                        <Title level={5}>{sectionName}</Title>
                        {subTitle && <Text type="secondary">{subTitle}</Text>}
                    </HeaderWrapper>
                    {children}
                </>
            ) : (
                <Row>
                    <Col span={5} offset={1}>
                        <Title level={5}>{sectionName}</Title>
                        {subTitle && <Text type="secondary">{subTitle}</Text>}
                    </Col>
                    <Col span={11} offset={2}>
                        {children}
                    </Col>
                </Row>
            )}
        </Wrapper>
    )
}
