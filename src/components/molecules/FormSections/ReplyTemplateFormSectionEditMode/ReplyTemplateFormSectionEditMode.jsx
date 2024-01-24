import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
//Import contexts
import { useRichTextContext } from '@hooks/useRichTextContext'
import { useSecondDrawerContext } from '@hooks/useSecondDrawerContext'
import { useEditFormContext } from '@hooks/useEditFormContext'

const treeData = [
    {
        title: 'Centralny Wykaz Ubezpieczonych',
        key: '1',
        children: [
            {
                title: 'Czy osoba jest ubezpieczona?',
                key: '1-1',
            },
            {
                title: 'Weryfikacja danych adresowych świadczeniobiorcy',
                key: '1-2',
            },
            {
                title: 'Weryfikacja wydania karty EKUZ',
                key: '1c',
            },
            {
                title: 'Weryfikacja deklaracji POZ',
                key: '1d',
            },
            {
                title: 'Weryfikacja płatnika składek',
                key: '1e',
            },
        ],
    },
    {
        title: 'Bussiness object',
        key: '2',
        disabled: true,
        children: [
            {
                title: 'Weryfikacja leczenia psychiatrycznego',
                key: '2a',
            },
        ],
    },
    {
        title: 'SoFu',
        key: '3',
        disabled: true,
    },
]

import WP_Instance from '@services/WP_Instance'
import {
    Form,
    Tree,
    Select,
    Space,
    Button,
    Tabs,
    Collapse,
    Tooltip,
    Alert,
    List,
} from 'antd'
import {
    PaperClipOutlined,
    SisternodeOutlined,
    IdcardOutlined,
    TeamOutlined,
} from '@ant-design/icons'
//Import components
import { FormSection } from '@molecules/FormSection/FormSection'
import { PasteButtons } from '@molecules/PasteButtons/PasteButtons'

import { createSignaturesDataOptions } from '@helpers/createSignaturesDataOptions'

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
    ],
}

export const ReplyTemplateFormSectionEditMode = ({ editMode, setError }) => {
    const { openSecondDrawer } = useSecondDrawerContext()
    const { mainEditorRef, attachmentsEditorRef } = useRichTextContext()
    const { formDisabled } = useEditFormContext()
    const editForm = Form.useFormInstance()
    const pesel = Form.useWatch('pesel', editForm)
    const koszulka_id = Form.useWatch('koszulka_id', editForm)
    const nr_sprawy = Form.useWatch('nr_sprawy', editForm)

    const [signatures, setSignatures] = useState(null)

    const areFieldsEmpty = pesel && koszulka_id && nr_sprawy ? false : true

    useEffect(() => {
        WP_Instance.get(`/udo/v1/getSignatureList`)
            .then((response) => {
                setSignatures(createSignaturesDataOptions(response?.data))
            })
            .catch((error) => {
                console.error(error)
                setError(true)
            })
    }, [])

    const collapseItems = [
        {
            key: '1',
            label: 'Rozwiń aby dodać szablon do treści',
            children: <PasteButtons />,
        },
    ]
    const tabsItems = [
        {
            key: 1,
            label: (
                <span>
                    <SisternodeOutlined />
                    Odpowiedź
                </span>
            ),
            forceRender: true,
            children: (
                <>
                    <Space
                        size="large"
                        direction="vertical"
                        style={{ width: '100%', marginBottom: 10 }}
                    >
                        <Collapse ghost size="small" items={collapseItems} />
                    </Space>
                    <Form.Item name="template_main_text">
                        <ReactQuill
                            id="afg"
                            ref={mainEditorRef}
                            modules={modules}
                            readOnly={formDisabled}
                            placeholder="Tutaj wpisz swoją odpowiedź"
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            key: 2,
            label: (
                <span>
                    <PaperClipOutlined />
                    Załączniki
                </span>
            ),
            forceRender: true,
            children: (
                <Form.Item name="template_attachments_text">
                    <ReactQuill
                        ref={attachmentsEditorRef}
                        modules={modules}
                        readOnly={formDisabled}
                        placeholder="Tutaj wpisz listę załączników"
                    />
                </Form.Item>
            ),
        },
        {
            key: 3,
            label: (
                <span>
                    <IdcardOutlined />
                    Adresat
                </span>
            ),
            disabled: true,
        },
    ]

    return (
        <FormSection
            editMode={editMode}
            sectionName="Dane szablonu odpowiedzi"
            subTitle={'Wpisz poniżej odpowiedź która znajdzie się na piśmie'}
        >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {areFieldsEmpty && (
                    <Space direction="vertical">
                        <Alert
                            type="warning"
                            message="Uwaga!"
                            description="Wszystkie wskazane poniżej czynności prosimy robić z poziomu aplikacji UDO!!"
                            showIcon
                        />
                        <Alert
                            type="info"
                            showIcon
                            description={
                                <>
                                    <p>
                                        Przyciski do pobierania danych z
                                        zewnętrznych zródeł zostały wyłączone,
                                        ponieważ w sprawie brakuje jednego z
                                        wymienionych elementów:
                                    </p>
                                    <List>
                                        {!pesel && (
                                            <List.Item.Meta description="- nieuzupełnione pole pesel" />
                                        )}
                                        {!koszulka_id && (
                                            <List.Item.Meta description="- brak utworzonej koszulki w EZD" />
                                        )}
                                        {!nr_sprawy && (
                                            <List.Item.Meta description="- brak założonej sprawy na koszulce w EZD" />
                                        )}
                                    </List>
                                </>
                            }
                        />
                    </Space>
                )}
                <Form.Item
                    name="apis"
                    valuePropName="checkedKeys"
                    trigger="onCheck"
                >
                    <Tree checkable treeData={treeData} />
                </Form.Item>
                <Space
                    direction="horizontal"
                    style={{
                        marginBottom: 20,
                    }}
                >
                    <Tooltip title="Pokaż dane z CWU">
                        <Button
                            icon={<TeamOutlined />}
                            type="primary"
                            onClick={(e) => {
                                e.preventDefault()
                                openSecondDrawer(1)
                            }}
                            disabled={areFieldsEmpty}
                        >
                            CWU
                        </Button>
                    </Tooltip>
                    <Button type="primary" disabled>
                        SoFU
                    </Button>
                    <Button type="primary" disabled>
                        BO
                    </Button>
                </Space>
            </Space>

            <Tabs items={tabsItems} animated />

            <Form.Item
                name="signature_id"
                label="Podpis na piśmie"
                rules={[
                    {
                        type: 'string',
                        required: true,
                        message: 'Wybierz podpis który znajdzie się na piśmie',
                    },
                ]}
            >
                <Select
                    style={{ maxWidth: 200 }}
                    placeholder="wybierz podpis"
                    allowClear
                    options={signatures}
                />
            </Form.Item>
        </FormSection>
    )
}
