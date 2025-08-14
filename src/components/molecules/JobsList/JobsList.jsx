import { List, Button, Typography } from 'antd'
import { Status } from '@atoms/Status/Status'
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useEditFormContext } from '@hooks/useEditFormContext'
import { CopyOutlined } from '@ant-design/icons'
import { JobDescription } from '@molecules/JobDescription/JobDescription'

export const JobsList = ({ data }) => {
    const { messageApi } = useEditFormContext()

    const { mainEditorRef, addTextToEditor } = useRichTextContext()

    const onCopy = (content) => {
        if (!content) return

        addTextToEditor(mainEditorRef, content)
        messageApi.success('Skopiowno do szablonu odpowiedzi')
    }

    return (
        <List
            bordered
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item
                    key={index}
                    extra={
                        <Button
                            disabled={item.result?.content ? false : true}
                            title="Kopiuj do szablonu odpowiedzi"
                            icon={<CopyOutlined />}
                            onClick={() => onCopy(item.result?.content)}
                        />
                    }
                    actions={[
                        item.system_name,
                        item.created_time,
                        // <EyeOutlined key={'list-item-created_time'} />,
                        <JobDescription
                            key={'list-item-created_time'}
                            title={`${item.first_name} ${item.last_name}, ${item.pesel}`}
                            dateFrom={new Date(item.date_from)}
                            options={item.options?.map((item) => item.name)}
                            columns={item.columns?.map((item) => item.name)}
                            rodzaje={item.rodzaj_swiadczen?.map(
                                (item) => item.name
                            )}
                            zakresy={item.zakres_swiadczen?.map(
                                (item) => item.name
                            )}
                        />,
                    ]}
                >
                    <List.Item.Meta
                        title={
                            <>
                                <Status
                                    status={item.status?.type}
                                    statusDescription={item.status?.description}
                                />
                                <Typography.Text
                                    ellipsis
                                    title={item.checkbox_name}
                                >
                                    {item.checkbox_name}
                                </Typography.Text>
                            </>
                        }
                    />
                </List.Item>
            )}
        />
    )
}
