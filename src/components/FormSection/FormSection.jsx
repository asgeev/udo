import { Row, Col, Typography, Divider } from 'antd'

export const FormSection = ({ children, sectionName }) => {
    const { Title } = Typography

    return (
        <>
            <Row style={{ marginTop: 50 }}>
                <Col span={5}>
                    <Title level={4}>{sectionName}</Title>
                </Col>
                <Col span={1}>
                    <Divider type="vertical" style={{ height: '100%' }} />
                </Col>
                <Col span={18}>{children}</Col>
            </Row>
        </>
    )
}
