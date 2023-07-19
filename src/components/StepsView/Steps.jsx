import { useState, useEffect, useRef } from 'react'
import { Steps } from 'antd'
import styled from 'styled-components'

export const StepsViewConstainer = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    min-width: 420px;
`

export const StepsView = ({ stepsItems = [] }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const ref = useRef()

    //TODO: add interval for current step

    // setInterval(() => {
    //     for (let i; i < stepsItems.length; i++) {
    //         setCurrentStep((prev) => prev + 1)
    //     }
    // }, 2000)

    useEffect(() => {
        ref.current?.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        })
    }, [stepsItems])

    return (
        <StepsViewConstainer ref={ref}>
            <Steps
                direction="vertical"
                current={currentStep}
                items={stepsItems}
            />
        </StepsViewConstainer>
    )
}
