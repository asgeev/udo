import { useContext } from 'react'
import { FirstDrawerContext } from '@providers/FirstDrawerProvider'

export const useFirstDrawerContext = () => useContext(FirstDrawerContext)
