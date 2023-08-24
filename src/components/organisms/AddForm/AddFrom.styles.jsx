import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'

export const GridWrapper = styled.div`
    background-color: #fdfdfd;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
        rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 10px;
    padding-top: 24px;
`

export const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
)
