import { useContext } from 'react'
import { EditDrawerContext } from '@providers/EditDrawerProvider'

export const useEditDrawerContext = () => useContext(EditDrawerContext)
