import { useContext } from 'react'
import { RecordsViewContext } from '@providers/RecordsViewProvider'

export const useRecordsViewContext = () => useContext(RecordsViewContext)
