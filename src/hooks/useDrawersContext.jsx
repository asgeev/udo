import { useContext } from 'react'
import { DrawersContext } from '@providers/DrawersProvider'

export const useDrawersContext = () => useContext(DrawersContext)
