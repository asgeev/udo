import { Alert, Tree, Form, Space } from 'antd'
import { FormSection } from '@molecules/FormSection/FormSection'
import { BorderedBox } from '@atoms/BorderedBox/BorderedBox'
//Import fetching external systems structure
import { useExternalSystems } from '@hooks/useExternalSystems'

export const ReplyTemplateFormSection = ({ editMode = false }) => {
    const { data } = useExternalSystems()
    const api_systems = data?.api_systems

    console.log(api_systems)

    return (
        <FormSection editMode={editMode} sectionName="Dane szablonu odpowiedzi">
            <Space direction="vertical" size={20}>
                <Alert
                    showIcon
                    message="Dane z wybranego poniżej systemu będziesz mógł/mogła wykorzystać przy tworzeniu odpowiedzi."
                    type="info"
                    closeIcon
                />
                {api_systems?.map(
                    ({ long_name, short_name, api, description }) => (
                        <BorderedBox
                            key={short_name}
                            title={long_name}
                            description={description}
                        >
                            <Form.Item
                                name={short_name}
                                valuePropName="checkedKeys"
                                trigger="onCheck"
                            >
                                <Tree
                                    defaultExpandAll
                                    showLine
                                    checkable
                                    treeData={api}
                                    selectable={false}
                                />
                            </Form.Item>
                        </BorderedBox>
                    )
                )}
            </Space>
        </FormSection>
    )
}
