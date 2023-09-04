import styled from 'styled-components'
import loginBackground from '../../../assets/loginBackground.jpg'

export const LoginContainer = styled.div`
    width: 100vw;
    height: 100svh;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
`

export const LogoImg = styled.img`
    width: 80px;
    height: auto;
    padding-bottom: 50px;
    display: block;
    margin: auto;
`

export const LeftPanel = styled.div`
    flex: 45%;
    background-image: url(${loginBackground});
    background-color: black;
    background-position: center center;
    background-size: cover;
`

export const RightPanel = styled.div`
    flex: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FormContainer = styled.div`
    padding: 0 40px;
`

export const TextContainer = styled.div`
    margin-bottom: 40px;
`

export const ExternalLinks = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    font-size: 1.8rem;
    margin-top: 20px;
    & a {
        all: unset;
        cursor: pointer;
        color: rgba(0, 0, 0, 0.7);
        transition: all 0.2s ease-in-out;

        &:hover {
            transform: scale(1.1);
        }
    }
`
