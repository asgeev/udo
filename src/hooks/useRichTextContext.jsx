import { useContext } from 'react'
import { RichTextContext } from '@providers/RichTextProvider'

export const useRichTextContext = () => useContext(RichTextContext)
