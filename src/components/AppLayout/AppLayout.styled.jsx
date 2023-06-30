import styled from 'styled-components'
import { Layout } from 'antd'

export const StyledLayout = styled(Layout)`
    min-height: 100vh;
`
export const LogoContainer = styled.div`
    height: 100%;
    & img {
        height: 40%;
        width: auto;
        filter: invert(100%);
    }
`
