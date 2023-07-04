import styled from 'styled-components'

export const LogoContainer = styled.div`
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 36px;
    color: white;
    gap: 10px;

    & img {
        max-height: 24px;
        width: auto;
        filter: invert(100%);
    }
`
