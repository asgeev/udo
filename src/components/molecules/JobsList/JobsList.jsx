import { Space, Empty } from 'antd'
import { JobsItem } from '@atoms/JobsItem/JobsItem'
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useEditFormContext } from '@hooks/useEditFormContext'

export const JobsList = ({ data }) => {
    const { messageApi } = useEditFormContext()

    const { mainEditorRef, addTextToEditor } = useRichTextContext()

    const onCopy = (content) => {
        if (!content) return

        addTextToEditor(mainEditorRef, content)
        messageApi.success('Skopiowno do szablonu odpowiedzi')
    }

    return (
        <Space direction="vertical" style={{ display: 'flex' }}>
            {data && data?.length > 0 ? (
                data?.map(
                    (
                        {
                            status,
                            created_time,
                            checkbox_name,
                            result,
                            first_name,
                            last_name,
                            pesel,
                            date_from,
                            date_to,
                            system_name,
                        },
                        index
                    ) => (
                        <JobsItem
                            key={index}
                            title={checkbox_name}
                            createdTime={created_time}
                            status={status?.type}
                            statusDescription={status?.description}
                            onCopy={() => onCopy(result?.content)}
                            disabled={result?.content ? false : true}
                            systemName={system_name}
                            description={{
                                firstName: first_name,
                                lastName: last_name,
                                pesel: pesel,
                                dateFrom: date_from,
                                dateTo: date_to,
                            }}
                        />
                    )
                )
            ) : (
                <Empty />
            )}
        </Space>
    )
}
