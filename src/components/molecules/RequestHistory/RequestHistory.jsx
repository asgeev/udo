import { useRequestHistory } from '@hooks/useRequestHistory'
import { useRecordsViewContext } from '@hooks/useRecordsViewContext'
import { Space, Typography } from 'antd'
import styled from 'styled-components'

const SmallText = styled(Typography.Text)`
    font-size: 12px;
`
export const RequestHistory = () => {
    const { currentRecordId } = useRecordsViewContext()
    const { data = {} } = useRequestHistory(currentRecordId)
    const {
        createdTime,
        createdFirstName,
        createdLastName,
        editedTime,
        editedFirstName,
        editedLastName,
    } = data

    return (
        <>
            {data && (
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                    align="end"
                    size={0}
                >
                    <Space>
                        <SmallText type="secondary">Dodano:</SmallText>
                        <SmallText type="secondary" strong>
                            {createdTime || ''}
                        </SmallText>
                        <SmallText type="secondary">przez:</SmallText>
                        <SmallText type="secondary" strong>{`${
                            createdFirstName || ''
                        } ${createdLastName || ''}`}</SmallText>
                    </Space>
                    <Space>
                        <SmallText type="secondary">Edytowano:</SmallText>
                        <SmallText type="secondary" strong>
                            {editedTime || ''}
                        </SmallText>
                        <SmallText type="secondary">przez:</SmallText>
                        <SmallText type="secondary" strong>{`${
                            editedFirstName || ''
                        } ${editedLastName}`}</SmallText>
                    </Space>
                </Space>
            )}
        </>
    )
}
