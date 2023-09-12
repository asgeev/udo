import { useContext } from 'react'
import { EditFormContext } from '@providers/EditFormProvider'

export const useEditFormContext = () => useContext(EditFormContext)
