import { Alert, Flex, Typography } from 'antd'

const EmptyFieldsAlert = () => {
    return (
        <Alert
            type="warning"
            description={
                <Flex vertical>
                    <Typography.Text strong style={{ fontSize: 13 }}>
                        W tym momencie nie możesz zlecić zadań robotowi
                    </Typography.Text>
                    <Typography.Text style={{ fontSize: 12 }}>
                        Pola imię, nazwisko oraz pesel muszą być uzupełnione!
                    </Typography.Text>
                </Flex>
            }
            showIcon
        />
    )
}

export default EmptyFieldsAlert
