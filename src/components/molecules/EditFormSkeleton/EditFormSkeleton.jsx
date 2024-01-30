import { Skeleton } from 'antd'
import styled from 'styled-components'

export const Container = styled.div`
    padding: 30px;
`

export const EditFormSkeleton = () => {
    return (
        <Container>
            <Skeleton
                active
                paragraph={{
                    rows: 4,
                }}
            />
            <br />
            <br />
            <br />
            <Skeleton
                active
                paragraph={{
                    rows: 4,
                }}
            />
        </Container>
    )
}
