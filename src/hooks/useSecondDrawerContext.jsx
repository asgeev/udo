import { useContext } from 'react'
import { SecondDrawerContext } from '@providers/SecondDrawerProvider'

export const useSecondDrawerContext = () => useContext(SecondDrawerContext)
