import { useContext } from 'react'
import { AddFormContext } from '@providers/AddFormProvider'

export const useAddFormContext = () => useContext(AddFormContext)
