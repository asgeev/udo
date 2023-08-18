import Delta from 'quill-delta'

export const templateText1 = (selection, templateData) => {
    return new Delta()
        .retain(selection?.index)
        .insert('Gandalf', { bold: true })
}

export const templateText2 = (selection, templateData) => {
    return new Delta()
        .retain(selection?.index)
        .insert('Gandalf', { bold: true })
}
